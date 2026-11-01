"""Build the proto-persona pages from the coded posts.

    python3 scripts/build_personas.py

Inputs (docs/discover/personas/):
  coding.json      final codes, one object per post (coder A after reconciliation)
  coding-b.json    the blind second coder's codes, used only to report agreement

Groups come from fixed rules on the codes, written before the second coder's
results were seen:
  job = specific                        -> mission
  job != specific and stance = defects  -> lapsed
  job = routine and stance = persists   -> regular
  job = discovery                       -> discovery
  anything else                         -> unassigned (shown, not placed)

Writes the generated blocks between <!-- generated:NAME --> markers.
"""
import json
import pathlib
import re
from collections import Counter

ROOT = pathlib.Path(__file__).resolve().parent.parent
DIR = ROOT / "docs" / "discover" / "personas"
PAGES = [DIR / "index.md", DIR / "method.md", DIR / "coding.md"]

JOBS = [("specific", "Specific item or shop"), ("routine", "Routine shopping and services"), ("discovery", "Discovery and browsing")]
FAILURES = [
    ("information", "Information", "findability"),
    ("access", "Access", "transaction"),
    ("availability", "Availability", "the street's offer"),
    ("value", "Value", "the street's offer"),
    ("none", "No failure", ""),
]
GROUPS = {
    "mission": "Sam, the mission shopper",
    "regular": "Ruth, the regular",
    "lapsed": "Dan, the lapsed local",
    "discovery": "Priya, the finds hunter",
    "unassigned": "Not placed",
}
FIELDS = ("include", "job", "urgent", "failure", "stance")


def group_of(p):
    if p["job"] == "specific":
        return "mission"
    if p["stance"] == "defects":
        return "lapsed"
    if p["job"] == "routine" and p["stance"] == "persists":
        return "regular"
    if p["job"] == "discovery":
        return "discovery"
    return "unassigned"


def geo(p):
    net = p["network"]
    if net.strip() == "X" or "TikTok" in net:
        return "X/TikTok"
    if any(s in net for s in ("Ealing", "chiswick", "Hammersmith")) or "Hammersmith" in p.get("rationale", ""):
        return "West London"
    if "r/london" in net:
        return "London"
    return "UK-wide"


def kappa(a, b):
    n = len(a)
    if not n:
        return 0.0
    po = sum(x == y for x, y in zip(a, b)) / n
    ca, cb = Counter(a), Counter(b)
    pe = sum(ca[k] * cb[k] for k in set(ca) | set(cb)) / (n * n)
    return 1.0 if pe == 1 else (po - pe) / (1 - pe)


def replace_block(text, name, body):
    pattern = re.compile(rf"(<!-- generated:{name} -->\n).*?(<!-- /generated:{name} -->)", re.S)
    return pattern.sub(lambda m: m.group(1) + body + "\n" + m.group(2), text)


def main():
    coded = json.loads((DIR / "coding.json").read_text(encoding="utf-8"))
    second = {p["id"]: p for p in json.loads((DIR / "coding-b.json").read_text(encoding="utf-8"))}
    posts = [p for p in coded if p["include"]]
    for p in posts:
        p["group"] = group_of(p)
        p["where"] = geo(p)

    # Grid: jobs x failures, each post a mark styled by stance and coloured by group.
    cells = []
    for j, _ in JOBS:
        for f, _, _ in FAILURES:
            here = [p for p in posts if p["job"] == j and p["failure"] == f]
            if here:
                cells.append({"row": j, "col": f, "posts": [{"h": p["handle"], "s": p["stance"], "g": p["group"], "u": p["urgent"] == "yes"} for p in here]})
    grid = {
        "rows": [{"id": j, "label": l} for j, l in JOBS],
        "cols": [{"id": f, "label": l, "maps": m} for f, l, m in FAILURES],
        "groups": GROUPS,
        "cells": cells,
    }
    grid_md = "```occasion-grid\n" + json.dumps(grid, ensure_ascii=False) + "\n```"

    # Group summary with source mix.
    rows = ["| Proto-persona | Posts | People | Sources | Where the occasion broke | Stance |", "| --- | --- | --- | --- | --- | --- |"]
    for gid, name in GROUPS.items():
        mine = [p for p in posts if p["group"] == gid]
        if not mine:
            continue
        people = len({p["handle"] for p in mine})
        src = Counter(p["where"] for p in mine)
        fail = Counter(p["failure"] for p in mine)
        stance = Counter(p["stance"] for p in mine)
        fmt = lambda c: ", ".join(f"{k} {v}" for k, v in c.most_common())
        rows.append(f"| {name} | {len(mine)} | {people} | {fmt(src)} | {fmt(fail)} | {fmt(stance)} |")
    summary_md = "\n".join(rows)

    # Failure totals, the part that speaks to the brief.
    total = Counter(p["failure"] for p in posts)
    fail_rows = ["| Where it broke | Posts | Points to |", "| --- | --- | --- |"]
    for f, label, maps in FAILURES:
        fail_rows.append(f"| {label} | {total.get(f, 0)} | {maps or 'nothing to fix'} |")
    failures_md = "\n".join(fail_rows)

    # Per-post coding table.
    table = ["| Post | Date | Job | Urgent | Failure | Stance | Proto-persona | Why |", "| --- | --- | --- | --- | --- | --- | --- | --- |"]
    for p in sorted(posts, key=lambda p: (list(GROUPS).index(p["group"]), p["job"], p["failure"])):
        table.append(f"| [{p['handle']}]({p['url']}) | {p['date']} | {p['job']} | {p['urgent']} | {p['failure']} | {p['stance']} | {GROUPS[p['group']].split(',')[0]} | {p['rationale']} |")
    excluded = ["| Post | Why it was left out |", "| --- | --- |"]
    excluded += [f"| [{p['handle']}]({p['url']}) | {p['exclude_reason']} |" for p in coded if not p["include"]]

    # Agreement between the two coders, before reconciliation.
    a_first = {p["id"]: p for p in json.loads((DIR / "coding-a.json").read_text(encoding="utf-8"))}
    agree = ["| Field | Posts compared | Agreement | Cohen's kappa |", "| --- | --- | --- | --- |"]
    for field in FIELDS:
        ids = [i for i in a_first if i in second]
        if field != "include":
            ids = [i for i in ids if a_first[i]["include"] and second[i]["include"]]
        xa = [str(a_first[i][field]) for i in ids]
        xb = [str(second[i][field]) for i in ids]
        same = sum(x == y for x, y in zip(xa, xb))
        agree.append(f"| {field} | {len(ids)} | {same}/{len(ids)} ({same / len(ids):.0%}) | {kappa(xa, xb):.2f} |")
    agreement_md = "\n".join(agree)

    resolutions = ["| Post | Settled as | Why |", "| --- | --- | --- |"]
    resolutions += [f"| [{p['handle']}]({p['url']}) | {'excluded' if not p['include'] else ', '.join(p[k] for k in ('job', 'failure', 'stance'))} | {p['resolution']} |" for p in coded if p.get("resolution")]

    blocks = {"resolutions": "\n".join(resolutions), "grid": grid_md, "groups": summary_md, "failures": failures_md, "coding": "\n".join(table),
              "excluded": "\n".join(excluded), "agreement": agreement_md}
    for page in PAGES:
        if page.exists():
            text = page.read_text(encoding="utf-8")
            for name, body in blocks.items():
                text = replace_block(text, name, body)
            page.write_text(text, encoding="utf-8")
    print(summary_md)
    print(failures_md)
    print(agreement_md)


if __name__ == "__main__":
    main()
