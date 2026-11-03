// Small modelling kit shared by the illustrations. Every helper returns a Mesh carrying a
// MeshToonMaterial in one palette colour; the viewer swaps it for its own two-tone material,
// draws the outlines in screen space and adds the cast shadow.
// Options: pos, rot, scale, noShadow (casts no shadow), ground (receives shadows; drawn first),
// part (meshes with the same part name share one outline id, so no line is drawn where they meet).
// Curved primitives use enough segments that their silhouettes stay smooth at 4x zoom.
export default function kit(THREE) {
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const SEG = 64;

  function mesh(geo, hex, o = {}) {
    const m = new THREE.Mesh(geo, new THREE.MeshToonMaterial({ color: hex }));
    if (o.pos) m.position.set(...o.pos);
    if (o.rot) m.rotation.set(...o.rot);
    if (o.scale) m.scale.set(...o.scale);
    if (o.noShadow) m.userData.noShadow = true;
    if (o.ground) { m.userData.ground = true; m.userData.noShadow = true; }
    if (o.part) m.userData.part = o.part;
    return m;
  }

  // Box sitting on y = 0 of its position (pos is the centre of the bottom face).
  const box = (w, h, d, hex, pos, o = {}) => mesh(new THREE.BoxGeometry(w, h, d), hex, { pos, ...o });
  const block = (w, h, d, hex, [x, y, z], o = {}) => box(w, h, d, hex, [x, y + h / 2, z], o);
  const cyl = (rt, rb, h, hex, pos, o = {}) => mesh(new THREE.CylinderGeometry(rt, rb, h, o.seg || SEG), hex, { pos, ...o });
  const sphere = (r, hex, pos, o = {}) => mesh(new THREE.SphereGeometry(r, o.seg || SEG, (o.seg || SEG) / 2), hex, { pos, ...o });
  // A thin cylinder whose flat face looks along an axis ('x', 'y' or 'z').
  function disc(r, t, hex, pos, axis = 'z', o = {}) {
    const rot = axis === 'z' ? [Math.PI / 2, 0, 0] : axis === 'x' ? [0, 0, Math.PI / 2] : [0, 0, 0];
    return mesh(new THREE.CylinderGeometry(r, r, t, o.seg || SEG), hex, { pos, rot, ...o });
  }
  // Capsule between two points.
  function capsule(a, b, r, hex, o = {}) {
    const dir = new THREE.Vector3().subVectors(b, a), len = dir.length();
    const m = mesh(new THREE.CapsuleGeometry(r, Math.max(len, 0.001), 16, 48), hex, o);
    m.position.copy(a).add(b).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(V(0, 1, 0), dir.normalize());
    return m;
  }
  // Solid of revolution from [radius, y] pairs, bottom to top.
  const lathe = (pts, hex, pos, o = {}) =>
    mesh(new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), o.seg || SEG), hex, { pos, ...o });
  // Extruded 2D shape (x, y), centred on its depth along z.
  function extrude(shape, depth, hex, o = {}) {
    const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 32 });
    g.translate(0, 0, -depth / 2);
    return mesh(g, hex, o);
  }
  // A profile drawn in the side view (x = outwards, y = up) extruded sideways by `width` along x.
  function profile(points, width, hex, pos, o = {}) {
    const s = new THREE.Shape();
    points.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
    const m = extrude(s, width, hex, o);
    m.geometry.rotateY(-Math.PI / 2);
    if (pos) m.position.set(...pos);
    return m;
  }
  function group(children = [], pos) {
    const g = new THREE.Group();
    children.forEach(c => g.add(c));
    if (pos) g.position.set(...pos);
    return g;
  }
  return { V, mesh, box, block, cyl, sphere, disc, capsule, lathe, extrude, profile, group };
}
