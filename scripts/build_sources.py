"""Build docs/discover/sources.md from every page in docs/, and check the evidence.

    python3 scripts/build_sources.py

Collects every ```quote block and every external link, writes them as tables,
and fails if a quote is missing a field, falls outside the evidence window,
or runs longer than the short-excerpt limit.
"""
import pathlib
import re
import sys
from datetime import date

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
OUT = DOCS / "discover" / "sources.md"
WINDOW = (date(2025, 5, 1), date(2026, 11, 1))
MAX_WORDS = 30
REQUIRED = ("text", "handle", "network", "date", "url")

QUOTE_RE = re.compile(r"```quote\n(.*?)```", re.S)
LINK_RE = re.compile(r"\[([^\]]+)\]\((https?://[^)\s]+)\)")


def title_of(md):
    m = re.search(r"^# (.+)$", md, re.M)
    return m.group(1).strip() if m else ""


def parse_quote(block):
    q = {}
    for line in block.splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            q[k.strip().lower()] = v.strip()
    return q


def main():
    quotes, links, problems = [], [], []
    pages = sorted(p for p in DOCS.rglob("*.md") if p != OUT)
    for page in pages:
        md = page.read_text(encoding="utf-8")
        rel = page.relative_to(DOCS).as_posix()
        name = title_of(md) or rel
        for block in QUOTE_RE.findall(md):
            q = parse_quote(block)
            q["page"], q["rel"] = name, rel
            missing = [k for k in REQUIRED if not q.get(k)]
            if missing:
                problems.append(f"{rel}: quote by {q.get('handle', '?')} missing {', '.join(missing)}")
            try:
                d = date.fromisoformat(q.get("date", ""))
                if not WINDOW[0] <= d <= WINDOW[1]:
                    problems.append(f"{rel}: quote by {q.get('handle')} dated {d} is outside the window")
            except ValueError:
                problems.append(f"{rel}: quote by {q.get('handle')} has no valid date")
            words = len(q.get("text", "").split())
            if words > MAX_WORDS:
                problems.append(f"{rel}: quote by {q.get('handle')} is {words} words")
            quotes.append(q)
        prose = QUOTE_RE.sub("", md)
        for label, url in LINK_RE.findall(prose):
            links.append((name, rel, label, url))

    seen, unique_links = set(), []
    for item in links:
        if item[3] not in seen:
            seen.add(item[3])
            unique_links.append(item)

    verified = sum(1 for q in quotes if q.get("status") == "verified")
    by_network = {}
    for q in quotes:
        net = q.get("network", "").split("·")[0].strip() or "Unknown"
        by_network[net] = by_network.get(net, 0) + 1

    lines = [
        "# Sources",
        "",
        f"Every quote and every link used across the docs, in one place. {len(quotes)} quotes "
        f"({verified} checked against the live source) and {len(unique_links)} other sources. "
        "This page is generated from the other pages by `scripts/build_sources.py`.",
        "",
        "## Quotes by network",
        "",
        "| Network | Quotes |",
        "| --- | --- |",
    ]
    lines += [f"| {n} | {c} |" for n, c in sorted(by_network.items(), key=lambda kv: -kv[1])]
    lines += [
        "",
        "## Quotes",
        "",
        "Status **verified** means the text, author and date were matched against the live page. "
        "**Archive** means the quote came from a public Reddit archive and has not been matched yet.",
        "",
        "| Date | Author | Network | Status | Used on | Link |",
        "| --- | --- | --- | --- | --- | --- |",
    ]
    for q in sorted(quotes, key=lambda q: (q.get("date", ""), q.get("handle", ""))):
        lines.append(
            f"| {q.get('date', '')} | {q.get('handle', '')} | {q.get('network', '')} | {q.get('status', '–')} "
            f"| [{q['page']}]({q['rel'].replace('discover/', '', 1) if q['rel'].startswith('discover/') else '../' + q['rel']}) "
            f"| [Open]({q.get('url', '')}) |"
        )
    lines += ["", "## Other sources", "", "| Used on | Source |", "| --- | --- |"]
    for name, rel, label, url in unique_links:
        page_link = rel.replace("discover/", "", 1) if rel.startswith("discover/") else "../" + rel
        lines.append(f"| [{name}]({page_link}) | [{label.replace('|', '/')}]({url}) |")
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"{len(quotes)} quotes ({verified} verified), {len(unique_links)} links -> {OUT.relative_to(ROOT)}")
    if problems:
        print("\n".join(problems))
        sys.exit(1)


if __name__ == "__main__":
    main()
