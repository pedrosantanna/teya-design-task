"""Local preview for the docs site.

Serves the repo root, so content paths match the published artifact
(docs/..., site/nav.json). The artifact platform wraps site/index.html in a
document skeleton at publish time; this server does the same for "/".
Deep links into the web prototype (/app-web/categories/cafe) have no file of
their own: they get app-web/index.html, pointed back at the /app-web/ folder,
so a reload on any screen works.

    python3 site/serve.py [port]
"""
import gzip
import http.server
import mimetypes
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4173

SKELETON = (
    '<!doctype html><html lang="en"><head><meta charset="utf-8">'
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
    "<style>:root{color-scheme:light}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>"
    "</head><body>{page}</body></html>"
)


APP_WEB = "/app-web/"

# Text types are sent gzip-compressed when the browser accepts it (the web bundle is 3.7 MB of JavaScript, about a
# quarter of that compressed). Compressed bodies are kept until the file changes.
COMPRESSIBLE = {".js", ".mjs", ".json", ".css", ".html", ".md", ".svg", ".txt", ".map", ".wasm", ".ttf", ".otf"}
_gzip_cache = {}


def gzipped(file):
    key = str(file)
    stamp = file.stat().st_mtime_ns
    hit = _gzip_cache.get(key)
    if not hit or hit[0] != stamp:
        hit = (stamp, gzip.compress(file.read_bytes(), compresslevel=6))
        _gzip_cache[key] = hit
    return hit[1]


def app_web_page():
    """app-web/index.html for a deep link: its relative scripts resolve against
    /app-web/ (a <base>), and the base the page stores for its router and assets
    is /app-web, not the deep link's folder (app/public/index.html)."""
    page = (ROOT / "app-web" / "index.html").read_text(encoding="utf-8")
    fix = '<base href="%s"><script>window.__SNUFFLE_BASE__="%s";</script>' % (APP_WEB, APP_WEB.rstrip("/"))
    at = page.find("<script src=")
    return page[:at] + fix + page[at:] if at >= 0 else page


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        if self.path.split("?")[0] in ("/", "/index.html"):
            page = (ROOT / "site" / "index.html").read_text(encoding="utf-8")
            body = SKELETON.replace("{page}", page).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        path = self.path.split("?")[0].split("#")[0]
        # A route (no file extension) with no file: the app's page. A missing asset still gets its 404.
        route = "." not in path.rsplit("/", 1)[-1]
        if path.startswith(APP_WEB) and route and not (ROOT / path.lstrip("/")).exists():
            body = app_web_page().encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        file = ROOT / path.lstrip("/")
        if (
            file.is_file()
            and file.suffix.lower() in COMPRESSIBLE
            and "gzip" in self.headers.get("Accept-Encoding", "")
        ):
            body = gzipped(file)
            self.send_response(200)
            self.send_header("Content-Type", mimetypes.guess_type(file.name)[0] or "application/octet-stream")
            self.send_header("Content-Encoding", "gzip")
            self.send_header("Vary", "Accept-Encoding")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()


if __name__ == "__main__":
    print(f"Serving {ROOT} at http://localhost:{PORT}")
    http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
