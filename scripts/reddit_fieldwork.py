"""Read-only Reddit fieldwork for the netnography.

Uses Reddit's official API with application-only OAuth (client credentials),
so it needs a "script" app's id and secret and never a user password. It only
reads public posts and comments.

    cp .env.example .env   # then fill REDDIT_CLIENT_ID / REDDIT_CLIENT_SECRET
    python3 scripts/reddit_fieldwork.py OUT_DIR

Writes one JSON file per subreddit/query pair with every post and its top-level
comments inside the evidence window, keeping author, created date and permalink
so each quote can be traced back.
"""
import base64
import json
import pathlib
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone

ROOT = pathlib.Path(__file__).resolve().parent.parent
WINDOW_START = datetime(2025, 5, 1, tzinfo=timezone.utc)
WINDOW_END = datetime(2026, 11, 1, 23, 59, 59, tzinfo=timezone.utc)
USER_AGENT = "script:high-street-netnography:0.1 (read-only research)"

SUBREDDITS = ["london", "AskUK", "CasualUK", "unitedkingdom", "AskLondon", "hammersmith", "Chiswick", "shepherdsbush", "fulham"]
QUERIES = [
    "high street", "independent shops", "shop local", "local shops", "King Street Hammersmith",
    "click and collect", "in stock", "Amazon instead", "butcher", "bakery", "hardware shop",
    "florist", "closing down", "empty shops", "Hammersmith Bridge shops",
]
MAX_THREADS_PER_QUERY = 15
MAX_COMMENTS_PER_THREAD = 40


def load_env():
    env = {}
    path = ROOT / ".env"
    if path.exists():
        for line in path.read_text().splitlines():
            if "=" in line and not line.lstrip().startswith("#"):
                k, v = line.split("=", 1)
                env[k.strip()] = v.strip().strip('"')
    return env


def token(client_id, secret):
    req = urllib.request.Request(
        "https://www.reddit.com/api/v1/access_token",
        data=b"grant_type=client_credentials",
        headers={
            "Authorization": "Basic " + base64.b64encode(f"{client_id}:{secret}".encode()).decode(),
            "User-Agent": USER_AGENT,
        },
    )
    with urllib.request.urlopen(req) as r:
        return json.load(r)["access_token"]


def get(tok, path, params):
    url = f"https://oauth.reddit.com{path}?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(url, headers={"Authorization": f"bearer {tok}", "User-Agent": USER_AGENT})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req) as r:
                time.sleep(1.1)  # stay well under the 100 requests/minute limit
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code in (403, 404):
                return None
            if e.code == 429:
                time.sleep(10 * (attempt + 1))
                continue
            raise
    return None


def in_window(utc):
    return WINDOW_START <= datetime.fromtimestamp(utc, tz=timezone.utc) <= WINDOW_END


def iso(utc):
    return datetime.fromtimestamp(utc, tz=timezone.utc).strftime("%Y-%m-%d")


def main():
    out = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "reddit-raw")
    out.mkdir(parents=True, exist_ok=True)
    env = load_env()
    tok = token(env["REDDIT_CLIENT_ID"], env["REDDIT_CLIENT_SECRET"])
    seen = set()
    for sub in SUBREDDITS:
        for q in QUERIES:
            data = get(tok, f"/r/{sub}/search", {"q": q, "restrict_sr": 1, "sort": "relevance", "t": "all", "limit": 50})
            if not data:
                print(f"skip r/{sub} (unavailable)")
                break
            threads = []
            for child in data["data"]["children"]:
                p = child["data"]
                if p["id"] in seen or not in_window(p["created_utc"]):
                    continue
                seen.add(p["id"])
                thread = {
                    "id": p["id"], "subreddit": p["subreddit"], "title": p["title"], "author": p["author"],
                    "date": iso(p["created_utc"]), "score": p["score"], "num_comments": p["num_comments"],
                    "url": "https://www.reddit.com" + p["permalink"], "selftext": p.get("selftext", ""),
                    "comments": [],
                }
                tree = get(tok, f"/comments/{p['id']}", {"limit": MAX_COMMENTS_PER_THREAD, "depth": 1, "sort": "top"})
                for c in (tree[1]["data"]["children"] if tree else []):
                    d = c.get("data", {})
                    if c.get("kind") != "t1" or not d.get("body") or not in_window(d["created_utc"]):
                        continue
                    thread["comments"].append({
                        "author": d["author"], "date": iso(d["created_utc"]), "score": d["score"],
                        "url": "https://www.reddit.com" + d["permalink"], "body": d["body"],
                    })
                threads.append(thread)
                if len(threads) >= MAX_THREADS_PER_QUERY:
                    break
            if threads:
                name = f"{sub}__{q.replace(' ', '-').lower()}.json"
                (out / name).write_text(json.dumps(threads, indent=1, ensure_ascii=False))
                print(f"r/{sub} '{q}': {len(threads)} threads")
    print(f"done: {len(seen)} threads in window")


if __name__ == "__main__":
    main()
