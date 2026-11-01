"""Build the proto-persona pages from the coded posts.

    python3 scripts/build_personas.py

Inputs (docs/discover/personas/):
  coding.json      final codes, one object per post
  coding-a.json    first coder, before reconciliation
  coding-b.json    blind second coder, used to report agreement

Each post with a failure gets two scores:
  need   = discovery 1, routine 4, specific 7, plus 3 if urgent      (0 browse .. 10 mission)
  breaks = information 9, availability 6, value 4, access 1        (10 findability .. 0 transaction)
Posts where nothing broke are listed beside the chart, not clustered.
Clusters: k-means on (need, breaks), k from 2 to 5, keeping the k with the
best mean silhouette. Clusters are named by fixed rules on their centres:
highest need -> Sam (mission); of the rest, lowest breaks -> Jess; the rest -> Ruth.

Writes the generated blocks between <!-- generated:NAME --> markers.
"""
import json
import pathlib
import math
import re
from collections import Counter

ROOT = pathlib.Path(__file__).resolve().parent.parent
DIR = ROOT / "docs" / "discover" / "personas"
PAGES = [DIR / "index.md", DIR / "method.md", DIR / "method-details.md"]
PT_DIR = ROOT / "docs" / "pt-br" / "discover" / "personas"
PT_PAGES = [PT_DIR / "index.md", PT_DIR / "method.md", PT_DIR / "method-details.md"]
# Generated tables keep the same data; their headers and labels are translated for the PT-BR pages.
PT_TERMS = [
    ("Sam, the mission shopper", "Sam, o comprador em missão"), ("Jess, the lapsed local", "Jess, a local que desistiu"),
    ("Ruth, the regular", "Ruth, a frequentadora"), ("Nothing broke (not clustered)", "Nada deu errado (fora dos clusters)"),
    ("| Group |", "| Grupo |"), ("| Posts |", "| Posts |"), ("| People |", "| Pessoas |"), ("Centre (urgency, failure)", "Centro (urgência, falha)"),
    ("| Sources |", "| Fontes |"), ("| Where it broke |", "| Onde deu errado |"), ("| What they did next |", "| O que fizeram depois |"),
    ("| Where it broke | Posts | Points to |", "| Onde deu errado | Posts | Aponta para |"), ("| Information |", "| Informação |"),
    ("| Access |", "| Acesso |"), ("| Availability |", "| Disponibilidade |"), ("| Value |", "| Valor |"), ("| No failure |", "| Sem falha |"),
    ("| findability |", "| findability |"), ("| transaction |", "| transaction |"), ("| the street's offer |", "| a oferta da rua |"), ("| nothing to fix |", "| nada a resolver |"),
    ("| Field | Posts compared | Agreement | Cohen's kappa |", "| Campo | Posts comparados | Concordância | Kappa de Cohen |"),
    ("| Clusters (k) | Mean silhouette |", "| Clusters (k) | Silhouette médio |"), ("← chosen", "← escolhido"),
    ("| Post | Date | Job | Urgent | Failure | Stance | Urgency | Failure score | Group | Why |", "| Post | Data | Tarefa | Urgente | Falha | Atitude | Urgência | Nota de falha | Grupo | Por quê |"),
    ("| Post | Settled as | Why |", "| Post | Resolvido como | Por quê |"), ("| Post | Why it was left out |", "| Post | Por que ficou de fora |"),
    ("West London", "West London"), ("UK-wide", "Reino Unido"), ("excluded", "excluído"),
]


def to_pt(text):
    for a, b in PT_TERMS:
        text = text.replace(a, b)
    return text


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
    "lapsed": "Jess, the lapsed local",
    "regular": "Ruth, the regular",
    "worked": "Nothing broke (not clustered)",
}
FIELDS = ("include", "job", "urgent", "failure", "stance")


NEED = {"discovery": 1, "routine": 4, "specific": 7}
BREAKS = {"information": 9, "availability": 6, "value": 4, "access": 1}
NAMES = {"mission": "Sam, the mission shopper", "lapsed": "Jess, the lapsed local", "regular": "Ruth, the regular"}


def dist(a, b):
    return math.hypot(a["x"] - b["x"], a["y"] - b["y"])


def kmeans(pts, k):
    # Deterministic farthest-point start, then Lloyd iterations.
    centres = [max(pts, key=lambda p: (p["x"], p["y"]))]
    while len(centres) < k:
        centres.append(max(pts, key=lambda p: min(dist(p, c) for c in centres)))
    centres = [{"x": c["x"], "y": c["y"]} for c in centres]
    for _ in range(100):
        labels = [min(range(k), key=lambda i: dist(p, centres[i])) for p in pts]
        new = []
        for i in range(k):
            mine = [p for p, l in zip(pts, labels) if l == i] or [centres[i]]
            new.append({"x": sum(p["x"] for p in mine) / len(mine), "y": sum(p["y"] for p in mine) / len(mine)})
        if new == centres:
            break
        centres = new
    return labels, centres


def silhouette(pts, labels, k):
    scores = []
    for i, p in enumerate(pts):
        same = [dist(p, q) for j, q in enumerate(pts) if labels[j] == labels[i] and j != i]
        if not same:
            scores.append(0.0)
            continue
        a = sum(same) / len(same)
        b = min(sum(dist(p, q) for j, q in enumerate(pts) if labels[j] == o) / labels.count(o)
                for o in range(k) if o != labels[i] and labels.count(o))
        scores.append((b - a) / max(a, b) if max(a, b) else 0.0)
    return sum(scores) / len(scores)


def cluster(posts):
    pts = []
    for p in posts:
        if p["failure"] in BREAKS:
            p["x"] = NEED[p["job"]] + (3 if p["urgent"] == "yes" else 0)
            p["y"] = BREAKS[p["failure"]]
            pts.append(p)
    trials = {}
    for k in range(2, 6):
        labels, centres = kmeans(pts, k)
        trials[k] = (silhouette(pts, labels, k), labels, centres)
    best = max(trials, key=lambda k: trials[k][0])
    _, labels, centres = trials[best]
    order = sorted(range(best), key=lambda i: -centres[i]["x"])
    rest = sorted(order[1:], key=lambda i: centres[i]["y"])
    names = {order[0]: "mission"}
    if rest:
        names[rest[0]] = "lapsed"
    for i in rest[1:]:
        names[i] = "regular" if "regular" not in names.values() else f"group{i}"
    for p, l in zip(pts, labels):
        p["cluster"] = names[l]
    summary = {names[i]: {"x": round(centres[i]["x"], 1), "y": round(centres[i]["y"], 1), "n": labels.count(i)} for i in range(best)}
    return pts, best, {k: round(v[0], 2) for k, v in trials.items()}, summary



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
        p["where"] = geo(p)
    pts, best_k, sil, centres = cluster(posts)
    for p in posts:
        p["group"] = p.get("cluster", "worked")
    worked = [p for p in posts if p["group"] == "worked"]

    chart = {
        "x": {"label": "Need urgency", "ticks": [[1, "Discovery"], [4, "Routine"], [7, "Specific item"], [10, "Specific + deadline"]], "min": "Browsing", "max": "Needs it now"},
        "y": {"label": "Point of failure", "ticks": [[9, "Couldn't find out"], [6, "Wasn't there"], [4, "Not worth it"], [1, "Couldn't get it"]], "min": "Getting · transaction", "max": "Knowing · findability"},
        "names": {k: NAMES.get(k, k) for k in centres},
        "centres": centres,
        "points": [{"x": p["x"], "y": p["y"], "c": p["cluster"], "s": p["stance"], "h": p["handle"]} for p in pts],
        "worked": [p["handle"] for p in worked],
    }
    chart_md = "```cluster-map\n" + json.dumps(chart, ensure_ascii=False) + "\n```"
    sil_md = "| Clusters (k) | Mean silhouette |\n| --- | --- |\n" + "\n".join(f"| {k} | {v}{' ← chosen' if k == best_k else ''} |" for k, v in sil.items())

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
    rows = ["| Group | Posts | People | Centre (urgency, failure) | Sources | Where it broke | What they did next |", "| --- | --- | --- | --- | --- | --- | --- |"]
    for gid, name in GROUPS.items():
        mine = [p for p in posts if p["group"] == gid]
        if not mine:
            continue
        people = len({p["handle"] for p in mine})
        src = Counter(p["where"] for p in mine)
        fail = Counter(p["failure"] for p in mine)
        stance = Counter(p["stance"] for p in mine)
        fmt = lambda c: ", ".join(f"{k} {v}" for k, v in c.most_common())
        c = centres.get(gid)
        where = f"{c['x']}, {c['y']}" if c else "–"
        rows.append(f"| {name} | {len(mine)} | {people} | {where} | {fmt(src)} | {fmt(fail)} | {fmt(stance)} |")
    summary_md = "\n".join(rows)

    # Failure totals, the part that speaks to the brief.
    total = Counter(p["failure"] for p in posts)
    fail_rows = ["| Where it broke | Posts | Points to |", "| --- | --- | --- |"]
    for f, label, maps in FAILURES:
        fail_rows.append(f"| {label} | {total.get(f, 0)} | {maps or 'nothing to fix'} |")
    failures_md = "\n".join(fail_rows)

    # Per-post coding table.
    table = ["| Post | Date | Job | Urgent | Failure | Stance | Urgency | Failure score | Group | Why |", "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |"]
    for p in sorted(posts, key=lambda p: (list(GROUPS).index(p["group"]), p["job"], p["failure"])):
        table.append(f"| [{p['handle']}]({p['url']}) | {p['date']} | {p['job']} | {p['urgent']} | {p['failure']} | {p['stance']} | {p.get('x', '–')} | {p.get('y', '–')} | {GROUPS[p['group']].split(',')[0]} | {p['rationale']} |")
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

    blocks = {"chart": chart_md, "silhouette": sil_md, "resolutions": "\n".join(resolutions), "grid": grid_md, "groups": summary_md, "failures": failures_md, "coding": "\n".join(table),
              "excluded": "\n".join(excluded), "agreement": agreement_md}
    for pages, conv in ((PAGES, lambda x: x), (PT_PAGES, to_pt)):
        for page in pages:
            if page.exists():
                text = page.read_text(encoding="utf-8")
                for name, body in blocks.items():
                    text = replace_block(text, name, body if name in ("chart", "grid") else conv(body))
                page.write_text(text, encoding="utf-8")
    print(sil_md)
    print(summary_md)
    print(failures_md)
    print(agreement_md)


if __name__ == "__main__":
    main()
