// Canvas pages (decision 022): a FigJam-like board for wireframe flows and diagrams.
// HSCanvas.mount(el, html, opts) builds the board from a canvas HTML file:
//   <section class="frame" id data-x data-y data-title>  an iOS wireframe (status bar and home indicator are added)
//   <div class="state" id data-x data-y>                   a state node
//   <div class="note" data-x data-y data-for="id">         a sticky note, with <p lang="en"> and <p lang="pt">
//   <div class="area" data-x data-y data-w data-h data-title-en data-title-pt>  a section behind other items
//   <div class="block" id data-x data-y data-w data-title> any other item (palette, logo, image); styles live in the canvas file
//   <a class="link" data-from="id or selector" data-to="id" data-label-en data-label-pt>  an arrow
// Items can be selected, not moved. Pan: wheel, space/middle drag, H. Zoom: ctrl/cmd + wheel, pinch.
(() => {
  const MIN = 0.04, MAX = 4, PAD = 64;
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  function mount(root, html, opts) {
    const { lang = 'en', icon = () => '', t = k => k, about = '' } = opts || {};
    root.__canvas?.destroy?.();
    root.innerHTML = `
      <div class="cv-viewport" tabindex="0" aria-label="${t('canvasLabel')}">
        <div class="cv-world"><svg class="cv-links" aria-hidden="true"><defs>
          <marker id="cv-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M1 1 9 5 1 9" fill="none" stroke="context-stroke" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></marker>
        </defs></svg></div>
        <div class="cv-marquee" hidden></div>
      </div>
      <div class="cv-tools" role="toolbar" aria-label="${t('canvasTools')}">
        <button type="button" data-tool="select" aria-pressed="true" title="${t('toolSelect')} (V)">${icon('mouse-pointer-2')}</button>
        <button type="button" data-tool="hand" aria-pressed="false" title="${t('toolHand')} (H)">${icon('hand')}</button>
      </div>
      <div class="cv-zoom" role="group" aria-label="${t('zoom')}">
        <button type="button" data-z="out" title="${t('zoomOut')} (⌘−)">${icon('minus')}</button>
        <button type="button" data-z="reset" class="cv-pct" title="${t('zoom100')} (⇧0)">100%</button>
        <button type="button" data-z="in" title="${t('zoomIn')} (⌘=)">${icon('plus')}</button>
        <button type="button" data-z="fit" title="${t('zoomFit')} (⇧1)">${icon('maximize')}</button>
      </div>
      <aside class="cv-drawer" aria-label="${t('inspect')}" hidden>
        <div class="cv-drawer-head"><p class="cv-drawer-title"></p><button type="button" class="cv-close" aria-label="${t('close')}">${icon('x')}</button></div>
        <div class="cv-drawer-body"></div>
      </aside>`;
    const vp = root.querySelector('.cv-viewport'), world = root.querySelector('.cv-world'), svg = root.querySelector('.cv-links');
    const marquee = root.querySelector('.cv-marquee'), drawer = root.querySelector('.cv-drawer'), pct = root.querySelector('.cv-pct');
    root.dataset.lang = lang;

    // --- Build items from the source HTML ---------------------------------------
    const src = document.createElement('div');
    src.innerHTML = html;
    src.querySelectorAll('[data-icon]').forEach(i => { i.outerHTML = icon(i.dataset.icon, 'ic ' + (i.className || '')); });
    const items = [], links = [];
    [...src.children].forEach(el => {
      if (el.matches('a.link')) { links.push(el); return; }
      if (!el.matches('.frame, .state, .note, .area, .block')) return;
      el.classList.add('cv-item');
      el.style.left = (+el.dataset.x || 0) + 'px';
      el.style.top = (+el.dataset.y || 0) + 'px';
      if (el.matches('.area')) {
        el.style.width = (+el.dataset.w || 800) + 'px'; el.style.height = (+el.dataset.h || 600) + 'px';
        const ttl = el.dataset[lang === 'pt' ? 'titlePt' : 'titleEn'] || el.dataset.titleEn;
        if (ttl) el.insertAdjacentHTML('afterbegin', `<span class="cv-area-title">${ttl}</span>`);
      }
      if (el.matches('.block') && el.dataset.w) el.style.width = el.dataset.w + 'px';
      if (el.matches('.block') && el.dataset.title) { if (lang === 'pt' && el.dataset.titlePt) el.dataset.title = el.dataset.titlePt; el.insertAdjacentHTML('afterbegin', `<span class="cv-frame-title">${el.dataset.title}</span>`); }
      if (el.matches('.frame')) {
        const scr = el.querySelector('.ios');
        if (scr && !scr.querySelector('.ios-status') && !scr.classList.contains('no-chrome')) {
          scr.insertAdjacentHTML('afterbegin', `<div class="ios-status"><span>9:41</span><i class="ios-island"></i><span class="ios-sys">${icon('signal')}${icon('wifi')}${icon('battery-full')}</span></div>`);
          scr.insertAdjacentHTML('beforeend', '<i class="ios-home-ind"></i>');
        }
        if (el.dataset.title) el.insertAdjacentHTML('afterbegin', `<span class="cv-frame-title">${el.dataset.title}</span>`);
      }
      items.push(el);
    });
    src.querySelectorAll('img').forEach(img => img.setAttribute('onerror', "this.classList.add('cv-missing');this.removeAttribute('src')"));
    items.sort((a, b) => (a.matches('.area') ? 0 : 1) - (b.matches('.area') ? 0 : 1)).forEach(el => world.appendChild(el));

    // A note attached to a screen takes the screen's width and left edge, so notes line up under the frames.
    items.filter(n => n.matches('.note') && n.dataset.for && !n.dataset.free).forEach(n => {
      const f = items.find(i => i.id === n.dataset.for && i.matches('.frame'));
      if (f) { n.style.left = f.style.left; n.style.width = '393px'; }
    });

    // --- View transform -----------------------------------------------------------
    let x = 0, y = 0, k = 1, anim = 0;
    function apply() {
      world.style.transform = `translate(${x}px, ${y}px) scale(${k})`;
      world.style.setProperty('--inv', 1 / k);
      let gap = 24 * k; while (gap < 12) gap *= 2; while (gap > 48) gap /= 2;
      vp.style.backgroundSize = `${gap}px ${gap}px`;
      vp.style.backgroundPosition = `${x}px ${y}px`;
      pct.textContent = Math.round(k * 100) + '%';
    }
    function setView(nx, ny, nk, animate) {
      nk = Math.min(MAX, Math.max(MIN, nk));
      cancelAnimationFrame(anim);
      if (!animate || reduced()) { x = nx; y = ny; k = nk; apply(); return; }
      const s = { x, y, k }, t0 = performance.now(), dur = 220;
      const step = now => {
        const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        x = s.x + (nx - s.x) * e; y = s.y + (ny - s.y) * e; k = s.k + (nk - s.k) * e; apply();
        if (p < 1) anim = requestAnimationFrame(step);
      };
      anim = requestAnimationFrame(step);
    }
    function zoomAt(px, py, nk, animate) {
      nk = Math.min(MAX, Math.max(MIN, nk));
      const wx = (px - x) / k, wy = (py - y) / k;
      setView(px - wx * nk, py - wy * nk, nk, animate);
    }
    const local = e => { const r = vp.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    const box = el => ({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight });
    function fitTo(els, animate, maxK = 1) {
      if (!els.length) return;
      const bs = els.map(box);
      const x0 = Math.min(...bs.map(b => b.x)), y0 = Math.min(...bs.map(b => b.y));
      const x1 = Math.max(...bs.map(b => b.x + b.w)), y1 = Math.max(...bs.map(b => b.y + b.h));
      const head = root.parentElement?.querySelector('.cv-title'), top = head ? head.offsetTop + head.offsetHeight + 24 : PAD;
      const W = vp.clientWidth, H = vp.clientHeight - top - 72;
      const nk = Math.min(maxK, (W - PAD * 2) / (x1 - x0), H / (y1 - y0));
      setView((W - (x1 - x0) * nk) / 2 - x0 * nk, top + (H - (y1 - y0) * nk) / 2 - y0 * nk, nk, animate);
    }
    const fitAll = animate => fitTo(items, animate);

    // --- Links ----------------------------------------------------------------------
    function worldRect(el) {
      const r = el.getBoundingClientRect(), v = vp.getBoundingClientRect();
      return { x: (r.left - v.left - x) / k, y: (r.top - v.top - y) / k, w: r.width / k, h: r.height / k };
    }
    // Links are routed as rounded elbows on a grid that keeps clear of every frame, note,
    // state and title, so a line never runs over the content and its label sits in open space.
    const GRID = 12, CLEAR = 18, TURN = 8, SHARED = 4, REACH = 720;
    const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    function obstacleRects() {
      const rs = items.filter(el => !el.matches('.area')).map(el => {
        const r = box(el), t = el.querySelector(':scope > .cv-frame-title');
        return t ? { x: r.x, y: r.y - t.offsetHeight - 10, w: Math.max(r.w, t.offsetWidth), h: r.h + t.offsetHeight + 10, el } : { ...r, el };
      });
      world.querySelectorAll('.cv-area-title').forEach(t => { const a = box(t.parentElement); rs.push({ x: a.x + t.offsetLeft, y: a.y + t.offsetTop, w: t.offsetWidth, h: t.offsetHeight }); });
      return rs;
    }
    function route(src, anchor, dst, rects, used) {
      // Search window around both ends, in grid cells.
      const s = box(src), d = box(dst);
      const X0 = Math.min(s.x, d.x) - REACH, Y0 = Math.min(s.y, d.y) - REACH;
      const W = Math.ceil((Math.max(s.x + s.w, d.x + d.w) + REACH - X0) / GRID), H = Math.ceil((Math.max(s.y + s.h, d.y + d.h) + REACH - Y0) / GRID);
      const cx = v => Math.floor((v - X0) / GRID), cy = v => Math.floor((v - Y0) / GRID);
      const px = c => X0 + (c + .5) * GRID, py = c => Y0 + (c + .5) * GRID;
      const blocked = new Uint8Array(W * H);
      rects.forEach(r => {
        for (let j = Math.max(0, cy(r.y - CLEAR)); j <= Math.min(H - 1, cy(r.y + r.h + CLEAR)); j++)
          for (let i = Math.max(0, cx(r.x - CLEAR)); i <= Math.min(W - 1, cx(r.x + r.w + CLEAR)); i++) blocked[j * W + i] = 1;
      });
      // Starts: just outside each side of the source, level with the anchor; ends: just outside each side of the target.
      const ring = (r, out) => [
        [cx(r.x + r.w + CLEAR) + 1, null, 0], [null, cy(r.y + r.h + CLEAR) + 1, 1],
        [cx(r.x - CLEAR) - 1, null, 2], [null, cy(r.y - CLEAR) - 1, 3]
      ].map(([i, j, dir]) => ({ i, j, dir: out ? dir : (dir + 2) % 4 }));
      const ac = { x: anchor.x + anchor.w / 2, y: anchor.y + anchor.h / 2 };
      const starts = ring(s, true).map(o => ({ ...o, i: o.i ?? cx(ac.x), j: o.j ?? cy(ac.y) }))
        .filter(o => o.i >= 0 && o.j >= 0 && o.i < W && o.j < H && !blocked[o.j * W + o.i]);
      const ends = ring(d, false);
      const goal = new Int8Array(W * H).fill(-1);
      ends.forEach(e => {
        const along = e.i === null ? [cx(d.x + 24), cx(d.x + d.w - 24)] : [cy(d.y + 24), cy(d.y + d.h - 24)];
        for (let k2 = along[0]; k2 <= along[1]; k2++) {
          const i = e.i ?? k2, j = e.j ?? k2;
          if (i >= 0 && j >= 0 && i < W && j < H) goal[j * W + i] = e.dir;
        }
      });
      const tcx = cx(d.x + d.w / 2), tcy = cy(d.y + d.h / 2);
      const h = (i, j) => Math.abs(i - tcx) + Math.abs(j - tcy) - (d.w + d.h) / 2 / GRID;
      // A* over (cell, heading), with a cost for each turn and for cells another link already uses.
      const N = W * H * 4, g = new Float32Array(N).fill(Infinity), prev = new Int32Array(N).fill(-1);
      const heap = [], push = (f, n) => { heap.push([f, n]); let c = heap.length - 1; while (c) { const p = (c - 1) >> 1; if (heap[p][0] <= heap[c][0]) break; [heap[p], heap[c]] = [heap[c], heap[p]]; c = p; } };
      const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let c = 0; for (;;) { const l = 2 * c + 1, r = l + 1; let m = c; if (l < heap.length && heap[l][0] < heap[m][0]) m = l; if (r < heap.length && heap[r][0] < heap[m][0]) m = r; if (m === c) break; [heap[m], heap[c]] = [heap[c], heap[m]]; c = m; } } return top; };
      const toward = o => (o.dir === 0 && tcx > o.i) || (o.dir === 2 && tcx < o.i) || (o.dir === 1 && tcy > o.j) || (o.dir === 3 && tcy < o.j) ? 0 : TURN * 2;
      starts.forEach(o => { const n = (o.j * W + o.i) * 4 + o.dir; g[n] = toward(o); push(g[n] + h(o.i, o.j), n); });
      let found = -1;
      while (heap.length) {
        const [f, n] = pop(), dir = n & 3, cell = n >> 2, i = cell % W, j = (cell / W) | 0;
        if (f - h(i, j) > g[n] + 1e-6) continue;
        if (goal[cell] === dir) { found = n; break; }
        for (let nd = 0; nd < 4; nd++) {
          if (nd === (dir + 2) % 4) continue;
          const ni = i + DIRS[nd][0], nj = j + DIRS[nd][1];
          if (ni < 0 || nj < 0 || ni >= W || nj >= H) continue;
          const nc = nj * W + ni;
          if (blocked[nc]) continue;
          const key = Math.round(px(ni)) + ',' + Math.round(py(nj));
          const cost = g[n] + 1 + (nd !== dir ? TURN : 0) + (used.has(key) ? SHARED : 0), m = nc * 4 + nd;
          if (cost < g[m]) { g[m] = cost; prev[m] = n; push(cost + h(ni, nj), m); }
        }
      }
      if (found < 0) return null;
      const cells = [];
      for (let n = found; n >= 0; n = prev[n]) cells.unshift(n);
      const pts = cells.map(n => [px((n >> 2) % W), py(((n >> 2) / W) | 0)]);
      pts.forEach(p => used.add(Math.round(p[0]) + ',' + Math.round(p[1])));
      // Close both ends onto the edges of the source and the target.
      const first = pts[0], d0 = DIRS[cells[0] & 3], last = pts[pts.length - 1], d1 = DIRS[cells[cells.length - 1] & 3];
      const edge = (p, dv, r, sign) => dv[0] ? [dv[0] * sign > 0 ? r.x + r.w : r.x, p[1]] : [p[0], dv[1] * sign > 0 ? r.y + r.h : r.y];
      pts.unshift(edge(first, d0, s, 1));
      pts.push(edge(last, d1, d, -1));
      // Keep only the corners.
      return pts.filter((p, n) => n === 0 || n === pts.length - 1 || (pts[n - 1][0] !== pts[n + 1][0] && pts[n - 1][1] !== pts[n + 1][1]));
    }
    function elbow(pts, r = 20) {
      let dPath = `M${pts[0]}`;
      for (let n = 1; n < pts.length - 1; n++) {
        const [a, b, c] = [pts[n - 1], pts[n], pts[n + 1]];
        const l0 = Math.hypot(b[0] - a[0], b[1] - a[1]), l1 = Math.hypot(c[0] - b[0], c[1] - b[1]), rr = Math.min(r, l0 / 2, l1 / 2);
        const p = [b[0] - (b[0] - a[0]) / l0 * rr, b[1] - (b[1] - a[1]) / l0 * rr], q = [b[0] + (c[0] - b[0]) / l1 * rr, b[1] + (c[1] - b[1]) / l1 * rr];
        dPath += ` L${p} Q${b} ${q}`;
      }
      return dPath + ` L${pts[pts.length - 1]}`;
    }
    const overlaps = (a, b) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
    // Places a label on the longest open stretch of its line, clear of content and of other labels.
    function placeLabel(el, pts, rects, placed) {
      const w = el.offsetWidth, hgt = el.offsetHeight, spots = [];
      for (let n = 1; n < pts.length; n++) {
        const [a, b] = [pts[n - 1], pts[n]], len = Math.hypot(b[0] - a[0], b[1] - a[1]);
        for (let t = 0; t <= len; t += 8) spots.push({ x: a[0] + (b[0] - a[0]) * t / len, y: a[1] + (b[1] - a[1]) * t / len, room: Math.min(t, len - t), horiz: a[1] === b[1] });
      }
      spots.sort((p, q) => (q.horiz - p.horiz) * 400 + q.room - p.room);
      const free = spots.find(p => { const r = { x: p.x - w / 2 - 6, y: p.y - hgt / 2 - 6, w: w + 12, h: hgt + 12 }; return !rects.some(o => overlaps(r, o)) && !placed.some(o => overlaps(r, o)); }) || spots[0];
      if (!free) return;
      el.style.left = free.x + 'px'; el.style.top = free.y + 'px';
      placed.push({ x: free.x - w / 2, y: free.y - hgt / 2, w, h: hgt });
    }
    function drawLinks() {
      svg.querySelectorAll('path.cv-link').forEach(p => p.remove());
      world.querySelectorAll('.cv-link-label').forEach(l => l.remove());
      const rects = obstacleRects(), used = new Set(), placed = [];
      links.forEach(l => {
        const from = l.dataset.from.match(/^[\w-]+$/) ? world.querySelector('#' + l.dataset.from) : world.querySelector(l.dataset.from);
        const to = world.querySelector('#' + l.dataset.to);
        if (!from || !to) { console.warn('canvas link not found', l.dataset.from, l.dataset.to); return; }
        const srcItem = from.closest('.cv-item') || from;
        const pts = route(srcItem, worldRect(from), to, rects, used);
        if (pts) {
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', elbow(pts));
          path.setAttribute('class', 'cv-link' + (l.classList.contains('alt') ? ' alt' : ''));
          path.setAttribute('marker-end', 'url(#cv-arrow)');
          path.dataset.from = srcItem.id || ''; path.dataset.to = to.id;
          svg.appendChild(path);
          const label = l.dataset[lang === 'pt' ? 'labelPt' : 'labelEn'] || l.dataset.labelEn;
          if (label) {
            world.insertAdjacentHTML('beforeend', `<span class="cv-link-label">${label}</span>`);
            placeLabel(world.lastElementChild, pts, rects, placed);
          }
          return;
        }
        drawCurve(l, from, to);
      });
    }
    // Fallback when no clear route exists: the earlier bézier from edge to edge.
    function drawCurve(l, from, to) {
      {
        const a = worldRect(from), b = worldRect(to);
        const acx = a.x + a.w / 2, acy = a.y + a.h / 2, bcx = b.x + b.w / 2, bcy = b.y + b.h / 2;
        const horiz = b.x > a.x + a.w || b.x + b.w < a.x;
        let p0, p1, d0, d1;
        if (horiz) {
          const right = bcx > acx;
          p0 = [right ? a.x + a.w : a.x, acy]; p1 = [right ? b.x : b.x + b.w, Math.min(Math.max(acy, b.y + 40), b.y + b.h - 40)];
          d0 = [right ? 1 : -1, 0]; d1 = [right ? -1 : 1, 0];
        } else {
          const down = bcy > acy;
          p0 = [acx, down ? a.y + a.h : a.y]; p1 = [bcx, down ? b.y : b.y + b.h];
          d0 = [0, down ? 1 : -1]; d1 = [0, down ? -1 : 1];
        }
        const dist = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), c = Math.max(48, dist * 0.45);
        const c0 = [p0[0] + d0[0] * c, p0[1] + d0[1] * c], c1 = [p1[0] + d1[0] * c, p1[1] + d1[1] * c];
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M${p0} C${c0} ${c1} ${p1}`);
        path.setAttribute('class', 'cv-link' + (l.classList.contains('alt') ? ' alt' : ''));
        path.setAttribute('marker-end', 'url(#cv-arrow)');
        path.dataset.from = from.closest('.cv-item')?.id || ''; path.dataset.to = to.id;
        svg.appendChild(path);
        const label = l.dataset[lang === 'pt' ? 'labelPt' : 'labelEn'] || l.dataset.labelEn;
        if (label) {
          const m = [0.125 * p0[0] + 0.375 * c0[0] + 0.375 * c1[0] + 0.125 * p1[0], 0.125 * p0[1] + 0.375 * c0[1] + 0.375 * c1[1] + 0.125 * p1[1]];
          world.insertAdjacentHTML('beforeend', `<span class="cv-link-label" style="left:${m[0]}px;top:${m[1]}px">${label}</span>`);
        }
      }
    }

    // --- Selection and drawer ---------------------------------------------------------
    let selected = new Set();
    const titleOf = el => el.dataset.title || el.querySelector('.state-name, strong')?.textContent || el.textContent.trim().slice(0, 40);
    const kindOf = el => el.matches('.frame') ? t('kindScreen') : el.matches('.state') ? t('kindState') : el.matches('.note') ? t('kindNote') : el.matches('.block') ? t('kindBlock') : t('kindArea');
    function select(set) {
      selected = new Set(set);
      items.forEach(el => el.classList.toggle('is-selected', selected.has(el)));
      svg.querySelectorAll('path.cv-link').forEach(p => p.classList.toggle('is-hot', [...selected].some(s => s.id && (p.dataset.from === s.id || p.dataset.to === s.id))));
      renderDrawer();
    }
    function renderDrawer(aboutOnly) {
      const body = drawer.querySelector('.cv-drawer-body'), head = drawer.querySelector('.cv-drawer-title');
      const sel = [...selected].filter(el => !el.matches('.area'));
      drawer.classList.toggle('is-about', !!aboutOnly);
      if (aboutOnly) { head.textContent = t('about'); body.innerHTML = about; drawer.hidden = false; return; }
      if (!sel.length) { drawer.hidden = true; return; }
      if (sel.length > 1) {
        head.textContent = t('selectedN')(sel.length);
        body.innerHTML = `<ul class="cv-list">${sel.map(el => `<li><span>${titleOf(el)}</span><small>${kindOf(el)}</small></li>`).join('')}</ul>`;
      } else {
        const el = sel[0], id = el.id;
        head.textContent = titleOf(el);
        const notes = id ? items.filter(n => n.matches('.note') && n.dataset.for === id) : [];
        const outs = links.filter(l => (l.dataset.from.match(/^[\w-]+$/) ? l.dataset.from : (world.querySelector(l.dataset.from)?.closest('.cv-item')?.id)) === id);
        const ins = links.filter(l => l.dataset.to === id);
        const name = i => titleOf(world.querySelector('#' + i) || document.createElement('i'));
        const lab = l => l.dataset[lang === 'pt' ? 'labelPt' : 'labelEn'] || l.dataset.labelEn || '';
        const fromId = l => l.dataset.from.match(/^[\w-]+$/) ? l.dataset.from : world.querySelector(l.dataset.from)?.closest('.cv-item')?.id;
        body.innerHTML = `<p class="cv-kind">${kindOf(el)}</p>
          ${el.matches('.note') ? `<div class="cv-note-body">${el.innerHTML}</div>` : ''}
          ${notes.length ? `<h4>${t('notes')}</h4>${notes.map(n => `<div class="cv-note-body">${n.innerHTML}</div>`).join('')}` : ''}
          ${ins.length ? `<h4>${t('linksIn')}</h4><ul class="cv-list">${ins.map(l => `<li><button type="button" data-go="${fromId(l)}">${name(fromId(l))}</button><small>${lab(l)}</small></li>`).join('')}</ul>` : ''}
          ${outs.length ? `<h4>${t('linksOut')}</h4><ul class="cv-list">${outs.map(l => `<li><button type="button" data-go="${l.dataset.to}">${name(l.dataset.to)}</button><small>${lab(l)}</small></li>`).join('')}</ul>` : ''}`;
        body.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => {
          const target = world.querySelector('#' + b.dataset.go);
          if (target) { select([target]); fitTo([target], true, 1); }
        }));
      }
      drawer.hidden = false;
    }
    drawer.querySelector('.cv-close').addEventListener('click', () => { select([]); drawer.hidden = true; vp.focus(); });

    // --- Tools and input ---------------------------------------------------------------
    let tool = 'select', space = false;
    const setTool = name => {
      tool = name;
      root.querySelectorAll('[data-tool]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tool === name)));
      vp.dataset.tool = name;
    };
    root.querySelectorAll('[data-tool]').forEach(b => b.addEventListener('click', () => { setTool(b.dataset.tool); vp.focus(); }));
    root.querySelector('.cv-zoom').addEventListener('click', e => {
      const z = e.target.closest('[data-z]')?.dataset.z; if (!z) return;
      const cx = vp.clientWidth / 2, cy = vp.clientHeight / 2;
      if (z === 'in') zoomAt(cx, cy, k * 1.25, true);
      if (z === 'out') zoomAt(cx, cy, k / 1.25, true);
      if (z === 'reset') zoomAt(cx, cy, 1, true);
      if (z === 'fit') fitAll(true);
    });

    vp.addEventListener('wheel', e => {
      e.preventDefault();
      const [px, py] = local(e);
      if (e.ctrlKey || e.metaKey) { const d = Math.max(-40, Math.min(40, e.deltaY * (e.deltaMode ? 16 : 1))); zoomAt(px, py, k * Math.exp(-d * 0.012)); }
      else setView(x - e.deltaX, y - e.deltaY, k);
    }, { passive: false });

    const pointers = new Map();
    let drag = null;
    vp.addEventListener('pointerdown', e => {
      if (e.target.closest('.cv-tools, .cv-zoom, .cv-drawer')) return;
      vp.focus({ preventScroll: true });
      vp.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, local(e));
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        drag = { mode: 'pinch', d: Math.hypot(a[0] - b[0], a[1] - b[1]), m: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], k, x, y };
        marquee.hidden = true; return;
      }
      const [px, py] = local(e);
      const item = e.target.closest('.cv-item:not(.area)');
      if (e.button === 1 || space || tool === 'hand' || (e.pointerType === 'touch' && !item)) {
        drag = { mode: 'pan', sx: px, sy: py, x, y }; vp.classList.add('is-panning'); return;
      }
      if (e.button !== 0) return;
      if (item) {
        const set = new Set(e.shiftKey ? selected : []);
        if (e.shiftKey && set.has(item)) set.delete(item); else set.add(item);
        select(set); drag = null; return;
      }
      drag = { mode: 'marquee', sx: px, sy: py, base: e.shiftKey ? new Set(selected) : new Set(), moved: false };
    });
    vp.addEventListener('pointermove', e => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, local(e));
      if (!drag) return;
      const [px, py] = local(e);
      if (drag.mode === 'pinch' && pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        const d = Math.hypot(a[0] - b[0], a[1] - b[1]), m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        const nk = Math.min(MAX, Math.max(MIN, drag.k * d / drag.d));
        const wx = (drag.m[0] - drag.x) / drag.k, wy = (drag.m[1] - drag.y) / drag.k;
        setView(m[0] - wx * nk, m[1] - wy * nk, nk);
      } else if (drag.mode === 'pan') {
        setView(drag.x + px - drag.sx, drag.y + py - drag.sy, k);
      } else if (drag.mode === 'marquee') {
        const x0 = Math.min(px, drag.sx), y0 = Math.min(py, drag.sy), w = Math.abs(px - drag.sx), h = Math.abs(py - drag.sy);
        if (w + h < 4) return;
        drag.moved = true;
        Object.assign(marquee.style, { left: x0 + 'px', top: y0 + 'px', width: w + 'px', height: h + 'px' }); marquee.hidden = false;
        const r = { x: (x0 - x) / k, y: (y0 - y) / k, w: w / k, h: h / k };
        const hit = items.filter(el => { if (el.matches('.area')) return false; const b = box(el); return b.x < r.x + r.w && b.x + b.w > r.x && b.y < r.y + r.h && b.y + b.h > r.y; });
        select(new Set([...drag.base, ...hit]));
      }
    });
    const end = e => {
      pointers.delete(e.pointerId);
      if (drag?.mode === 'marquee' && !drag.moved) select([]);
      if (pointers.size < 2 && drag?.mode === 'pinch') drag = null;
      if (!pointers.size) { drag = null; marquee.hidden = true; vp.classList.remove('is-panning'); }
    };
    vp.addEventListener('pointerup', end);
    vp.addEventListener('pointercancel', end);
    // Safari trackpad pinch
    let gk = 1;
    vp.addEventListener('gesturestart', e => { e.preventDefault(); gk = k; });
    vp.addEventListener('gesturechange', e => { e.preventDefault(); const [px, py] = local(e); zoomAt(px, py, gk * e.scale); });

    const onKey = e => {
      if (!root.isConnected) { document.removeEventListener('keydown', onKey); document.removeEventListener('keyup', onKeyUp); return; }
      if (e.target.closest && e.target.closest('input, textarea, select')) return;
      const mod = e.metaKey || e.ctrlKey, cx = vp.clientWidth / 2, cy = vp.clientHeight / 2;
      if (e.code === 'Space' && !space) { space = true; vp.classList.add('is-hand'); e.preventDefault(); return; }
      if (mod && (e.key === '=' || e.key === '+')) { e.preventDefault(); zoomAt(cx, cy, k * 1.25, true); }
      else if (mod && e.key === '-') { e.preventDefault(); zoomAt(cx, cy, k / 1.25, true); }
      else if (mod && e.key === '0') { e.preventDefault(); zoomAt(cx, cy, 1, true); }
      else if (mod) return;
      else if (e.shiftKey && e.code === 'Digit1') fitAll(true);
      else if (e.shiftKey && e.code === 'Digit2') fitTo([...selected], true, 2);
      else if (e.shiftKey && e.code === 'Digit0') zoomAt(cx, cy, 1, true);
      else if (e.key === 'v' || e.key === 'V') setTool('select');
      else if (e.key === 'h' || e.key === 'H') setTool('hand');
      else if (e.key === 'Escape') { select([]); drawer.hidden = true; }
    };
    const onKeyUp = e => { if (e.code === 'Space') { space = false; vp.classList.remove('is-hand'); } };
    document.addEventListener('keydown', onKey);
    document.addEventListener('keyup', onKeyUp);

    apply();
    const ready = () => { drawLinks(); fitAll(false); };
    const imgs = [...world.querySelectorAll('img')].filter(i => !i.complete);
    Promise.all([document.fonts ? document.fonts.ready : null, ...imgs.map(i => new Promise(r => { i.onload = i.onerror = r; }))]).then(() => requestAnimationFrame(ready));
    let rt = 0;
    const ro = new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => { if (root.isConnected) apply(); }, 50); });
    ro.observe(vp);
    const api = { destroy: () => { document.removeEventListener('keydown', onKey); document.removeEventListener('keyup', onKeyUp); ro.disconnect(); }, showAbout: () => renderDrawer(true), fit: () => fitAll(true), zoomTo: (ids, maxK = 1.5) => { const els = String(ids).split(',').map(i => world.querySelector('#' + i.trim())).filter(Boolean); if (els.length) fitTo(els, false, maxK); } };
    root.__canvas = api;
    return api;
  }

  window.HSCanvas = { mount };
})();
