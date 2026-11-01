"""Check Reddit quotes in docs/ against thread JSON saved from the live site.

    python3 scripts/verify_reddit_quotes.py DIR [--write]

DIR holds files named <thread id>.json, each the raw response of
https://old.reddit.com/comments/<id>.json saved from a browser. A quote counts
as verified when a post or comment by the same author in that thread contains
every fragment of the quoted text (fragments are split on "…") and was made on
the quoted date. With --write, matching quotes get `status: verified`.
"""
import json
import pathlib
import re
import sys
import unicodedata
from datetime import datetime, timezone

ROOT = pathlib.Path(__file__).resolve().parent.parent
QUOTE_RE = re.compile(r"```quote\n(.*?)```", re.S)


def norm(s):
    s = unicodedata.normalize("NFKC", s).lower()
    s = s.replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"')
    s = re.sub(r"[*_>\[\]()#]", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def items(thread):
    """Yield (author, utc, body) for the post and every comment, at any depth."""
    post = thread[0]["data"]["children"][0]["data"]
    yield post["author"], post["created_utc"], post.get("title", "") + " " + post.get("selftext", "")
    stack = list(thread[1]["data"]["children"])
    while stack:
        c = stack.pop()
        if c.get("kind") != "t1":
            continue
        d = c["data"]
        yield d.get("author", ""), d.get("created_utc", 0), d.get("body", "")
        replies = d.get("replies")
        if isinstance(replies, dict):
            stack.extend(replies["data"]["children"])


def load(path):
    raw = path.read_text(encoding="utf-8", errors="ignore")
    start = raw.find("[")
    return json.loads(raw[start: raw.rfind("]") + 1])


def check(q, thread):
    handle = q.get("handle", "").removeprefix("u/")
    fragments = [norm(f) for f in re.split(r"…|\.\.\.", q.get("text", "").strip('"“”')) if norm(f)]
    same_author = [(utc, body) for author, utc, body in items(thread) if author == handle]
    if not same_author:
        return "author not found"
    for utc, body in same_author:
        b = norm(body)
        if all(f.strip(" .,!?;:'\"") in b for f in fragments):
            day = datetime.fromtimestamp(utc, tz=timezone.utc).strftime("%Y-%m-%d")
            return "ok" if day == q.get("date") else f"date differs (live {day})"
    return "text differs"


def main():
    src = pathlib.Path(sys.argv[1]).expanduser()
    write = "--write" in sys.argv
    results = {}
    for page in sorted((ROOT / "docs").rglob("*.md")):
        md = page.read_text(encoding="utf-8")
        new = md
        for block in QUOTE_RE.findall(md):
            q = dict(line.split(":", 1) for line in block.splitlines() if ":" in line)
            q = {k.strip().lower(): v.strip() for k, v in q.items()}
            m = re.search(r"reddit\.com/r/[^/]+/comments/([a-z0-9]+)", q.get("url", ""))
            if not m:
                continue
            f = src / f"{m.group(1)}.json"
            outcome = check(q, load(f)) if f.exists() else "thread not saved"
            results.setdefault(outcome.split(" (")[0], []).append(f"{page.relative_to(ROOT)}  {q.get('handle')}  {m.group(1)}  {outcome}")
            if outcome == "ok" and write and "status: verified" not in block:
                fixed = re.sub(r"^status: .*$", "status: verified", block, flags=re.M)
                if fixed == block:
                    fixed = block + "status: verified\n"
                new = new.replace(block, fixed, 1)
        if write and new != md:
            page.write_text(new, encoding="utf-8")
    for outcome, rows in sorted(results.items()):
        print(f"\n## {outcome}: {len(rows)}")
        print("\n".join(rows))


if __name__ == "__main__":
    main()
