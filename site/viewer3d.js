// HSViewer3D.mount(root, opts) shows the procedural 3D illustrations in a Figma-like viewer:
// objects on the left, scene settings on the right (each panel collapses), and the viewport corners hold
// the view tools (bottom left), camera and zoom (bottom right) and performance (top right).
// opts: { lang, t, icon, modelsUrl, about }. three.js is loaded on demand from jsDelivr, pinned to 0.170.0.
//
// Look (technical illustration):
// - Two flat tones per face: the palette colour where the light falls, and a shade tone mixed toward a dark
//   version of the background, so the scene picks up the colour of whatever it sits on.
// - Outlines are found in screen space after the scene is drawn: a pass compares each pixel's object id,
//   view-space normal and depth with its neighbours at a fixed pixel radius. Silhouettes, contact lines
//   and creases (faces meeting at 35° or more) come out as one line of constant width at any zoom.
//   MSAA on the colour buffer and FXAA at the end keep edges and curves smooth.
// - A flat cast shadow in the same derived dark tone, projected from one light onto the ground.
// Export (app assets): the Export section of the settings panel, or ?export=1 in the URL for scripts
// (window.__exportFrames), renders numbered PNG frames at size × scale pixels with a true isometric camera,
// a fixed-step clock and a transparent background shaded for a given ground (app/scripts/illustrations).
(function () {
  const CDN = 'https://cdn.jsdelivr.net/npm/three@0.170.0';
  let libP = null;
  // jsDelivr's +esm builds rewrite the bare 'three' import, so every addon shares one three.js instance.
  const loadLib = () => libP || (libP = Promise.all([
    import(`${CDN}/+esm`),
    import(`${CDN}/examples/jsm/controls/OrbitControls.js/+esm`),
    import(`${CDN}/examples/jsm/postprocessing/EffectComposer.js/+esm`),
    import(`${CDN}/examples/jsm/postprocessing/RenderPass.js/+esm`),
    import(`${CDN}/examples/jsm/postprocessing/ShaderPass.js/+esm`),
    import(`${CDN}/examples/jsm/shaders/FXAAShader.js/+esm`),
  ]).then(([THREE, oc, ec, rp, sp, fx]) => ({
    THREE, OrbitControls: oc.OrbitControls, EffectComposer: ec.EffectComposer, RenderPass: rp.RenderPass,
    ShaderPass: sp.ShaderPass, FXAAShader: fx.FXAAShader,
  })).catch(e => { libP = null; throw e; }));

  // Palette from docs/develop/design-system/colour.md.
  const ramp = a => Object.fromEntries([50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((k, i) => [k, a[i]]));
  const PALETTE = {
    indigo: ramp(['#F4F6FF', '#E8ECFF', '#D1D8FF', '#B5BFFF', '#96A2FF', '#7982FF', '#5F63E8', '#494AC0', '#3D35B8', '#222169']),
    peach: ramp(['#FDF5F2', '#F9E9E4', '#F2D3C9', '#FFB59E', '#D69B88', '#C17F6B', '#A6634E', '#864B39', '#663627', '#462318']),
    pistachio: ramp(['#F5F8F1', '#E9F0E1', '#C9EBA2', '#B8CDA1', '#9BB57C', '#809E5C', '#65833E', '#4D682A', '#384D1A', '#24340E']),
    butter: ramp(['#F9F7F0', '#FFE7A0', '#E4DAC0', '#D2C49A', '#BCAA73', '#A69050', '#8B752F', '#6F5C1A', '#53430D', '#382C04']),
    lavender: ramp(['#F7F6FD', '#EDEBF8', '#DCD6F1', '#CDBDFF', '#AEA2D6', '#9687C3', '#7C6CA8', '#625388', '#483C67', '#302747']),
    biscuit: { bg: '#F4F1ED', card: '#FFFFFF', muted: '#E5E2DE', mutedFg: '#59534D', fg: '#100A06',
      darkBg: '#100A06', darkCard: '#231D18', darkMuted: '#332C27', darkMutedFg: '#B1AA9F', darkFg: '#FCFAF6' },
  };
  const INK = '#1a1714';
  // Backgrounds, each with the dark tone of its own hue that shade and shadow mix toward.
  // "canvas" follows the site's theme.
  const BGS = [
    { id: 'canvas', name: 'Canvas' },
    { id: 'biscuit', name: 'Biscuit', color: PALETTE.biscuit.bg, dark: INK },
    { id: 'butter', name: 'Butter 100', color: PALETTE.butter[100], dark: PALETTE.butter[800] },
    { id: 'peach', name: 'Peach 100', color: PALETTE.peach[100], dark: PALETTE.peach[800] },
    { id: 'pistachio', name: 'Pistachio 200', color: PALETTE.pistachio[200], dark: PALETTE.pistachio[800] },
    { id: 'lavender', name: 'Lavender 200', color: PALETTE.lavender[200], dark: PALETTE.lavender[800] },
    { id: 'indigo', name: 'Indigo 800', color: PALETTE.indigo[800], dark: PALETTE.indigo[900] },
    { id: 'dark', name: 'Biscuit dark', color: PALETTE.biscuit.darkBg, dark: PALETTE.indigo[900] },
  ];
  // Shade = mix(base × SHADE × ambient tint, background dark, K). The cast shadow uses the same rule
  // with the ground colour as base and a stronger pull (KS) toward the dark tone.
  const SHADE = 0.56, K = 0.36, KS = 0.5, TINT = 0.5;
  const ISO_EL = Math.atan(1 / Math.SQRT2); // 35.264°
  const LIGHT_AZ = -30, LIGHT_EL = 62; // degrees; upper left in the isometric view
  const DROP = 2.2, SPRING = 150, DAMP = 2 * 0.38 * Math.sqrt(150); // entry spring
  const LINE_CSS = 1.25; // outline width in CSS pixels
  const CREASE = Math.cos(35 * Math.PI / 180);

  // --- Export mode (app assets) ---------------------------------------------------------------
  // URL: ?export=1&object=box&size=120&scale=3&ground=%23F4F1ED&fps=24&seconds=2&clip=entry|idle|still
  // (read from the query string, or from a query after the hash: #illustrations?export=1&…).
  // In this mode window.__exportFrames(opts?) renders and returns { frames: [PNG data URLs], meta }.
  const EXPORT_DEFAULTS = { object: 'box', size: 120, scale: 3, ground: '#F4F1ED', fps: 24, clip: 'entry', seconds: null, margin: 0.07, shadows: true, az: null, el: null, dark: null, opaque: false, height: null, shade: null, k: null, ink: null, recolor: null };
  function exportParams() {
    const q = new URLSearchParams(location.search);
    const h = location.hash.indexOf('?');
    if (h >= 0) new URLSearchParams(location.hash.slice(h + 1)).forEach((v, k) => q.set(k, v));
    if (q.get('export') !== '1') return null;
    const o = { ...EXPORT_DEFAULTS };
    q.forEach((v, k) => {
      if (!(k in o)) return;
      o[k] = typeof EXPORT_DEFAULTS[k] === 'number' || ['seconds', 'az', 'el', 'height', 'shade', 'k'].includes(k) ? +v : k === 'shadows' || k === 'opaque' ? v !== '0' && v !== 'false' : v;
    });
    return o;
  }
  // A store-only zip (PNGs are compressed already).
  const CRC_T = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
    return t;
  })();
  const crc32 = b => { let c = ~0; for (let i = 0; i < b.length; i++) c = CRC_T[(c ^ b[i]) & 255] ^ (c >>> 8); return ~c >>> 0; };
  function zipStore(files) {
    const enc = new TextEncoder(), out = [], dir = [];
    let off = 0;
    files.forEach(f => {
      const name = enc.encode(f.name), crc = crc32(f.data), n = f.data.length;
      const h = new DataView(new ArrayBuffer(30));
      h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(12, 0x21, true);
      h.setUint32(14, crc, true); h.setUint32(18, n, true); h.setUint32(22, n, true); h.setUint16(26, name.length, true);
      out.push(h, name, f.data);
      const c = new DataView(new ArrayBuffer(46));
      c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(14, 0x21, true);
      c.setUint32(16, crc, true); c.setUint32(20, n, true); c.setUint32(24, n, true); c.setUint16(28, name.length, true);
      c.setUint32(42, off, true);
      dir.push(c, name);
      off += 30 + name.length + n;
    });
    const size = dir.reduce((s, x) => s + x.byteLength, 0);
    const e = new DataView(new ArrayBuffer(22));
    e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true);
    e.setUint32(12, size, true); e.setUint32(16, off, true);
    return new Blob([...out, ...dir, e], { type: 'application/zip' });
  }
  const dataUrlBytes = u => Uint8Array.from(atob(u.slice(u.indexOf(',') + 1)), ch => ch.charCodeAt(0));

  const svg = p => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const IC = {
    orbit: svg('<path d="M16.47 7.5C15.64 4.24 13.95 2 12 2 9.24 2 7 6.48 7 12s2.24 10 5 10c.34 0 .68-.07 1-.2"/><path d="m15.19 13.71 3.82 1.86-1.86 3.81"/><path d="M19 15.57c-1.8.89-4.27 1.43-7 1.43-5.52 0-10-2.24-10-5s4.48-5 10-5c4.84 0 8.87 1.72 9.8 4"/>'),
    pan: svg('<path d="M18 11V6a2 2 0 0 0-4 0"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>'),
    zoom: svg('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6"/><path d="M8 11h6"/>'),
    reset: svg('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>'),
    fit: svg('<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3"/>'),
    minus: svg('<path d="M5 12h14"/>'),
    plus: svg('<path d="M5 12h14"/><path d="M12 5v14"/>'),
    objects: svg('<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'),
    panelL: svg('<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>'),
    panelR: svg('<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/>'),
    settings: svg('<path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>'),
  };

  // --- Shaders ----------------------------------------------------------------------------
  // Two-tone surface: lit = palette colour; shade = mix(base × SHADE × ambient tint, background dark, K).
  const TOON_VS = `
    varying vec3 vN;
    void main() {
      vN = ( vec4( normalMatrix * normal, 0.0 ) * viewMatrix ).xyz; // world-space normal
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`;
  const TOON_FS = `
    uniform vec3 uBase; uniform vec3 uL; uniform vec3 uAmb; uniform vec3 uDark; uniform float uShade; uniform float uK;
    varying vec3 vN;
    void main() {
      vec3 n = normalize( vN ); if ( !gl_FrontFacing ) n = -n;
      float d = dot( n, uL ) - 0.03;
      float w = max( fwidth( d ) * 0.75, 1e-4 );
      float lit = smoothstep( -w, w, d );
      vec3 shade = mix( uBase * uShade * uAmb, uDark, uK );
      gl_FragColor = vec4( mix( shade, uBase, lit ), 1.0 );
    }`;
  // Id pass: view-space normal in rgb, object id in alpha (0 = background).
  const ID_VS = `
    varying vec3 vN;
    void main() { vN = normalMatrix * normal; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }`;
  const ID_FS = `
    uniform float uId; varying vec3 vN;
    void main() { vec3 n = normalize( vN ); if ( !gl_FrontFacing ) n = -n; gl_FragColor = vec4( n, uId ); }`;
  // Outline pass: compares each pixel with 8 neighbours per ring, out to uR pixels.
  const OUTLINE = {
    uniforms: {
      tDiffuse: { value: null }, tNormal: { value: null }, tDepth: { value: null },
      uTexel: { value: null }, uR: { value: 1 }, uOn: { value: 1 }, uOrtho: { value: 1 }, uNear: { value: 0.1 }, uFar: { value: 100 },
      uPx0: { value: 0.01 }, uPxK: { value: 0.001 }, uCos: { value: CREASE }, uInk: { value: null },
    },
    vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }`,
    fragmentShader: `
      #include <packing>
      uniform sampler2D tDiffuse; uniform sampler2D tNormal; uniform sampler2D tDepth;
      uniform vec2 uTexel; uniform float uR; uniform float uOn; uniform float uOrtho; uniform float uNear; uniform float uFar;
      uniform float uPx0; uniform float uPxK; uniform float uCos; uniform vec3 uInk;
      varying vec2 vUv;
      float vz( vec2 uv ) {
        float d = texture2D( tDepth, uv ).x;
        return uOrtho > 0.5 ? -orthographicDepthToViewZ( d, uNear, uFar ) : -perspectiveDepthToViewZ( d, uNear, uFar );
      }
      float edge( vec4 a, float za, float tol, vec2 o ) {
        vec2 uv = vUv + o * uTexel;
        vec4 b = texture2D( tNormal, uv );
        if ( abs( a.w - b.w ) > 0.5 ) return 1.0;      // another object, or the background
        if ( a.w < 0.5 ) return 0.0;                   // background on both sides
        if ( dot( a.xyz, b.xyz ) < uCos ) return 1.0;  // crease on the same object
        return step( tol * length( o ), abs( za - vz( uv ) ) ); // the object passes in front of itself
      }
      vec3 toSRGB( vec3 c ) { return mix( c * 12.92, 1.055 * pow( c, vec3( 1.0 / 2.4 ) ) - 0.055, step( 0.0031308, c ) ); }
      void main() {
        vec4 col = texture2D( tDiffuse, vUv );
        float cov = 0.0;
        if ( uOn > 0.5 ) {
          vec4 a = texture2D( tNormal, vUv );
          float za = a.w > 0.5 ? vz( vUv ) : 0.0;
          float nz = max( abs( a.z ), 0.12 );
          float px = uOrtho > 0.5 ? uPx0 : za * uPxK;
          float tol = px * ( 2.5 * sqrt( max( 0.0, 1.0 - nz * nz ) ) / nz + 6.0 ) + 0.01;
          for ( int i = 1; i <= 3; i++ ) {
            float r = float( i );
            if ( r > uR || cov > 0.5 ) break;
            float d = floor( r * 0.7071 + 0.5 );
            cov = max( cov, edge( a, za, tol, vec2( r, 0.0 ) ) );
            cov = max( cov, edge( a, za, tol, vec2( -r, 0.0 ) ) );
            cov = max( cov, edge( a, za, tol, vec2( 0.0, r ) ) );
            cov = max( cov, edge( a, za, tol, vec2( 0.0, -r ) ) );
            cov = max( cov, edge( a, za, tol, vec2( d, d ) ) );
            cov = max( cov, edge( a, za, tol, vec2( -d, d ) ) );
            cov = max( cov, edge( a, za, tol, vec2( d, -d ) ) );
            cov = max( cov, edge( a, za, tol, vec2( -d, -d ) ) );
          }
        }
        // The colour buffer is premultiplied linear light; ink goes over it, then out as sRGB.
        vec3 rgb = col.a > 0.0 ? toSRGB( col.rgb / col.a ) : vec3( 0.0 );
        float oa = cov + col.a * ( 1.0 - cov );
        vec3 o = uInk * cov + rgb * col.a * ( 1.0 - cov );
        gl_FragColor = vec4( o, oa );
      }`,
  };

  function mount(root, opts = {}) {
    root.__viewer?.destroy?.();
    const t = k => (opts.t ? opts.t(k) : k) ?? k;
    const tx = (k, en) => { const v = t(k); return v && v !== k ? v : en; }; // strings not in the site's UI tables yet
    const exportURL = exportParams();
    if (!document.getElementById('v3-export-css')) {
      const st = document.createElement('style');
      st.id = 'v3-export-css';
      st.textContent = `.v3-field{display:grid;grid-template-columns:72px minmax(0,1fr);align-items:center;gap:8px;font-size:13px}
.v3-field select,.v3-field input{min-width:0;height:28px;padding:0 6px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--fg);font:inherit;font-size:13px}
.v3-ex-status{margin:0;color:var(--muted-fg);font-size:12px}.v3-ex-status:empty{display:none}`;
      document.head.appendChild(st);
    }
    const icon = (n, fb) => (opts.icon && opts.icon(n)) || fb || '';
    const lang = opts.lang === 'pt' ? 'pt' : 'en';
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const narrowMQ = matchMedia('(max-width: 860px)');
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
    const page = root.closest('.cv-page');
    page?.classList.add('is-v3');
    root.classList.add('v3-root');

    const hideBtn = side => `<button type="button" class="v3-hide" data-hide="${side}" aria-controls="v3-${side}" aria-expanded="true" title="${esc(t('hidePanel'))} (${side === 'left' ? '[' : ']'})" aria-label="${esc(t('hidePanel'))}" aria-keyshortcuts="${side === 'left' ? '[' : ']'}">${side === 'left' ? IC.panelL : IC.panelR}</button>`;
    const toolBtn = (id, key) => `<button type="button" data-tool="${id}" aria-pressed="${id === 'orbit'}" title="${esc(t('tool_' + id))} (${key})" aria-label="${esc(t('tool_' + id))}" aria-keyshortcuts="${key}">${IC[id]}</button>`;
    root.innerHTML = `
      <section class="v3-panel v3-left" id="v3-left" aria-label="${esc(t('viewerGallery'))}" data-panel="left">
        <div class="v3-head"><h2 class="v3-h">${esc(t('viewerObjects'))}</h2>${hideBtn('left')}</div>
        <div class="v3-gallery" role="list"></div>
      </section>
      <div class="v3-viewport">
        <canvas class="v3-canvas" tabindex="0" aria-label="${esc(t('viewerLabel'))}"></canvas>
        <div class="v3-mobile">
          <button type="button" class="v3-pbtn" data-open="left" aria-expanded="false" title="${esc(t('viewerObjects'))}" aria-label="${esc(t('viewerObjects'))}">${IC.objects}</button>
          <button type="button" class="v3-pbtn" data-open="right" aria-expanded="false" title="${esc(t('viewerSettings'))}" aria-label="${esc(t('viewerSettings'))}">${IC.settings}</button>
        </div>
        <div class="cv-tools v3-tools" role="toolbar" aria-label="${esc(t('viewerTools'))}">
          ${toolBtn('orbit', 'O')}${toolBtn('pan', 'H')}${toolBtn('zoom', 'Z')}
          <span class="v3-sep" aria-hidden="true"></span>
          <button type="button" data-act="reset" title="${esc(t('resetView'))} (R)" aria-label="${esc(t('resetView'))}" aria-keyshortcuts="R">${IC.reset}</button>
        </div>
        <div class="v3-br">
        <div class="cv-zoom v3-cam" role="group" aria-label="${esc(t('camera'))}">
          ${[['iso', 'isometric', 'isoShort'], ['ortho', 'orthographic', 'orthoShort'], ['persp', 'perspective', 'perspShort']].map(([id, full, short]) =>
            `<button type="button" data-cam="${id}" aria-pressed="${id === 'iso'}" title="${esc(t('camera'))}: ${esc(t(full))}" aria-label="${esc(t(full))}">${esc(t(short))}</button>`).join('')}
        </div>
        <div class="cv-zoom v3-zoom" role="group" aria-label="${esc(t('zoom'))}">
          <button type="button" data-z="out" title="${esc(t('zoomOut'))} (−)" aria-label="${esc(t('zoomOut'))}">${IC.minus}</button>
          <button type="button" class="cv-pct" data-z="reset" title="${esc(t('zoom100'))} (Shift+0)">100%</button>
          <button type="button" data-z="in" title="${esc(t('zoomIn'))} (+)" aria-label="${esc(t('zoomIn'))}">${IC.plus}</button>
          <button type="button" data-z="fit" title="${esc(t('zoomFit'))} (Shift+1)" aria-label="${esc(t('zoomFit'))}">${IC.fit}</button>
        </div>
        </div>
        <div class="v3-tr">
          <div class="v3-perf" role="group" aria-label="${esc(t('viewerPerf'))}" title="${esc(t('viewerPerf'))}">
            <span><b class="v3-fps">–</b> ${esc(t('fps'))}</span><span><b class="v3-ms">–</b> ms</span>
          </div>
          <button type="button" class="v3-reveal" data-reveal="right" aria-controls="v3-right" aria-expanded="false" title="${esc(t('showSettings'))} (])" aria-label="${esc(t('showSettings'))}" aria-keyshortcuts="]">${IC.panelR}</button>
        </div>
        <p class="v3-status" hidden></p>
      </div>
      <section class="v3-panel v3-right" id="v3-right" aria-label="${esc(t('viewerSettings'))}" data-panel="right">
        <div class="v3-sec">
          <div class="v3-head"><h2 class="v3-h v3-objname">–</h2>${hideBtn('right')}</div>
          <button type="button" class="v3-btn v3-replay">${esc(t('replayEntry'))}</button>
        </div>
        <div class="v3-sec">
          <h3 class="v3-h">${esc(t('viewerDisplay'))}</h3>
          <div class="v3-toggles">
          ${[['outlines', true], ['shadows', true], ['grid', false], ['autoRotate', false]].map(([k, on]) =>
            `<label class="v3-toggle"><span>${esc(t(k))}</span><input type="checkbox" data-opt="${k}"${on ? ' checked' : ''}></label>`).join('')}
          </div>
        </div>
        <div class="v3-sec">
          <h3 class="v3-h">${esc(t('background'))}</h3>
          <div class="v3-swatches">${BGS.map((b, i) => `<button type="button" class="v3-swatch${b.color ? '' : ' is-canvas'}" data-bg="${b.id}" title="${esc(b.id === 'canvas' ? t('bgCanvas') : b.name)}" aria-label="${esc(b.id === 'canvas' ? t('bgCanvas') : b.name)}" aria-pressed="${i === 0}"${b.color ? ` style="background:${b.color}"` : ''}></button>`).join('')}</div>
        </div>
        <div class="v3-sec">
          <h3 class="v3-h">${esc(t('light'))}</h3>
          <label class="v3-range"><span>${esc(t('lightAngle'))}</span><input type="range" min="-180" max="180" step="1" value="${LIGHT_AZ}" data-light="az"><output>${LIGHT_AZ}°</output></label>
          <label class="v3-range"><span>${esc(t('lightHeight'))}</span><input type="range" min="25" max="85" step="1" value="${LIGHT_EL}" data-light="el"><output>${LIGHT_EL}°</output></label>
        </div>
        <div class="v3-sec v3-export">
          <h3 class="v3-h">${esc(tx('exportTitle', 'Export'))}</h3>
          <label class="v3-field"><span>${esc(tx('exportObject', 'Object'))}</span><select data-ex="object"></select></label>
          <label class="v3-field"><span>${esc(tx('exportSize', 'Size (pt)'))}</span><select data-ex="size">${[64, 88, 120, 160].map(s => `<option${s === 120 ? ' selected' : ''}>${s}</option>`).join('')}</select></label>
          <label class="v3-field"><span>${esc(tx('exportScale', 'Scale'))}</span><select data-ex="scale">${[1, 2, 3].map(s => `<option value="${s}"${s === 3 ? ' selected' : ''}>@${s}x</option>`).join('')}</select></label>
          <label class="v3-field"><span>${esc(tx('exportGround', 'Ground'))}</span><input type="text" data-ex="ground" value="${EXPORT_DEFAULTS.ground}" spellcheck="false" maxlength="7"></label>
          <label class="v3-field"><span>${esc(tx('exportClip', 'Clip'))}</span><select data-ex="clip">${['entry', 'idle', 'still'].map(c => `<option>${c}</option>`).join('')}</select></label>
          <label class="v3-field"><span>${esc(tx('exportFps', 'Frames/s'))}</span><select data-ex="fps">${[12, 24, 30].map(f => `<option${f === 24 ? ' selected' : ''}>${f}</option>`).join('')}</select></label>
          <button type="button" class="v3-btn" data-ex-go>${esc(tx('exportGo', 'Export PNG frames (.zip)'))}</button>
          <p class="v3-ex-status" aria-live="polite"></p>
        </div>
      </section>
      <aside class="cv-drawer is-about" aria-label="${esc(t('viewerAbout'))}" hidden>
        <div class="cv-drawer-head"><p class="cv-drawer-title">${esc(t('viewerAbout'))}</p><button type="button" class="cv-close" aria-label="${esc(t('close'))}">${icon('x', '×')}</button></div>
        <div class="cv-drawer-body"></div>
      </aside>`;
    const $ = s => root.querySelector(s);
    const vp = $('.v3-viewport'), canvas = $('.v3-canvas'), drawer = $('.cv-drawer'), status = $('.v3-status');
    const fpsEl = $('.v3-fps'), msEl = $('.v3-ms'), pctEl = $('.cv-pct'), gallery = $('.v3-gallery');
    const left = $('.v3-left'), right = $('.v3-right'), title = page?.querySelector('.cv-title');
    drawer.querySelector('.cv-close').addEventListener('click', () => { drawer.hidden = true; });

    let alive = true, raf = 0;
    const offs = [];
    const on = (el, ev, fn, o) => { el.addEventListener(ev, fn, o); offs.push(() => el.removeEventListener(ev, fn, o)); };

    // Panels: docked on wide screens; on narrow ones they fold into two buttons and open as sheets.
    const openPanel = which => {
      [left, right].forEach(p => p.classList.toggle('is-open', p.dataset.panel === which));
      root.querySelectorAll('[data-open]').forEach(b => b.setAttribute('aria-expanded', String(b.dataset.open === which)));
    };
    root.querySelectorAll('[data-open]').forEach(b => on(b, 'click', () => openPanel(b.getAttribute('aria-expanded') === 'true' ? null : b.dataset.open)));
    // Wide screens: each docked panel collapses (button in its header, [ and ] keys) and the choice is remembered.
    // With the objects panel hidden, the page title floats over the viewport and carries the button that brings it back.
    const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
    const collapsed = { left: store.get('hs-v3-left') === 'hidden', right: store.get('hs-v3-right') === 'hidden' };
    let revealL = null;
    if (title) {
      revealL = document.createElement('button');
      Object.assign(revealL, { type: 'button', className: 'v3-reveal v3-reveal-l', title: `${t('showObjects')} ([)`, innerHTML: IC.panelL });
      revealL.dataset.reveal = 'left';
      revealL.setAttribute('aria-label', t('showObjects')); revealL.setAttribute('aria-controls', 'v3-left'); revealL.setAttribute('aria-keyshortcuts', '[');
      title.prepend(revealL);
    }
    const applyCollapse = (focusSide) => {
      root.classList.toggle('is-left-hidden', collapsed.left);
      root.classList.toggle('is-right-hidden', collapsed.right);
      page?.classList.toggle('is-v3-left-hidden', collapsed.left);
      root.querySelectorAll('[data-hide]').forEach(b => b.setAttribute('aria-expanded', String(!collapsed[b.dataset.hide])));
      [revealL, root.querySelector('[data-reveal="right"]')].forEach(b => b && b.setAttribute('aria-expanded', String(!collapsed[b.dataset.reveal])));
      placeTitle();
      if (focusSide) (collapsed[focusSide] ? (focusSide === 'left' ? revealL : root.querySelector('[data-reveal="right"]')) : root.querySelector(`[data-hide="${focusSide}"]`))?.focus();
    };
    const toggleSide = (side, focus) => { collapsed[side] = !collapsed[side]; store.set(`hs-v3-${side}`, collapsed[side] ? 'hidden' : 'shown'); applyCollapse(focus ? side : null); };
    root.querySelectorAll('[data-hide]').forEach(b => on(b, 'click', () => toggleSide(b.dataset.hide, true)));
    on(root.querySelector('[data-reveal="right"]'), 'click', () => toggleSide('right', true));
    if (revealL) on(revealL, 'click', () => toggleSide('left', true));
    // The page title sits at the top of the objects panel on wide screens.
    const placeTitle = () => { left.style.paddingTop = !narrowMQ.matches && title && !collapsed.left ? `${title.offsetHeight + 4}px` : ''; };
    const titleRO = new ResizeObserver(placeTitle);
    if (title) titleRO.observe(title);
    on(narrowMQ, 'change', () => { openPanel(null); placeTitle(); });
    applyCollapse();

    let teardown = () => {};
    const dbg = {};
    const api = {
      // For tests: the model on show (its parts carry the entry state) and one frame at a given time.
      debug: () => ({ current: dbg.current, frame: now => dbg.frame?.(now), resume: () => dbg.resume?.() }),
      showAbout() { drawer.querySelector('.cv-drawer-body').innerHTML = opts.about || ''; drawer.hidden = false; },
      destroy() {
        if (!alive) return;
        alive = false;
        cancelAnimationFrame(raf);
        offs.forEach(f => f());
        titleRO.disconnect();
        teardown();
        revealL?.remove();
        page?.classList.remove('is-v3', 'is-v3-left-hidden');
        root.classList.remove('v3-root');
        if (root.__viewer === api) root.__viewer = null;
      },
    };
    root.__viewer = api;
    const fail = e => { status.hidden = false; status.textContent = `${t('viewerFail')} ${e && e.message ? e.message : ''}`; console.error(e); };

    const modelsUrl = new URL(opts.modelsUrl || 'site/illustrations/index.js', document.baseURI).href;
    const extrasUrl = new URL('export.js', modelsUrl).href;
    Promise.all([loadLib(), import(modelsUrl), import(extrasUrl).catch(() => ({}))])
      .then(([lib, mod, extras]) => { if (alive) start(lib, mod.default || [], extras); })
      .catch(fail);

    function start(lib, defs, extras = {}) {
      const { THREE, OrbitControls, EffectComposer, RenderPass, ShaderPass, FXAAShader } = lib;
      let renderer;
      try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true }); }
      catch (e) { fail(e); return; }
      const DPR = () => Math.min(window.devicePixelRatio || 1, 2);
      renderer.setClearColor(0x000000, 0);

      // --- Render pipeline: id/normal/depth pass, then colour (MSAA) → outlines → FXAA ------------
      const idRT = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter });
      idRT.depthTexture = new THREE.DepthTexture(1, 1);
      const colorRT = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4, stencilBuffer: true });
      const composer = new EffectComposer(renderer, colorRT);
      const renderPass = new RenderPass(new THREE.Scene(), new THREE.Camera());
      const outlinePass = new ShaderPass(OUTLINE);
      const OU = outlinePass.uniforms;
      OU.tNormal.value = idRT.texture; OU.tDepth.value = idRT.depthTexture;
      OU.uTexel.value = new THREE.Vector2(1, 1);
      OU.uInk.value = new THREE.Vector3(...[1, 3, 5].map(i => parseInt(INK.slice(i, i + 2), 16) / 255)); // sRGB, used as is
      const fxaaPass = new ShaderPass(FXAAShader);
      composer.addPass(renderPass); composer.addPass(outlinePass); composer.addPass(fxaaPass);
      let pxW = 1, pxH = 1;
      function setPipelineSize(w, h, dpr) {
        renderer.setPixelRatio(dpr); renderer.setSize(w, h, false);
        composer.setPixelRatio(dpr); composer.setSize(w, h);
        pxW = Math.floor(w * dpr); pxH = Math.floor(h * dpr);
        idRT.setSize(pxW, pxH);
        OU.uTexel.value.set(1 / pxW, 1 / pxH);
        fxaaPass.uniforms.resolution.value.set(1 / pxW, 1 / pxH);
        OU.uR.value = Math.max(1, Math.round(dpr * LINE_CSS / 2));
      }

      // Shared uniforms for every surface: light direction and the background-derived shade.
      const SU = {
        uL: { value: new THREE.Vector3() }, uAmb: { value: new THREE.Color(1, 1, 1) }, uDark: { value: new THREE.Color() },
        uShade: { value: SHADE }, uK: { value: K },
      };
      const toonMat = (color, side) => new THREE.ShaderMaterial({
        uniforms: { ...SU, uBase: { value: color.clone() } }, vertexShader: TOON_VS, fragmentShader: TOON_FS, side,
      });
      const idMat = (id, side) => new THREE.ShaderMaterial({ uniforms: { uId: { value: id } }, vertexShader: ID_VS, fragmentShader: ID_FS, side });
      // Cast shadows: opaque in the derived tone on the background, or multiplied onto a model's own ground.
      const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, depthWrite: false });
      const shadowMul = new THREE.MeshBasicMaterial({
        color: 0x808080, depthWrite: false, transparent: true, blending: THREE.MultiplyBlending, premultipliedAlpha: true,
        stencilWrite: true, stencilRef: 1, stencilFunc: THREE.NotEqualStencilFunc, stencilZPass: THREE.ReplaceStencilOp,
      });
      const shadowM = new THREE.Matrix4();
      const light = { az: LIGHT_AZ, el: LIGHT_EL }, L = SU.uL.value;
      function applyLight() {
        const a = THREE.MathUtils.degToRad(light.az), e = THREE.MathUtils.degToRad(light.el);
        L.set(Math.sin(a) * Math.cos(e), Math.sin(e), Math.cos(a) * Math.cos(e));
        // Project along the light onto the plane y = 0 (lifted per model by its ground height).
        shadowM.set(1, -L.x / L.y, 0, 0, 0, 0, 0, 0, 0, -L.z / L.y, 1, 0, 0, 0, 0, 1);
      }
      applyLight();

      // --- Models -----------------------------------------------------------------------
      let recolorMap = null; // { '#RRGGBB': '#RRGGBB' } while an export with `recolor` renders
      function buildModel(def) {
        const built = def.build(THREE, PALETTE);
        const { group, parts } = built;
        const groundY = built.ground || 0;
        const pivot = new THREE.Group();
        pivot.add(group);
        pivot.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(group);
        const sphere = box.getBoundingSphere(new THREE.Sphere());
        // Half extents of the box as seen by the isometric camera, for a tight fit.
        const eye = new THREE.Object3D(), c = box.getCenter(new THREE.Vector3()), q = new THREE.Vector3();
        eye.position.copy(c).add(ISO); eye.lookAt(c); eye.updateMatrixWorld(true);
        const inv = eye.matrixWorld.clone().invert(), half = { x: 0, y: 0 };
        for (let i = 0; i < 8; i++) {
          q.set(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z).applyMatrix4(inv);
          half.x = Math.max(half.x, Math.abs(q.x)); half.y = Math.max(half.y, Math.abs(q.y));
        }
        const wp = new THREE.Vector3();
        // Each part squashes about the centre of its own base. A part that rests on an earlier part (its base lies
        // within that part's height and their footprints overlap) is carried by it: it takes the same squash, so a
        // label never sinks into a box that bulges under it. Parts holding ground meshes drop but never squash.
        const P = parts.map((p, i) => {
          const o = p.object, b = new THREE.Box3().setFromObject(o);
          o.getWorldPosition(wp);
          let rigid = false;
          o.traverse(x => { if (x.isMesh && x.userData.ground) rigid = true; });
          return { o, i, delay: p.delay || 0, pos: o.position.clone(), scale: o.scale.clone(), box: b, rigid,
            bottom: b.min.y - wp.y, cx: (b.min.x + b.max.x) / 2 - wp.x, cz: (b.min.z + b.max.z) / 2 - wp.z, y: 0, v: 0, done: true,
            a: new THREE.Vector3(1, 1, 1), t: new THREE.Vector3(), support: null };
        });
        const E = 0.02, vol = b => (b.max.x - b.min.x) * (b.max.y - b.min.y) * (b.max.z - b.min.z);
        P.forEach(q => {
          let best = null;
          P.forEach(s => {
            if (s === q || s.rigid || s.delay > q.delay || (s.delay === q.delay && s.i > q.i)) return;
            const A = s.box, B = q.box;
            if (B.min.y < A.min.y + E || B.min.y > A.max.y + E) return;
            if (B.min.x > A.max.x + E || B.max.x < A.min.x - E || B.min.z > A.max.z + E || B.max.z < A.min.z - E) return;
            if (!best || vol(A) > vol(best.box)) best = s;
          });
          q.support = best;
        });
        P.sort((x, y) => x.delay - y.delay || x.i - y.i); // supports come first
        const meshes = [], shadows = [], geos = new Set(), mats = [];
        const ids = new Map();
        // Animated parts move and scale every frame; skip frustum culling so no mesh can drop out for a frame.
        group.traverse(o => { if (o.isMesh) { meshes.push(o); o.frustumCulled = false; } });
        meshes.forEach((m, i) => {
          geos.add(m.geometry);
          const src = m.material, side = src.side;
          // Export option recolor: palette swaps for one render (e.g. lighter iron on a dark ground).
          const swap = recolorMap && recolorMap[`#${src.color.getHexString()}`.toUpperCase()];
          const toon = toonMat(swap ? new THREE.Color(swap) : src.color, side);
          src.dispose();
          // Meshes that share a part name share an id, so no line is drawn where they meet.
          const key = m.userData.part || `#${i}`;
          if (!ids.has(key)) ids.set(key, ids.size + 1);
          const idm = idMat(ids.get(key), side);
          m.material = toon; m.userData.toon = toon; m.userData.idm = idm;
          mats.push(toon, idm);
          if (m.userData.ground) m.renderOrder = -3;
          if (!m.userData.noShadow) {
            const s = new THREE.Mesh(m.geometry, groundY ? shadowMul : shadowMat);
            s.matrixAutoUpdate = false; s.frustumCulled = false; s.renderOrder = -1; s.userData.src = m;
            s.raycast = () => {};
            shadows.push(s);
          }
        });
        const shadowGroup = new THREE.Group();
        shadowGroup.position.y = groundY + 0.004;
        shadows.forEach(s => shadowGroup.add(s));
        return {
          def, pivot, group, parts: P, meshes, shadows, shadowGroup, groundY, center: c, radius: sphere.radius, half,
          dispose() { geos.forEach(g => g.dispose()); mats.forEach(m => m.dispose()); },
        };
      }
      const shown = o => { for (; o; o = o.parent) if (!o.visible) return false; return true; };
      function updateShadows(m) {
        const ox = m.groundY * L.x / L.y, oz = m.groundY * L.z / L.y;
        for (let i = 0; i < m.shadows.length; i++) {
          const s = m.shadows[i];
          s.visible = shown(s.userData.src);
          if (!s.visible) continue;
          // Project onto the plane y = ground; the shadow group lifts the result to that height.
          // A mesh may carry its own ground height (shadowRef.y, e.g. a walker stepping off the kerb onto the road).
          const src = s.userData.src, r = src.userData.shadowRef;
          s.matrix.multiplyMatrices(shadowM, src.matrixWorld);
          if (r) {
            s.matrix.elements[12] += r.y * L.x / L.y;
            s.matrix.elements[13] += r.y - m.groundY;
            s.matrix.elements[14] += r.y * L.z / L.y;
          } else {
            s.matrix.elements[12] += ox;
            s.matrix.elements[14] += oz;
          }
        }
      }

      // --- Scene, cameras, controls ----------------------------------------------------
      const scene = new THREE.Scene();
      const grid = new THREE.GridHelper(10, 20, 0x888888, 0x888888);
      Object.assign(grid.material, { transparent: true, opacity: 0.35, depthWrite: false });
      grid.renderOrder = -4; grid.visible = false;
      scene.add(grid);
      const ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 120);
      const persp = new THREE.PerspectiveCamera(30, 1, 0.1, 120);
      const ISO = new THREE.Vector3(Math.cos(ISO_EL) * Math.sin(Math.PI / 4), Math.sin(ISO_EL), Math.cos(ISO_EL) * Math.cos(Math.PI / 4));
      let mode = 'iso', camera = ortho, controls = null, current = null, W = 1, H = 1;
      let tool = 'orbit', spaceDown = false;
      const state = { outlines: true, shadows: true, grid: false, autoRotate: false, bg: 'canvas' };
      // Fit: the projected half height, or half width over the aspect, plus a 12% margin.
      const fitHalf = (m, a) => (m ? Math.max(m.half.y, m.half.x / a) : 1.5) * 1.12;
      const fitDist = () => {
        const v = THREE.MathUtils.degToRad(persp.fov) / 2;
        return fitHalf(current, persp.aspect) / Math.tan(v) + (current ? current.radius * 0.5 : 0);
      };
      function frustum() {
        const a = W / H, half = fitHalf(current, a);
        Object.assign(ortho, { left: -half * a, right: half * a, top: half, bottom: -half });
        persp.aspect = a;
        ortho.updateProjectionMatrix(); persp.updateProjectionMatrix();
      }
      function applyTool() {
        const eff = spaceDown ? 'pan' : tool;
        const M = THREE.MOUSE, T = THREE.TOUCH;
        if (controls) {
          controls.mouseButtons = { LEFT: eff === 'pan' ? M.PAN : eff === 'zoom' ? M.DOLLY : M.ROTATE, MIDDLE: M.DOLLY, RIGHT: M.PAN };
          controls.touches = { ONE: eff === 'pan' ? T.PAN : T.ROTATE, TWO: T.DOLLY_PAN };
          controls.enableRotate = mode !== 'iso';
        }
        vp.dataset.tool = eff;
        root.querySelectorAll('[data-tool]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tool === tool)));
      }
      function makeControls() {
        const target = controls ? controls.target.clone() : (current ? current.center.clone() : new THREE.Vector3());
        controls?.dispose();
        controls = new OrbitControls(camera, canvas);
        Object.assign(controls, { enableDamping: !reduce, dampingFactor: 0.14, minZoom: 0.25, maxZoom: 10,
          maxPolarAngle: Math.PI / 2 - 0.02, zoomToCursor: false, screenSpacePanning: true, zoomSpeed: 1.6 });
        controls.minDistance = 0.5; controls.maxDistance = 80;
        controls.target.copy(target);
        controls.addEventListener('change', updatePct);
        applyTool();
      }
      const zoomNow = () => (camera.isOrthographicCamera ? camera.zoom : fitDist() / camera.position.distanceTo(controls.target));
      function place(cam, target, dir, zoom) {
        if (cam.isOrthographicCamera) { cam.zoom = zoom; cam.position.copy(target).addScaledVector(dir, 40); cam.updateProjectionMatrix(); }
        else cam.position.copy(target).addScaledVector(dir, fitDist() / zoom);
        cam.lookAt(target);
      }
      function setCamera(next) {
        const target = controls.target.clone(), z = zoomNow();
        const dir = camera.position.clone().sub(target).normalize();
        mode = next;
        camera = next === 'persp' ? persp : ortho;
        place(camera, target, next === 'iso' ? ISO : dir, z);
        makeControls();
        root.querySelectorAll('[data-cam]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cam === next)));
        updatePct();
      }
      function fit() {
        const dir = mode === 'iso' ? ISO.clone() : camera.position.clone().sub(controls.target).normalize();
        controls.target.copy(current.center);
        place(camera, current.center, dir, 1);
        controls.update(); updatePct();
      }
      function resetView() {
        if (!state.autoRotate) current.pivot.rotation.y = 0;
        controls.target.copy(current.center);
        place(camera, current.center, ISO, 1);
        controls.update(); updatePct();
      }
      function zoomBy(f) {
        if (camera.isOrthographicCamera) { camera.zoom = THREE.MathUtils.clamp(camera.zoom * f, 0.25, 10); camera.updateProjectionMatrix(); }
        else { const off = camera.position.clone().sub(controls.target); camera.position.copy(controls.target).addScaledVector(off, 1 / f); }
        controls.update(); updatePct();
      }
      function updatePct() { pctEl.textContent = `${Math.round(zoomNow() * 100)}%`; }

      // In the isometric view the camera keeps its true angle, so the orbit tool turns the object instead.
      const pointers = new Set();
      let turning = null;
      on(canvas, 'pointerdown', e => {
        pointers.add(e.pointerId);
        canvas.focus({ preventScroll: true });
        const eff = spaceDown ? 'pan' : tool;
        turning = pointers.size === 1 && mode === 'iso' && eff === 'orbit' && e.button === 0 ? { id: e.pointerId, x: e.clientX } : null;
        vp.classList.add('is-dragging');
      });
      on(window, 'pointermove', e => {
        if (!turning || e.pointerId !== turning.id || !current) return;
        current.pivot.rotation.y += (e.clientX - turning.x) * 0.008;
        turning.x = e.clientX;
      });
      const up = e => { pointers.delete(e.pointerId); if (turning && turning.id === e.pointerId) turning = null; if (!pointers.size) vp.classList.remove('is-dragging'); };
      on(window, 'pointerup', up); on(window, 'pointercancel', up);
      on(canvas, 'contextmenu', e => e.preventDefault());

      // --- Background and environment-tinted shading -------------------------------------------
      const cssColor = () => {
        const v = getComputedStyle(root).getPropertyValue('--canvas-bg').trim();
        return /^#[0-9a-f]{6}$/i.test(v) ? v : (matchMedia('(prefers-color-scheme: dark)').matches ? '#0d0d10' : '#f7f7f8');
      };
      const lum = hex => { const c = new THREE.Color(hex); return 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b; };
      const bgC = new THREE.Color(), tint = new THREE.Color(), white = new THREE.Color(1, 1, 1), tmpC = new THREE.Color();
      const darkFor = color => (lum(color) < 0.1 ? PALETTE.indigo[900] : INK);
      function applyBg() {
        const b = BGS.find(x => x.id === state.bg) || BGS[0];
        const color = b.color || cssColor();
        setGround(color, b.dark || darkFor(color));
      }
      // Shading and shadow tones for a ground colour and its dark tone (also used by the export).
      function setGround(color, dark) {
        bgC.set(color);
        SU.uDark.value.set(dark);
        // Ambient tint: the background's hue at full brightness, half strength.
        const mx = Math.max(bgC.r, bgC.g, bgC.b, 1e-4);
        tint.setRGB(bgC.r / mx, bgC.g / mx, bgC.b / mx);
        SU.uAmb.value.copy(white).lerp(tint, TINT);
        // Cast shadow on the background: the background's own shade tone, pulled harder toward the dark.
        shadowMat.color.copy(bgC).multiplyScalar(SHADE).multiply(SU.uAmb.value).lerp(SU.uDark.value, KS);
        // On a model's own ground the shadow multiplies what is there by the shade ratio of a white surface.
        shadowMul.color.copy(SU.uAmb.value).multiplyScalar(SHADE).lerp(SU.uDark.value, K);
        tmpC.copy(SU.uDark.value).lerp(bgC, 0.55);
        grid.material.color.copy(tmpC);
        vp.style.setProperty('--v3-bg', color);
        vp.style.setProperty('--v3-dot', `color-mix(in srgb, ${dark} 18%, ${color})`);
        root.querySelectorAll('[data-bg]').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.bg === state.bg)));
      }
      const themeObs = new MutationObserver(applyBg);
      themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
      on(matchMedia('(prefers-color-scheme: dark)'), 'change', applyBg);
      applyBg();

      // --- Drawing --------------------------------------------------------------------------
      const hidden = [];
      function draw(sc, cam, m) {
        const isO = cam.isOrthographicCamera;
        OU.uOrtho.value = isO ? 1 : 0; OU.uNear.value = cam.near; OU.uFar.value = cam.far;
        if (isO) OU.uPx0.value = (cam.top - cam.bottom) / cam.zoom / pxH;
        else OU.uPxK.value = 2 * Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2) / pxH;
        OU.uOn.value = state.outlines ? 1 : 0;
        if (state.outlines) {
          const meshes = m.meshes;
          for (let i = 0; i < meshes.length; i++) meshes[i].material = meshes[i].userData.idm;
          const sv = m.shadowGroup.visible, gv = grid.visible;
          m.shadowGroup.visible = false; grid.visible = false;
          renderer.setRenderTarget(idRT);
          renderer.render(sc, cam);
          renderer.setRenderTarget(null);
          m.shadowGroup.visible = sv; grid.visible = gv;
          for (let i = 0; i < meshes.length; i++) meshes[i].material = meshes[i].userData.toon;
        }
        renderPass.scene = sc; renderPass.camera = cam;
        composer.render();
      }

      // --- Thumbnails (rendered once each) -------------------------------------------------
      function thumbnail(def, S) {
        const m = buildModel(def), sc = new THREE.Scene(), cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 120);
        sc.add(m.pivot, m.shadowGroup);
        const r = fitHalf(m, 1) * 0.94;
        Object.assign(cam, { left: -r, right: r, top: r, bottom: -r });
        cam.position.copy(m.center).addScaledVector(ISO, 40); cam.lookAt(m.center); cam.updateProjectionMatrix();
        sc.updateMatrixWorld(true); updateShadows(m);
        setPipelineSize(S, S, 1);
        draw(sc, cam, m);
        const url = canvas.toDataURL('image/png');
        m.dispose();
        return url;
      }
      const TS = Math.round(52 * DPR());
      const thumbs = defs.map(d => { try { return thumbnail(d, TS); } catch (e) { console.error(e); return ''; } });
      gallery.innerHTML = defs.map((d, i) => `<button type="button" class="v3-item" role="listitem" data-i="${i}" aria-current="${i === 0}">
        <img src="${thumbs[i]}" alt="" width="52" height="52"><span>${esc(d.name[lang] || d.name.en)}</span></button>`).join('');

      // --- Model switching and entry ------------------------------------------------------
      let entryT = 0, entering = false, idleT = -1;
      function show(i) {
        if (current) { scene.remove(current.pivot, current.shadowGroup); current.dispose(); }
        current = buildModel(defs[i]);
        scene.add(current.pivot, current.shadowGroup);
        current.shadowGroup.visible = state.shadows;
        gallery.querySelectorAll('.v3-item').forEach(b => b.setAttribute('aria-current', String(+b.dataset.i === i)));
        $('.v3-objname').textContent = defs[i].name[lang] || defs[i].name.en;
        frustum(); resetView(); replay();
      }
      // A part's own motion is x -> a*x + t (a diagonal): squash about its base centre plus the lift.
      // Squash below the ground line; a stretch while falling that fades out over the last 15 cm,
      // so the scale is continuous through the contact (no one-frame jump from stretch to squash).
      function placePart(p) {
        let sy = 1;
        if (!p.rigid) {
          if (p.y < 0) sy = 1 + Math.max(-0.2, p.y * 2.4);
          else if (p.v < 0) sy = 1 + Math.min(0.1, -p.v * 0.01) * Math.min(1, p.y / 0.15);
        }
        if (!(sy > 0.5 && sy < 1.5)) sy = 1; // guards against NaN or a runaway spring
        const sxz = 1 / Math.sqrt(sy);
        const px = p.pos.x + p.cx, py = p.pos.y + p.bottom, pz = p.pos.z + p.cz;
        p.a.set(sxz, sy, sxz);
        p.t.set(px * (1 - sxz), py * (1 - sy) + Math.max(p.y, 0), pz * (1 - sxz));
        // Carried by its support: compose the support's motion after its own.
        const s = p.support;
        if (s) { p.t.multiply(s.a).add(s.t); p.a.multiply(s.a); }
        p.o.scale.set(p.scale.x * p.a.x, p.scale.y * p.a.y, p.scale.z * p.a.z);
        p.o.position.set(p.pos.x * p.a.x + p.t.x, p.pos.y * p.a.y + p.t.y, p.pos.z * p.a.z + p.t.z);
      }
      function replay() {
        if (!current) return;
        idleT = -1; entryT = 0;
        current.def.reset?.(current.group); // back to the pose the parts were measured in (e.g. walkers to their start)
        if (reduce) {
          current.parts.forEach(p => { p.y = 0; p.v = 0; p.done = true; p.o.visible = true; placePart(p); });
          entering = false; return;
        }
        current.parts.forEach(p => { p.y = DROP; p.v = 0; p.done = false; p.o.visible = false; placePart(p); });
        entering = true;
      }
      function stepEntry(dt) {
        entryT += dt;
        if (stepParts(current.parts, entryT, dt)) { entering = false; idleT = 0; }
      }
      // Advances the entry spring of every part to time `at` by `dt`; true once every part has landed.
      function stepParts(parts, at, dt) {
        let all = true;
        const n = 4, h = dt / n;
        // Parts are in support order, so a carried part is placed after the part it rests on, every frame.
        parts.forEach(p => {
          if (at >= p.delay) {
            p.o.visible = true;
            if (!p.done) {
              for (let i = 0; i < n; i++) { p.v += (-SPRING * p.y - DAMP * p.v) * h; p.y += p.v * h; }
              if (!Number.isFinite(p.y) || !Number.isFinite(p.v) || (Math.abs(p.y) < 0.0008 && Math.abs(p.v) < 0.02)) { p.y = 0; p.v = 0; p.done = true; }
              else all = false;
            }
          } else all = false;
          placePart(p);
        });
        return all;
      }

      // --- Export: frames for the app at an exact pixel size --------------------------------------
      // True isometric camera, a fixed-step clock, size × scale pixels (the outline radius follows the scale,
      // as it follows the screen's density in the viewer), a transparent background, and shading and shadow
      // computed for the ground the image will sit on. The shadow is a translucent shape that composites
      // over that ground (in sRGB, as images are composited) to the tone the viewer draws there.
      const allDefs = [...defs, ...(extras.defs || [])];
      const LOOPS = extras.loops || {};
      const expShadow = new THREE.MeshBasicMaterial({
        color: 0x000000, transparent: true, depthWrite: false,
        stencilWrite: true, stencilRef: 1, stencilFunc: THREE.NotEqualStencilFunc, stencilZPass: THREE.ReplaceStencilOp,
      });
      function fitShadow(ground) {
        const g = new THREE.Color(ground).getRGB({}, THREE.SRGBColorSpace);
        const s = shadowMat.color.getRGB({}, THREE.SRGBColorSpace);
        let a = 0.35; // the lowest alpha that keeps the colour in range, at least this
        ['r', 'g', 'b'].forEach(k => {
          const d = s[k] - g[k];
          if (d < 0) a = Math.max(a, -d / Math.max(g[k], 1e-4));
          else if (d > 0) a = Math.max(a, d / Math.max(1 - g[k], 1e-4));
        });
        a = Math.min(1, a);
        const c = {};
        ['r', 'g', 'b'].forEach(k => { c[k] = THREE.MathUtils.clamp(g[k] + (s[k] - g[k]) / a, 0, 1); });
        expShadow.color.setRGB(c.r, c.g, c.b, THREE.SRGBColorSpace);
        expShadow.opacity = a;
        return { color: `#${expShadow.color.getHexString(THREE.SRGBColorSpace)}`, alpha: +a.toFixed(3), over: `#${shadowMat.color.getHexString(THREE.SRGBColorSpace)}` };
      }
      function exportFrames(input = {}) {
        const o = { ...EXPORT_DEFAULTS, ...(exportURL || {}), ...input };
        const def = allDefs.find(d => d.id === o.object);
        if (!def) throw new Error(`Unknown object "${o.object}". Known: ${allDefs.map(d => d.id).join(', ')}`);
        if (!/^#[0-9a-f]{6}$/i.test(o.ground)) throw new Error(`Ground must be #RRGGBB, got "${o.ground}"`);
        const loop = LOOPS[def.id] || {};
        const idle = loop.idle || def.idle;
        const fps = +o.fps, size = +o.size, scale = +o.scale, px = Math.round(size * scale);
        const seconds = Number.isFinite(o.seconds) && o.seconds > 0 ? +o.seconds : (o.clip === 'idle' ? loop.seconds || 2 : 5);
        const t0 = performance.now();
        cancelAnimationFrame(raf); raf = 0;
        let m = null;
        const saved = { ...light };
        try {
          if (Number.isFinite(+o.az) && o.az !== null) light.az = +o.az;
          if (Number.isFinite(+o.el) && o.el !== null) light.el = +o.el;
          applyLight();
          // The dark tone shade and shadow mix toward: given (a palette ramp's 800 or 900 step), or the viewer's rule.
          if (o.dark && !/^#[0-9a-f]{6}$/i.test(o.dark)) throw new Error(`Dark tone must be #RRGGBB, got "${o.dark}"`);
          // Optional tone overrides for one render (e.g. lighter shade on a dark ground so the object stays legible).
          if (Number.isFinite(o.shade) && o.shade > 0) SU.uShade.value = +o.shade;
          if (Number.isFinite(o.k) && o.k >= 0) SU.uK.value = +o.k;
          setGround(o.ground, o.dark || darkFor(o.ground));
          recolorMap = o.recolor && typeof o.recolor === 'object' ? Object.fromEntries(Object.entries(o.recolor).map(([a, b]) => [a.toUpperCase(), b])) : null;
          if (o.ink && /^#[0-9a-f]{6}$/i.test(o.ink)) OU.uInk.value.set(...[1, 3, 5].map(i => parseInt(o.ink.slice(i, i + 2), 16) / 255));
          const shadow = fitShadow(o.ground);
          m = buildModel(def);
          m.shadows.forEach(s => { if (s.material === shadowMat) s.material = expShadow; });
          m.shadowGroup.visible = o.shadows !== false;
          const sc = new THREE.Scene();
          sc.add(m.pivot, m.shadowGroup);
          const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 120);
          cam.position.copy(m.center).addScaledVector(ISO, 40); cam.lookAt(m.center); cam.updateMatrixWorld(true);
          // Frame the rest pose: every vertex and its shadow on the ground, then a margin for the squash and idle.
          m.parts.forEach(p => { p.y = 0; p.v = 0; p.done = true; p.o.visible = true; placePart(p); });
          def.reset?.(m.group);
          sc.updateMatrixWorld(true);
          const inv = cam.matrixWorldInverse, v = new THREE.Vector3();
          let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
          const add = () => { v.applyMatrix4(inv); x0 = Math.min(x0, v.x); x1 = Math.max(x1, v.x); y0 = Math.min(y0, v.y); y1 = Math.max(y1, v.y); };
          const kx = L.x / L.y, kz = L.z / L.y, gy = m.groundY;
          m.meshes.forEach(mesh => {
            if (!shown(mesh)) return;
            const pos = mesh.geometry.attributes.position, casts = o.shadows !== false && !mesh.userData.noShadow;
            for (let i = 0; i < pos.count; i++) {
              v.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld);
              const wx = v.x, wy = v.y, wz = v.z;
              add();
              if (casts) { v.set(wx - kx * (wy - gy), gy, wz - kz * (wy - gy)); add(); }
            }
          });
          const side = Math.max(x1 - x0, y1 - y0) * (1 + 2 * o.margin), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
          // A taller frame (height > size, e.g. a category card) keeps the object in the top size × size square.
          const hPt = Number.isFinite(o.height) && o.height > 0 ? +o.height : size;
          Object.assign(cam, { left: cx - side / 2, right: cx + side / 2, top: cy + side / 2, bottom: cy + side / 2 - side * hPt / size });
          cam.updateProjectionMatrix();
          setPipelineSize(size, hPt, scale);
          const frames = [];
          // Opaque: the frame is laid on the ground colour (category cards), so the image needs no alpha.
          const flat = o.opaque ? Object.assign(document.createElement('canvas'), { width: pxW, height: pxH }) : null;
          const shot = () => {
            sc.updateMatrixWorld(); updateShadows(m); draw(sc, cam, m);
            if (!flat) { frames.push(canvas.toDataURL('image/png')); return; }
            const c2 = flat.getContext('2d');
            c2.fillStyle = o.ground; c2.fillRect(0, 0, pxW, pxH); c2.drawImage(canvas, 0, 0);
            frames.push(flat.toDataURL('image/png'));
          };
          const rest = () => m.parts.forEach(p => { p.y = 0; p.v = 0; p.done = true; p.o.visible = true; placePart(p); });
          const dt = 1 / fps;
          if (o.clip === 'idle') {
            const n = Math.max(1, Math.round(seconds * fps));
            for (let f = 0; f < n; f++) { idle?.(m.group, f * dt); shot(); }
          } else if (o.clip === 'entry') {
            // Ends once every part has started and nothing moves by more than a quarter pixel; the last frame
            // is the exact rest pose, so it matches the still.
            const still = 0.25 * side / px, last = Math.max(...m.parts.map(p => p.delay));
            m.parts.forEach(p => { p.y = DROP; p.v = 0; p.done = false; p.o.visible = false; placePart(p); });
            const max = Math.round(seconds * fps);
            let at = 0;
            for (let f = 0; f < max; f++) {
              at += dt;
              const done = stepParts(m.parts, at, dt);
              if (done || (at >= last && m.parts.every(p => Math.abs(p.y) < still))) { rest(); shot(); break; }
              shot();
            }
          } else shot();
          return {
            frames,
            meta: { object: def.id, clip: o.clip, size, height: hPt, scale, px, pxH: Math.round(hPt * scale), fps, frames: frames.length, durationMs: Math.round(frames.length * 1000 / fps),
              ground: o.ground.toUpperCase(), dark: (o.dark || darkFor(o.ground)).toUpperCase(), opaque: !!o.opaque, shadow, light: { az: light.az, el: light.el }, renderMs: Math.round(performance.now() - t0) },
          };
        } finally {
          m?.dispose();
          recolorMap = null;
          SU.uShade.value = SHADE; SU.uK.value = K;
          OU.uInk.value.set(...[1, 3, 5].map(i => parseInt(INK.slice(i, i + 2), 16) / 255));
          Object.assign(light, saved);
          applyLight();
          applyBg();
          resize();
          wake();
        }
      }
      api.exportFrames = exportFrames;
      api.exportObjects = () => allDefs.map(d => ({ id: d.id, name: d.name.en, idleSeconds: LOOPS[d.id]?.seconds ?? null }));

      // Export panel: renders the chosen clip and downloads the frames as a zip.
      const exSel = root.querySelector('[data-ex="object"]'), exStatus = root.querySelector('.v3-ex-status');
      exSel.innerHTML = allDefs.map(d => `<option value="${esc(d.id)}">${esc(d.name[lang] || d.name.en)}</option>`).join('');
      on(root.querySelector('[data-ex-go]'), 'click', () => {
        const val = k => root.querySelector(`[data-ex="${k}"]`).value.trim();
        exStatus.textContent = tx('exportBusy', 'Rendering…');
        setTimeout(() => {
          try {
            const r = exportFrames({ object: val('object'), size: +val('size'), scale: +val('scale'), ground: val('ground'), clip: val('clip'), fps: +val('fps'), seconds: null });
            const base = `${r.meta.object}-${r.meta.clip}.${r.meta.ground.slice(1).toLowerCase()}.${r.meta.size}@${r.meta.scale}x`;
            const files = r.frames.map((u, i) => ({ name: `${base}/frame-${String(i + 1).padStart(4, '0')}.png`, data: dataUrlBytes(u) }));
            files.push({ name: `${base}/meta.json`, data: new TextEncoder().encode(JSON.stringify(r.meta, null, 2)) });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(zipStore(files));
            a.download = `${base}.zip`;
            a.click();
            setTimeout(() => URL.revokeObjectURL(a.href), 4000);
            exStatus.textContent = `${r.frames.length} ${tx('exportFramesDone', 'frames')} · ${r.meta.px}×${r.meta.px} px`;
          } catch (e) { exStatus.textContent = e.message; console.error(e); }
        }, 30);
      });

      // --- Controls wiring ----------------------------------------------------------------
      root.querySelectorAll('[data-cam]').forEach(b => on(b, 'click', () => b.dataset.cam !== mode && setCamera(b.dataset.cam)));
      root.querySelectorAll('[data-opt]').forEach(inp => on(inp, 'change', () => {
        state[inp.dataset.opt] = inp.checked;
        if (!current) return;
        current.shadowGroup.visible = state.shadows;
        grid.visible = state.grid;
        grid.position.y = current.groundY;
        if (!state.autoRotate && mode !== 'iso') current.pivot.rotation.y = 0;
      }));
      root.querySelectorAll('[data-light]').forEach(inp => on(inp, 'input', () => {
        light[inp.dataset.light] = +inp.value;
        inp.nextElementSibling.textContent = `${inp.value}°`;
        applyLight();
      }));
      root.querySelectorAll('[data-bg]').forEach(b => on(b, 'click', () => { state.bg = b.dataset.bg; applyBg(); }));
      root.querySelectorAll('[data-tool]').forEach(b => on(b, 'click', () => { tool = b.dataset.tool; applyTool(); }));
      on($('[data-act="reset"]'), 'click', resetView);
      on($('.v3-replay'), 'click', replay);
      on(gallery, 'click', e => { const b = e.target.closest('.v3-item'); if (b) { show(+b.dataset.i); openPanel(null); } });
      const zoomTo100 = () => zoomBy(1 / zoomNow());
      root.querySelectorAll('[data-z]').forEach(b => on(b, 'click', () => {
        const z = b.dataset.z;
        if (z === 'in') zoomBy(1.25); else if (z === 'out') zoomBy(0.8); else if (z === 'fit') fit(); else zoomTo100();
      }));
      // Keyboard: O orbit, H pan (or hold Space), Z zoom, R reset view, + and − zoom, Shift+1 fit, Shift+0 100%.
      const typing = el => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
      on(document, 'keydown', e => {
        if (!current || e.metaKey || e.ctrlKey || e.altKey || typing(document.activeElement) || !root.isConnected) return;
        const k = e.code;
        if (k === 'Space') {
          if (document.activeElement && document.activeElement !== canvas && document.activeElement !== document.body) return;
          e.preventDefault(); if (!spaceDown) { spaceDown = true; applyTool(); } return;
        }
        if (e.shiftKey && k === 'Digit1') { fit(); e.preventDefault(); return; }
        if (e.shiftKey && k === 'Digit0') { zoomTo100(); e.preventDefault(); return; }
        if (e.shiftKey) return;
        const map = { KeyO: 'orbit', KeyH: 'pan', KeyZ: 'zoom' };
        if (map[k]) { tool = map[k]; applyTool(); }
        else if ((k === 'BracketLeft' || k === 'BracketRight') && !narrowMQ.matches) toggleSide(k === 'BracketLeft' ? 'left' : 'right', false);
        else if (k === 'KeyR') resetView();
        else if (k === 'Equal' || k === 'NumpadAdd') zoomBy(1.25);
        else if (k === 'Minus' || k === 'NumpadSubtract') zoomBy(0.8);
        else return;
        e.preventDefault();
      });
      on(document, 'keyup', e => { if (e.code === 'Space' && spaceDown) { spaceDown = false; applyTool(); } });
      on(window, 'blur', () => { if (spaceDown) { spaceDown = false; applyTool(); } });

      function resize() {
        W = Math.max(1, vp.clientWidth); H = Math.max(1, vp.clientHeight);
        setPipelineSize(W, H, DPR());
        frustum();
        // Resizing clears the canvas; draw again now so a panel toggle never shows an empty frame.
        if (current && controls) { scene.updateMatrixWorld(); updateShadows(current); draw(scene, camera, current); }
      }
      const ro = new ResizeObserver(resize);
      ro.observe(vp);

      // --- Loop -------------------------------------------------------------------------
      let last = performance.now(), frames = 0, statT = last;
      function frame(now) {
        raf = 0;
        if (!alive) return;
        if (!root.isConnected) { api.destroy(); return; }
        // Clamp the step: a long frame (tab in the background, a slow thumbnail) never kicks the spring.
        const raw = (now - last) / 1000;
        const dt = Number.isFinite(raw) ? Math.min(0.05, Math.max(0, raw)) : 0;
        last = now;
        if (entering) stepEntry(dt);
        else if (idleT >= 0 && !reduce) { idleT += dt; current.def.idle?.(current.group, idleT); }
        if (state.autoRotate && !reduce) current.pivot.rotation.y += dt * 0.5;
        controls.update();
        scene.updateMatrixWorld();
        updateShadows(current);
        draw(scene, camera, current);
        frames++;
        if (now - statT >= 500) {
          fpsEl.textContent = Math.round(frames * 1000 / (now - statT));
          msEl.textContent = ((now - statT) / frames).toFixed(1);
          frames = 0; statT = now;
        }
        if (!document.hidden) raf = requestAnimationFrame(frame);
      }
      const wake = () => {
        if (!alive || document.hidden || raf) return;
        last = statT = performance.now(); frames = 0;
        raf = requestAnimationFrame(frame);
      };
      on(document, 'visibilitychange', wake);
      Object.defineProperty(dbg, 'current', { get: () => current });
      dbg.frame = now => { cancelAnimationFrame(raf); raf = 0; frame(now); cancelAnimationFrame(raf); raf = 0; };
      dbg.resume = wake;

      teardown = () => {
        ro.disconnect(); themeObs.disconnect(); controls?.dispose();
        if (current) current.dispose();
        [shadowMat, shadowMul, expShadow, grid.geometry, grid.material, idRT, colorRT, outlinePass.material, fxaaPass.material].forEach(x => x.dispose());
        idRT.depthTexture.dispose();
        composer.dispose?.();
        renderer.dispose(); renderer.forceContextLoss();
      };

      placeTitle();
      resize();
      camera.position.copy(ISO).multiplyScalar(40);
      makeControls();
      show(0);
      wake();
      if (exportURL) {
        window.__exportFrames = opts => exportFrames(opts);
        window.__exportObjects = api.exportObjects;
        window.__exportReady = true;
      }
    }
    return api;
  }

  window.HSViewer3D = { mount };
})();
