#!/usr/bin/env python3
"""Checks the measurement layer of the App flow canvas against the measurement plan.

docs/verify/measurement-layer.json places every task, event and product metric from the plan
on the canvas: tasks on their start, path, success, failure and abandon frames, events on a
frame (or an element inside it, by CSS selector) or in the side lane, metrics on a frame.
The plan is the source of truth:
  docs/verify/telemetry.md  tasks (shopper and shop tables) and the event taxonomy
  docs/verify/metrics.md    the Metrics table
and their PT-BR twins for the Portuguese names.

  python3 scripts/build_measurement_layer.py           validate; exit 1 on any problem
  python3 scripts/build_measurement_layer.py --write   also copy names, event kinds and the
                                                       events behind each metric from the docs
                                                       into the JSON, then validate

It fails when a task, event or metric in the docs has no placement, when the JSON names one
the docs don't have, when a placement points at a frame missing from the canvas, or when a
selector matches nothing inside its frame.
"""
import json
import pathlib
import re
import sys
from html.parser import HTMLParser

ROOT = pathlib.Path(__file__).resolve().parent.parent
LAYER = ROOT / "docs/verify/measurement-layer.json"
TELEMETRY = ("docs/verify/telemetry.md", "docs/pt-br/verify/telemetry.md")
METRICS = ("docs/verify/metrics.md", "docs/pt-br/verify/metrics.md")
ROLES = ("start", "path", "success", "failure", "abandon")
LANES = ("shop", "service")


# --- Markdown tables -----------------------------------------------------------------------
def sections(text):
    """Yields (heading, table rows) for every pipe table, with the nearest heading above it."""
    heading, rows = "", []
    for line in text.splitlines() + [""]:
        if line.startswith("#"):
            heading = line.lstrip("#").strip()
        if line.startswith("|"):
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            if not all(re.fullmatch(r":?-+:?", c) for c in cells):
                rows.append(cells)
        elif rows:
            yield heading, rows
            rows = []


def table_after(text, headings):
    """Body rows of the first table under one of the headings (header row dropped)."""
    for heading, rows in sections(text):
        if heading in headings:
            return rows[1:]
    sys.exit(f"no table under {headings}")


def ticks(cell):
    return re.findall(r"`([a-z_]+)`", cell)


def read_docs():
    en_t, pt_t = (ROOT / p for p in TELEMETRY)
    en_m, pt_m = (ROOT / p for p in METRICS)
    en_t, pt_t, en_m, pt_m = (p.read_text() for p in (en_t, pt_t, en_m, pt_m))

    events, kinds = [], {}
    for heading, rows in sections(en_t):
        if rows and rows[0][:2] == ["Event", "Kind"]:
            for r in rows[1:]:
                name = ticks(r[0])[0]
                events.append(name)
                kinds[name] = r[1]
    known = set(events)

    tasks = []
    for actor, en_h, pt_h in (("shopper", "Shopper tasks", "Tarefas do comprador"), ("shop", "Shop tasks", "Tarefas da loja")):
        en_rows, pt_rows = table_after(en_t, {en_h}), table_after(pt_t, {pt_h})
        if len(en_rows) != len(pt_rows):
            sys.exit(f"{actor} tasks: {len(en_rows)} rows in EN, {len(pt_rows)} in PT")
        for e, p in zip(en_rows, pt_rows):
            tasks.append({"actor": actor, "en": e[0], "pt": p[0], "events": [x for x in dict.fromkeys(ticks(" ".join(e[1:]))) if x in known]})

    en_rows, pt_rows = table_after(en_m, {"Metrics"}), table_after(pt_m, {"Métricas"})
    if len(en_rows) != len(pt_rows):
        sys.exit(f"metrics: {len(en_rows)} rows in EN, {len(pt_rows)} in PT")
    metrics = [{"en": e[0], "pt": p[0], "events": [x for x in dict.fromkeys(ticks(e[1] + " " + e[2])) if x in known]} for e, p in zip(en_rows, pt_rows)]
    return events, kinds, tasks, metrics


# --- Canvas frames and a small CSS selector matcher ---------------------------------------------
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}


class Node:
    def __init__(self, tag, attrs, parent):
        self.tag, self.attrs, self.parent, self.children = tag, dict(attrs), parent, []
        self.classes = set((self.attrs.get("class") or "").split())


class Tree(HTMLParser):
    def __init__(self):
        super().__init__()
        self.root = Node("#root", [], None)
        self.cur = self.root

    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs, self.cur)
        self.cur.children.append(n)
        if tag not in VOID:
            self.cur = n

    def handle_endtag(self, tag):
        n = self.cur
        while n is not self.root and n.tag != tag:
            n = n.parent
        if n is not self.root:
            self.cur = n.parent


def walk(n):
    for c in n.children:
        yield c
        yield from walk(c)


SIMPLE = re.compile(r"(\*|[a-z][a-z0-9]*)|#([\w-]+)|\.([\w-]+)|\[([\w-]+)(?:=\"?([^\]\"]*)\"?)?\]|:(not)\(([^)]*)\)|:(first-child|last-child)|:nth-(child|of-type)\((\d+)\)")


def compound(sel):
    parts, pos = [], 0
    while pos < len(sel):
        m = SIMPLE.match(sel, pos)
        if not m:
            raise ValueError(f"unsupported selector part: {sel[pos:]!r}")
        parts.append(m)
        pos = m.end()
    return parts


def matches(n, parts):
    sibs = [c for c in n.parent.children] if n.parent else [n]
    for m in parts:
        tag, id_, cls, attr, val, neg, negsel, pos, nth, idx = m.groups()
        if tag and tag != "*" and n.tag != tag:
            return False
        if id_ and n.attrs.get("id") != id_:
            return False
        if cls and cls not in n.classes:
            return False
        if attr and (attr not in n.attrs or (val is not None and n.attrs[attr] != val)):
            return False
        if neg and matches(n, compound(negsel)):
            return False
        if pos == "first-child" and sibs[0] is not n:
            return False
        if pos == "last-child" and sibs[-1] is not n:
            return False
        if nth == "child" and (sibs.index(n) + 1) != int(idx):
            return False
        if nth == "of-type" and ([s for s in sibs if s.tag == n.tag].index(n) + 1) != int(idx):
            return False
    return True


def select(scope, selector):
    """Descendants of scope matching a descendant-combinator selector."""
    chain = [compound(p) for p in selector.split()]
    found = []
    for n in walk(scope):
        if not matches(n, chain[-1]):
            continue
        anc, i = n.parent, len(chain) - 2
        while i >= 0 and anc is not None and anc is not scope:
            if matches(anc, chain[i]):
                i -= 1
            anc = anc.parent
        if i < 0:
            found.append(n)
    return found


def canvas_frames(path):
    tree = Tree()
    tree.feed((ROOT / path).read_text())
    return {n.attrs["id"]: n for n in walk(tree.root) if n.tag == "section" and "frame" in n.classes and n.attrs.get("id")}


def dump(layer):
    """One task, event or metric per line, so a diff shows what moved."""
    one = lambda v: json.dumps(v, ensure_ascii=False, separators=(", ", ": "))
    out = []
    for k, v in layer.items():
        if isinstance(v, list):
            out.append(f'  "{k}": [\n' + ",\n".join("    " + one(i) for i in v) + "\n  ]")
        else:
            out.append(f'  "{k}": {one(v)}')
    return "{\n" + ",\n".join(out) + "\n}\n"


# --- Check ---------------------------------------------------------------------------------------
def main():
    write = "--write" in sys.argv
    layer = json.loads(LAYER.read_text())
    events, kinds, tasks, metrics = read_docs()
    frames = canvas_frames(layer["canvas"])
    errors = []

    by_en = {t["en"]: t for t in tasks}
    for t in layer["tasks"]:
        doc = by_en.get(t["name"]["en"])
        if not doc:
            errors.append(f"task {t['name']['en']!r} is not in telemetry.md")
            continue
        if write:
            t["name"]["pt"], t["actor"] = doc["pt"], doc["actor"]
        if t["name"]["pt"] != doc["pt"]:
            errors.append(f"task {t['name']['en']!r}: PT name {t['name']['pt']!r} should be {doc['pt']!r}")
        if t.get("actor") != doc["actor"]:
            errors.append(f"task {t['name']['en']!r}: actor should be {doc['actor']}")
        if not t.get("start") or not t.get("success"):
            errors.append(f"task {t['name']['en']!r}: needs start and success frames")
        for role in ROLES:
            for f in t.get(role, []):
                if f not in frames:
                    errors.append(f"task {t['name']['en']!r}: {role} frame #{f} is not on the canvas")
    placed_tasks = {t["name"]["en"] for t in layer["tasks"]}
    errors += [f"task {t['en']!r} has no placement on the canvas" for t in tasks if t["en"] not in placed_tasks]

    placed = {}
    for e in layer["events"]:
        name = e["name"]
        if name in placed:
            errors.append(f"event {name} is listed twice")
        placed[name] = e
        if name not in kinds:
            errors.append(f"event {name} is not in the taxonomy in telemetry.md")
            continue
        if write:
            e["kind"] = kinds[name]
        if e.get("kind") != kinds[name]:
            errors.append(f"event {name}: kind should be {kinds[name]}")
        if not e.get("at"):
            errors.append(f"event {name}: no placement")
        for a in e.get("at", []):
            if "lane" in a:
                if a["lane"] not in LANES:
                    errors.append(f"event {name}: lane must be one of {LANES}")
                continue
            f = a.get("frame")
            if f not in frames:
                errors.append(f"event {name}: frame #{f} is not on the canvas")
            elif a.get("sel"):
                try:
                    if not select(frames[f], a["sel"]):
                        errors.append(f"event {name}: {a['sel']!r} matches nothing in #{f}")
                except ValueError as ex:
                    errors.append(f"event {name}: {ex}")
    errors += [f"event {n} has no placement on the canvas" for n in events if n not in placed]

    by_metric = {m["en"]: m for m in metrics}
    for m in layer["metrics"]:
        doc = by_metric.get(m["name"]["en"])
        if not doc:
            errors.append(f"metric {m['name']['en']!r} is not in the Metrics table of metrics.md")
            continue
        if write:
            m["name"]["pt"], m["events"] = doc["pt"], doc["events"]
        if m["name"]["pt"] != doc["pt"]:
            errors.append(f"metric {m['name']['en']!r}: PT name should be {doc['pt']!r}")
        if m.get("events", []) != doc["events"]:
            errors.append(f"metric {m['name']['en']!r}: events should be {doc['events']}")
        if not m.get("at"):
            errors.append(f"metric {m['name']['en']!r}: no placement")
        for a in m.get("at", []):
            if a != "lane" and a not in frames:
                errors.append(f"metric {m['name']['en']!r}: frame #{a} is not on the canvas")
    placed_metrics = {m["name"]["en"] for m in layer["metrics"]}
    errors += [f"metric {m['en']!r} has no placement on the canvas" for m in metrics if m["en"] not in placed_metrics]

    if write:
        LAYER.write_text(dump(layer))
    if errors:
        print(f"{LAYER.relative_to(ROOT)}: {len(errors)} problem(s)", file=sys.stderr)
        for e in errors:
            print("  - " + e, file=sys.stderr)
        sys.exit(1)
    print(f"ok: {len(layer['tasks'])} tasks, {len(layer['events'])} events, {len(layer['metrics'])} metrics placed on {layer['canvas']}")


if __name__ == "__main__":
    main()
