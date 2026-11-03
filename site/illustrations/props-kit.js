// Shared helpers for the street props and small objects (phone box, litter bin, bench, café table,
// mannequin, bag, glasses, tea, lamp post). Standalone models are drawn at about 1 unit = 1 m.
// Minis are drawn with the same code and scaled to the street scenes' scale (the corner's lamp post:
// 1 unit ≈ 2.5 m), standing on y = 0 at their base centre, front facing +z.
export const MINI = 0.4;

// Adds each [object, delay] to the group and returns the viewer's parts list. Every mesh skips frustum
// culling, since the entry spring and the idles move parts away from where their bounds were taken.
export function collect(g, list) {
  g.traverse(o => { if (o.isMesh) o.frustumCulled = false; });
  return list.map(([object, delay]) => {
    if (object.parent !== g) g.add(object);
    object.traverse(o => { if (o.isMesh) o.frustumCulled = false; });
    return { object, delay };
  });
}

// Wraps a standalone-scale group in an outer group at the street scenes' scale.
export function mini(THREE, children) {
  const outer = new THREE.Group(), inner = new THREE.Group();
  children.forEach(c => inner.add(c));
  inner.scale.setScalar(MINI);
  outer.add(inner);
  return outer;
}
