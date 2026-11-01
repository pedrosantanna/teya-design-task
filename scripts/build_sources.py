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


STRINGS = {
    "en": {"title": "Sources", "intro": "Every quote and every link used across the docs, in one place. {q} quotes ({v} checked against the live source) and {l} other sources. This page is generated from the other pages by `scripts/build_sources.py`.",
           "by_net": "Quotes by network", "net": "Network", "quotes": "Quotes",
           "status_note": "Status **verified** means the text, author and date were matched against the live page. **Archive** means the quote came from a public Reddit archive and has not been matched yet.",
           "cols": "| Date | Author | Network | Status | Used on | Link |", "open": "Open", "other": "Other sources", "other_cols": "| Used on | Source |"},
    "pt": {"title": "Fontes", "intro": "Todas as citações e todos os links usados na documentação, num só lugar. {q} citações ({v} conferidas na fonte original) e {l} outras fontes. Esta página é gerada a partir das outras pelo `scripts/build_sources.py`.",
           "by_net": "Citações por rede", "net": "Rede", "quotes": "Citações",
           "status_note": "Status **verified** quer dizer que texto, autor e data foram conferidos na página original. **Archive** quer dizer que a citação veio de um arquivo público do Reddit e ainda não foi conferida.",
           "cols": "| Data | Autor | Rede | Status | Usada em | Link |", "open": "Abrir", "other": "Outras fontes", "other_cols": "| Usada em | Fonte |"},
}


def main():
    ok = build(DOCS, OUT, STRINGS["en"], skip=DOCS / "pt-br")
    pt = DOCS / "pt-br"
    if (pt / "discover").exists():
        ok = build(pt, pt / "discover" / "sources.md", STRINGS["pt"]) and ok
    if not ok:
        sys.exit(1)


def build(DOCS, OUT, S, skip=None):
    quotes, links, problems = [], [], []
    pages = sorted(p for p in DOCS.rglob("*.md") if p != OUT and not (skip and skip in p.parents))
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
        f"# {S['title']}",
        "",
        S["intro"].format(q=len(quotes), v=verified, l=len(unique_links)),
        "",
        f"## {S['by_net']}",
        "",
        f"| {S['net']} | {S['quotes']} |",
        "| --- | --- |",
    ]
    lines += [f"| {n} | {c} |" for n, c in sorted(by_network.items(), key=lambda kv: -kv[1])]
    lines += [
        "",
        f"## {S['quotes']}",
        "",
        S["status_note"],
        "",
        S["cols"],
        "| --- | --- | --- | --- | --- | --- |",
    ]
    for q in sorted(quotes, key=lambda q: (q.get("date", ""), q.get("handle", ""))):
        lines.append(
            f"| {q.get('date', '')} | {q.get('handle', '')} | {q.get('network', '')} | {q.get('status', '–')} "
            f"| [{q['page']}]({q['rel'].replace('discover/', '', 1) if q['rel'].startswith('discover/') else '../' + q['rel']}) "
            f"| [{S['open']}]({q.get('url', '')}) |"
        )
    lines += ["", f"## {S['other']}", "", S["other_cols"], "| --- | --- |"]
    for name, rel, label, url in unique_links:
        page_link = rel.replace("discover/", "", 1) if rel.startswith("discover/") else "../" + rel
        lines.append(f"| [{name}]({page_link}) | [{label.replace('|', '/')}]({url}) |")
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"{len(quotes)} quotes ({verified} verified), {len(unique_links)} links -> {OUT.relative_to(ROOT)}")
    if problems:
        print("\n".join(problems))
        return False
    return True


if __name__ == "__main__":
    main()
