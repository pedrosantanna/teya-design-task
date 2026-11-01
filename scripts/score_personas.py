"""Score netnography quotes on the two dimensions and place the personas.

    python3 scripts/score_personas.py

Reads docs/discover/personas/scores.json (the coding), looks each quote up in
the netnography pages for its date and link, and rewrites the generated blocks
between <!-- generated:NAME --> markers in the persona pages.

Scoring: each axis starts at the midpoint (5) and moves half a point for every
rubric point on either side, clamped to 0..10.
  x = 5 + (mission points - browse points) / 2
  y = 5 + (committed points - pragmatist points) / 2
A persona sits at the mean of the quotes assigned to it.
"""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "docs" / "discover" / "personas" / "scores.json"
SOURCES = [ROOT / "docs" / "discover" / "netnography" / p for p in ("findings.md", "dimensions.md")]
PAGES = [ROOT / "docs" / "discover" / "personas" / p for p in ("index.md", "scoring.md")]
QUOTE_RE = re.compile(r"```quote\n(.*?)```", re.S)


def load_quotes():
    found = []
    for path in SOURCES:
        for block in QUOTE_RE.findall(path.read_text(encoding="utf-8")):
            q = {}
            for line in block.splitlines():
                if ":" in line:
                    k, v = line.split(":", 1)
                    q[k.strip()] = v.strip()
            found.append(q)
    return found


def weights(rubric_axis):
    w = {}
    for side, items in rubric_axis.items():
        if isinstance(items, dict):
            for code, (pts, _) in items.items():
                w[code] = (side, pts)
    return w


def axis_score(codes, w, plus, minus):
    p = sum(w[c][1] for c in codes if c in w and w[c][0] == plus)
    m = sum(w[c][1] for c in codes if c in w and w[c][0] == minus)
    return max(0.0, min(10.0, 5 + (p - m) / 2))


def replace_block(text, name, body):
    pattern = re.compile(rf"(<!-- generated:{name} -->\n).*?(<!-- /generated:{name} -->)", re.S)
    if not pattern.search(text):
        return text
    return pattern.sub(lambda m: m.group(1) + body + "\n" + m.group(2), text)


def main():
    data = json.loads(DATA.read_text(encoding="utf-8"))
    wx, wy = weights(data["rubric"]["x"]), weights(data["rubric"]["y"])
    quotes = load_quotes()
    rows, problems = [], []
    for item in data["quotes"]:
        hit = next((q for q in quotes if q.get("handle") == item["handle"] and item["match"] in q.get("text", "")), None)
        if not hit:
            problems.append(f"not found in pages: {item['handle']} / {item['match']}")
            continue
        x = axis_score(item["codes"], wx, "mission", "browse")
        y = axis_score(item["codes"], wy, "committed", "pragmatist")
        rows.append({**item, "x": x, "y": y, "date": hit.get("date", ""), "url": hit.get("url", ""), "network": hit.get("network", "")})

    centroids = {}
    for pid, name in data["personas"].items():
        mine = [r for r in rows if r["persona"] == pid]
        if mine:
            centroids[pid] = {
                "name": name, "n": len(mine),
                "x": round(sum(r["x"] for r in mine) / len(mine), 1),
                "y": round(sum(r["y"] for r in mine) / len(mine), 1),
            }

    chart = {
        "x": {"min": "Browse", "max": "Mission", "label": "How specific and urgent the need is"},
        "y": {"min": "Pragmatist", "max": "Committed", "label": "How much effort they spend on local"},
        "groups": {pid: c["name"] for pid, c in centroids.items()},
        "points": [{"x": r["x"], "y": r["y"], "group": r["persona"], "label": r["handle"]} for r in rows],
        "personas": [{"id": pid, "x": c["x"], "y": c["y"], "label": c["name"], "n": c["n"]} for pid, c in centroids.items()],
    }
    chart_md = "```persona-map\n" + json.dumps(chart, ensure_ascii=False) + "\n```"

    place = ["| Persona | Quotes | Need (0 browse → 10 mission) | Effort (0 pragmatist → 10 committed) |", "| --- | --- | --- | --- |"]
    place += [f"| {c['name']} | {c['n']} | {c['x']} | {c['y']} |" for c in centroids.values()]
    place_md = "\n".join(place)

    def rubric_table(axis):
        out = ["| Code | Side | Points | Indicator |", "| --- | --- | --- | --- |"]
        for side, items in data["rubric"][axis].items():
            if isinstance(items, dict):
                out += [f"| {code} | {side} | {pts} | {desc} |" for code, (pts, desc) in items.items()]
        return "\n".join(out)

    table = ["| Quote | Date | Codes | Need | Effort | Persona |", "| --- | --- | --- | --- | --- | --- |"]
    for r in sorted(rows, key=lambda r: (r["persona"], -r["x"])):
        table.append(f"| [{r['handle']}]({r['url']}) | {r['date']} | {' '.join(r['codes'])} | {r['x']:g} | {r['y']:g} | {data['personas'][r['persona']].split(',')[0]} |")
    excluded = ["| Quote | Why it is not scored |", "| --- | --- |"] + [f"| {e['handle']} | {e['why']} |" for e in data["excluded"]]

    blocks = {
        "chart": chart_md,
        "placement": place_md,
        "rubric-x": rubric_table("x"),
        "rubric-y": rubric_table("y"),
        "quote-scores": "\n".join(table),
        "excluded": "\n".join(excluded),
    }
    for page in PAGES:
        if page.exists():
            text = page.read_text(encoding="utf-8")
            for name, body in blocks.items():
                text = replace_block(text, name, body)
            page.write_text(text, encoding="utf-8")

    for c in centroids.values():
        print(f"{c['name']:<28} n={c['n']:<3} need={c['x']:<4} effort={c['y']}")
    if problems:
        print("\n".join(problems))
        raise SystemExit(1)


if __name__ == "__main__":
    main()
