/* Presentation mode for "The case".
   Slides come from docs/case/slides.json, so their text can change without touching this file.
   Open with the Present button at the top of the case's block in the sidebar, P (on pages without a canvas) or Shift+P (anywhere).
   Move with the arrow keys, Space, Page Up/Down, Home/End, a click (left third goes back) or a swipe.
   Esc closes. F toggles the browser's full screen. The slide number lives in the hash as #present-N. */
(() => {
  const SRC = 'docs/case/slides.json';
  const HASH = /^#present(?:-(\d+))?$/;
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const svg = (d, label) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const IC = {
    x: svg('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'),
    left: svg('<path d="m15 18-6-6 6-6"/>'),
    right: svg('<path d="m9 18 6-6-6-6"/>'),
    full: svg('<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>')
  };
  // The Snuffle mark (docs/develop/design-system/img/mark-ios-light.svg) in currentColor; the awning's alternate stripes take --pz-stripe.
  const EAR = 'M61.8465 52.1482C62.5035 50.0934 61.2616 47.9309 59.1384 47.549C41.2127 44.3246 26.6877 55.4777 29.3064 76.4271C30.7064 87.6271 43.3064 90.4271 48.9064 79.2271C53.8695 69.3009 58.8326 61.5741 61.8465 52.1482Z';
  // Parts are drawn in the app's order (MarkIntro.tsx): ears, eyes, the five stripes, then the nose, so the intro can move each one.
  const STRIPES = [
    'M-42.5 101 A8 8 0 0 1 -34.5 93 H-25.5 V119.1 A8.5 6.9 0 0 1 -42.5 119.1 Z',
    'M-25.5 93 H-8.5 V119.1 A8.5 6.9 0 0 1 -25.5 119.1 Z',
    'M-8.5 93 H8.5 V119.1 A8.5 6.9 0 0 1 -8.5 119.1 Z',
    'M8.5 93 H25.5 V119.1 A8.5 6.9 0 0 1 8.5 119.1 Z',
    'M25.5 93 H34.5 A8 8 0 0 1 42.5 101 V119.1 A8.5 6.9 0 0 1 25.5 119.1 Z'
  ];
  const MARK = `<svg class="pz-mark" viewBox="-60 -42 120 84" aria-hidden="true"><g transform="translate(0 -86.45)" fill="currentColor">
    <g class="pz-m-ear" data-side="-1"><path d="${EAR}" transform="translate(-85.306 0)"/></g><g class="pz-m-ear" data-side="1"><g transform="scale(-1 1)"><path d="${EAR}" transform="translate(-85.306 0)"/></g></g>
    <g class="pz-m-eyes"><circle cx="-15" cy="75" r="5"/><circle cx="15" cy="75" r="5"/></g>
    ${STRIPES.map((d, i) => `<path class="pz-m-stripe" d="${d}"${i % 2 ? ' style="fill:var(--pz-stripe)"' : ''}/>`).join('')}
    <ellipse class="pz-m-nose" cx="0" cy="94.5" rx="12" ry="9.5"/></g></svg>`;

  // The splash intro (mark.md "Splash intro", motion.md#splash, MarkIntro.tsx): the same clock and springs as the app,
  // sampled into Web Animations keyframes once. Lengths are in the glyph's own units (transform-box: fill-box).
  const INTRO = (() => {
    const MS = 1600, STEP = 20, N = MS / STEP;
    const spring = (ms, z, w) => { if (ms <= 0) return 0; const t = ms / 1000, wd = w * Math.sqrt(1 - z * z); return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + (z * w / wd) * Math.sin(wd * t)); };
    const tri = (c, s, ms) => { const p = (c - s) / ms; return p <= 0 || p >= 1 ? 0 : 1 - Math.abs(2 * p - 1); };
    const frames = f => Array.from({ length: N + 1 }, (_, k) => ({ ...f(k * STEP), offset: k / N }));
    const stripe = i => frames(c => {
      const ms = c - 100 - i * 70, s = spring(ms, 0.55, 22);
      const sway = ms > 120 ? 7 * Math.exp(-(ms - 120) / 1000 / 0.2) * Math.sin((ms - 120) / 1000 / 0.34 * 2 * Math.PI) : 0;
      return { transform: `translateY(${(-4 * (1 - s)).toFixed(3)}px) rotate(${sway.toFixed(3)}deg) scaleY(${(0.1 + 0.9 * s).toFixed(4)})` };
    });
    const ear = side => frames(c => { const s = spring(c - 780, 0.6, 20); return { opacity: Math.min(1, s * 2).toFixed(3), transform: `translateX(${(side * 8 * (1 - s)).toFixed(3)}px)` }; });
    const eyes = frames(c => {
      const s = spring(c - 960, 0.6, 24), b = Math.max(tri(c, 1240, 260), tri(c, 1400, 260));
      return { opacity: Math.min(1, s * 3).toFixed(3), transform: `scale(${(0.5 + 0.5 * s).toFixed(4)}) scaleY(${(1 - 0.9 * b).toFixed(4)})` };
    });
    const nose = frames(c => { const s = spring(c - 1050, 0.45, 26); return { opacity: Math.min(1, s * 3).toFixed(3), transform: `scale(${s.toFixed(4)})` }; });
    return { MS, stripes: STRIPES.map((_, i) => stripe(i)), ears: { '-1': ear(-1), '1': ear(1) }, eyes, nose };
  })();
  function playMarks(slide) {
    slide.querySelectorAll('.pz-mark').forEach(svgEl => {
      svgEl.getAnimations({ subtree: true }).forEach(a => a.cancel());
      if (reduced()) return;
      const opt = { duration: INTRO.MS, easing: 'linear', fill: 'both' };
      svgEl.querySelectorAll('.pz-m-stripe').forEach((el, i) => el.animate(INTRO.stripes[i], opt));
      svgEl.querySelectorAll('.pz-m-ear').forEach(el => el.animate(INTRO.ears[el.dataset.side], opt));
      svgEl.querySelector('.pz-m-eyes').animate(INTRO.eyes, opt);
      svgEl.querySelector('.pz-m-nose').animate(INTRO.nose, opt);
    });
  }

  let DATA = null, loading = null;
  let root = null, slides = [], groups = [], idx = 0, isOpen = false, busy = null, returnFocus = null;
  const load = () => loading || (loading = fetch(SRC, { cache: 'no-store' }).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(d => (DATA = d)));

  // --- Building the slides --------------------------------------------------
  const lines = (arr, cls = 'pz-lines') => arr && arr.length ? `<ul class="${cls}">${arr.map(l => `<li>${esc(l)}</li>`).join('')}</ul>` : '';
  const lazyImg = (src, cls, alt, extra = '') => `<img class="${cls}" data-src="${esc(src)}" alt="${esc(alt || '')}" ${extra} decoding="async" onerror="this.style.visibility='hidden'">`;
  const lazyVideo = (m, cls) => `<video class="${cls}" data-src="${esc(m.src)}" data-poster="${esc(m.poster || '')}" muted loop playsinline preload="none" aria-label="${esc(m.alt || '')}"></video>`;
  // A phone clip already carries its own bezel, so the frame only keeps the clip's ratio (450 × 948 unless the slide says otherwise) and rounds its corners.
  const phone = p => `<div class="pz-phone" style="--pz-arw:${Number(p.width) || 450};--pz-arh:${Number(p.height) || 948}">${lazyVideo(p, 'pz-phone-video')}</div>`;
  const cap = t => t ? `<p class="pz-cap">${esc(t)}</p>` : '';

  function media(m) {
    if (!m) return '';
    switch (m.type) {
      case 'group': return `<div class="pz-group">${m.items.map(media).join('')}</div>`;
      case 'video': return lazyVideo(m, 'pz-video');
      case 'mark': return `<div class="pz-cover-mark" role="img" aria-label="${esc(m.alt || 'The Snuffle mark')}">${MARK}</div>`;
      case 'illustration': return lazyImg(m.src, 'pz-illus', m.alt);
      case 'doc': return lazyImg(m.src, m.fade ? 'pz-doc is-faded' : 'pz-doc', m.alt, m.width ? `width="${m.width}" height="${m.height}"` : '');
      case 'phones': return `<div class="pz-phones" style="--pz-n:${m.items.length}">${m.items.map(phone).join('')}</div>`;
      case 'code': return `<pre class="pz-code" aria-label="Repository layout">${m.lines.map(l => { const mm = /^(\s*\S+)(\s*)(.*)$/.exec(l); return mm ? `<span>${esc(mm[1])}</span>${mm[2]}<i>${esc(mm[3])}</i>` : esc(l); }).join('\n')}</pre>`;
      case 'hub': {
        const col = a => `<ul>${a.map(i => `<li><b>${esc(i.name)}</b><span>${esc(i.via)}</span></li>`).join('')}</ul>`;
        return `<div class="pz-hub">${col(m.left)}<div class="pz-hub-core">${MARK}<span>${esc(m.centre)}</span></div>${col(m.right)}</div>`;
      }
      case 'answer': return `<div class="pz-answer" role="img" aria-label="${esc(`An answer card: ${m.shop}, ${m.line}, ${(m.meta || []).join(', ')}, with ${m.action}`)}"><span class="pz-answer-src">${esc(m.source)}</span><h3>${esc(m.shop)}</h3><p>${esc(m.line)}</p><ul>${(m.meta || []).map(x => `<li>${esc(x)}</li>`).join('')}</ul><div class="pz-answer-buy">${esc(m.action)}</div></div>`;
      case 'chain': return `<ol class="pz-chain">${m.items.map(i => `<li><b>${esc(i.name)}</b><span>${esc(i.text)}</span></li>`).join('')}</ol>`;
      case 'steps': return `<ol class="pz-steps" style="--pz-n:${m.items.length}" aria-label="${esc(m.label || 'Steps, in order')}">${m.items.map((i, k) => `<li${k === m.items.length - 1 ? ' class="is-end"' : ''}><b>${esc(i.name)}</b><span>${esc(i.text || '')}</span></li>`).join('')}</ol>`;
      case 'themes': return `<div class="pz-themes-wrap">${cap(m.label)}<ol class="pz-themes">${m.items.map(i => `<li>${esc(i)}</li>`).join('')}</ol></div>`;
      case 'quotes': return `<div class="pz-quotes">${m.items.map(q => `<figure><figcaption>${esc(q.theme)}</figcaption><blockquote lang="en">“${esc(q.text)}”</blockquote><p>${esc(q.who)}</p></figure>`).join('')}</div>`;
      case 'columns': return `<div class="pz-cols">${m.items.map(c => `<section><h3>${esc(c.title)}</h3><ul>${c.lines.map(l => `<li>${esc(l)}</li>`).join('')}</ul></section>`).join('')}</div>`;
      case 'cards': return `<div class="pz-cards-wrap">${cap(m.label)}<ul class="pz-cards" style="--pz-n:${m.items.length}">${m.items.map(c => `<li>${c.name ? `<b>${esc(c.name)}</b>` : ''}<span>${esc(c.text)}</span>${c.note ? `<small>${/^\d/.test(c.note) ? 'Decision ' : ''}${esc(c.note)}</small>` : ''}</li>`).join('')}</ul></div>`;
      case 'pairs': return `<ol class="pz-pairs" aria-label="Pain, and what it changed in the product">${m.items.map(p => `<li><span class="pz-pair-from">${esc(p.from)}<small>${esc(p.note || '')}</small></span><span class="pz-pair-arrow" aria-hidden="true"></span><span class="pz-pair-to">${esc(p.to)}</span></li>`).join('')}</ol>`;
      case 'pmap': {
        // The proto-persona map, simplified: one circle per cluster at its centre (urgency 0–10 across, stage 10 = find out at the top), sized by its posts.
        // The stages use the top 76% of the plot, so a cluster at the last stage stays clear of the axis.
        const y = v => 12 + (1 - v / 10) * 64, x = v => 8 + v / 10 * 84;
        const ticks = (m.ticks || []).map(t => `<span class="pz-pm-tick" style="top:${y(t.y)}%">${esc(t.label)}${t.note ? `<i>${esc(t.note)}</i>` : ''}</span>`).join('');
        const max = Math.max(...m.clusters.map(c => c.n));
        const dots = m.clusters.map(c => `<span class="pz-pm-c is-${esc(c.tile)}" style="left:${x(c.x).toFixed(1)}%;top:${y(c.y).toFixed(1)}%;--d:${(Math.sqrt(c.n / max) * 100).toFixed(0)}"><b>${esc(c.name)}</b>${esc(c.n)}</span>`).join('');
        return `<figure class="pz-pmap" role="img" aria-label="${esc(m.alt || '')}"><span class="pz-pm-y">${esc(m.yLabel)}</span><div class="pz-pm-plot">${ticks}${dots}</div><figcaption><span>${esc(m.xMin)}</span><span>${esc(m.xLabel)}</span><span>${esc(m.xMax)}</span></figcaption></figure>`;
      }
      case 'gallery': return `<div class="pz-gallery">${m.mark ? `<div class="is-mark">${MARK}</div>` : ''}${m.items.map(i => `<div class="is-${esc(i.tile)}">${lazyImg(i.src, '', '')}</div>`).join('')}</div>`;
      case 'options': return `<ol class="pz-options" style="--pz-n:${m.items.length}">${m.items.map(o => `<li${o.chosen ? ' class="is-chosen"' : ''}>${o.badge || o.chosen ? `<span class="pz-chosen">${esc(o.badge || 'Chosen')}</span>` : ''}<b>${esc(o.name)}</b><span>${esc(o.text)}</span>${o.detail ? `<small>${esc(o.detail)}</small>` : ''}</li>`).join('')}</ol>`;
      case 'bars': {
        // A bar per scenario on one scale, with the cost as a dashed line across them and the projection badge on top.
        const max = m.max, pct = v => (v / max * 100).toFixed(1);
        return `<figure class="pz-bars" role="img" aria-label="${esc(m.alt || '')}"><span class="pz-badge">${esc(m.badge)}</span><div class="pz-bars-plot">${m.items.map((b, k) => `<span class="pz-bar-name" style="grid-row:${k + 1}">${esc(b.name)}</span><span class="pz-bar-track${b.strong ? ' is-strong' : ''}" style="grid-row:${k + 1}"><i style="width:${pct(b.value)}%"></i><em>${esc(b.label)}</em></span>`).join('')}<span class="pz-bars-scale" style="grid-row:1 / span ${m.items.length}"><span class="pz-bars-line" style="left:${pct(m.line.value)}%"><span>${esc(m.line.label)}</span></span></span></div></figure>`;
      }
      default: return '';
    }
  }

  // The case page's H2s this slide covers, in the page's order, so the mapping to the case stays visible.
  const labels = s => s.labels && s.labels.length ? `<p class="pz-label">${s.labels.map(l => `<span>${esc(l)}</span>`).join('')}</p>` : '';
  const stats = (s, compact) => s.stats && s.stats.length ? `<dl class="pz-stats${compact ? ' is-compact' : ''}" style="--pz-n:${s.stats.length}">${s.stats.map(x => `<div class="pz-stat"><dt class="pz-sr">${esc(x.label)}</dt><dd><b>${esc(x.value)}</b><span aria-hidden="true">${esc(x.label)}</span></dd></div>`).join('')}</dl>` : '';

  function slideHTML(s, i, n, partOf) {
    const L = s.layout || 'points';
    const title = `<h2 class="pz-title">${esc(s.title)}</h2>`;
    let text = '';
    if (L === 'section') text = `<p class="pz-part"><span class="pz-sr">Section </span>${esc(s.number)}<span class="pz-sr"> of ${partOf}</span></p>${title}${lines(s.lines)}`;
    else if (L === 'close') text = `${MARK}${title}${lines(s.lines)}`;
    else if (L === 'stats') text = `${labels(s)}${title}${stats(s)}${lines(s.lines)}`;
    else if (L === 'rows') text = `${labels(s)}${title}<ul class="pz-rows">${(s.rows || []).map(r => `<li class="pz-row"><b>${esc(r.big)}</b><p>${esc(r.text)}${r.note ? `<small>${esc(r.note)}</small>` : ''}</p></li>`).join('')}</ul>`;
    else text = `${labels(s)}${title}${lines(s.lines)}${stats(s, true)}`;
    const m = media(s.media);
    const type = s.media && s.media.type;
    const wide = s.media && s.media.below ? ' media-below' : ['doc', 'hub', 'pmap', 'quotes', 'columns', 'options', 'bars', 'themes', 'pairs', 'cards', 'chain', 'code'].includes(type) ? ' media-wide' : '';
    return `<section class="pz-slide${m ? ' has-media' : ''}${wide}${type ? ` media-${esc(type)}` : ''}" data-pz-theme="${esc(s.theme || 'paper')}" data-layout="${esc(L)}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${n}: ${esc(s.title)}" inert aria-hidden="true">
      <div class="pz-inner"><div class="pz-text">${text}</div>${m ? `<div class="pz-media">${m}</div>` : ''}</div></section>`;
  }

  function build() {
    const list = DATA.slides;
    const parts = Math.max(...list.filter(s => s.layout === 'section').map(s => Number(s.number) || 0));
    root = document.createElement('div');
    root.className = 'pz';
    root.hidden = true;
    root.tabIndex = -1;
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-label', 'Presentation of the case');
    // One bar per section, as long as its share of the slides; the current section's bar fills as you move through it.
    groups = [];
    list.forEach((s, i) => {
      const g = groups[groups.length - 1];
      if (g && g.key === s.section) { g.end = i; return; }
      groups.push({ key: s.section, name: String(s.section || '').replace(/^\s*\d+\s*·\s*/, ''), start: i, end: i });
    });
    const segs = groups.map((g, k) => `<span class="pz-seg" data-seg="${k}" title="${esc(g.key)}" style="flex-grow:${g.end - g.start + 1}"><i></i></span>`).join('');
    root.innerHTML = `<div class="pz-stage">${list.map((s, i) => slideHTML(s, i, list.length, parts)).join('')}</div>
      <div class="pz-top pz-ctls">${document.fullscreenEnabled ? `<button type="button" class="pz-btn" data-pz="full" aria-label="Full screen (F)" title="Full screen (F)">${IC.full}</button>` : ''}<button type="button" class="pz-btn" data-pz="close" aria-label="Close the presentation (Esc)" title="Close (Esc)">${IC.x}</button></div>
      <div class="pz-chrome"><p class="pz-where" aria-hidden="true"><b></b><span></span></p><div class="pz-progress" aria-hidden="true">${segs}</div>
        <div class="pz-ctls"><button type="button" class="pz-btn" data-pz="prev" aria-label="Previous slide" title="Previous (←)">${IC.left}</button><button type="button" class="pz-btn" data-pz="next" aria-label="Next slide" title="Next (→ or Space)">${IC.right}</button></div></div>
      <p class="pz-sr" aria-live="polite" aria-atomic="true"></p>`;
    document.body.appendChild(root);
    slides = [...root.querySelectorAll('.pz-slide')];
    root.addEventListener('click', onClick);
    root.addEventListener('pointerdown', onDown);
    root.addEventListener('pointerup', onUp);
    root.addEventListener('pointercancel', () => { down = null; });
    root.querySelector('.pz-progress').addEventListener('click', e => {
      const seg = e.target.closest('.pz-seg');
      if (seg) go(groups[Number(seg.dataset.seg)].start);
      e.stopPropagation();
    });
    // Phone frames take the clip's real ratio once it is known, in case a clip isn't 450 × 948.
    root.querySelectorAll('.pz-phone-video').forEach(v => v.addEventListener('loadedmetadata', () => {
      if (v.videoWidth && v.videoHeight) { v.parentElement.style.setProperty('--pz-arw', v.videoWidth); v.parentElement.style.setProperty('--pz-arh', v.videoHeight); }
    }));
  }

  // Media is attached only for the slide in view and its neighbours, so opening the deck loads three slides, not all of them.
  function hydrate(i) {
    [i - 1, i, i + 1].forEach(j => {
      const s = slides[j]; if (!s || s.dataset.hydrated) return;
      s.dataset.hydrated = '1';
      s.querySelectorAll('img[data-src]').forEach(img => { img.src = img.dataset.src; });
      s.querySelectorAll('video[data-src]').forEach(v => { if (v.dataset.poster) v.poster = v.dataset.poster; v.preload = 'metadata'; v.src = v.dataset.src; });
    });
  }
  function playIn(s) { s.querySelectorAll('video').forEach(v => { v.preload = 'auto'; const p = v.play(); if (p && p.catch) p.catch(() => {}); }); }
  function pauseIn(s) { s.querySelectorAll('video').forEach(v => v.pause()); }

  // --- Navigation -----------------------------------------------------------
  function setChrome() {
    const s = DATA.slides[idx];
    root.setAttribute('data-pz-theme', s.theme || 'paper');
    const gi = groups.findIndex(g => idx >= g.start && idx <= g.end), g = groups[gi];
    const n = g.end - g.start + 1, k = idx - g.start + 1;
    root.querySelector('.pz-where b').textContent = g.name;
    root.querySelector('.pz-where span').textContent = `${k} of ${n}`;
    root.querySelectorAll('.pz-seg').forEach((el, j) => {
      el.style.setProperty('--pz-fill', j < gi ? 1 : j > gi ? 0 : (k / n).toFixed(4));
      el.classList.toggle('is-now', j === gi);
    });
    root.querySelector('[data-pz="prev"]').disabled = idx === 0;
    root.querySelector('[data-pz="next"]').disabled = idx === slides.length - 1;
    root.querySelector('.pz-sr[aria-live]').textContent = `Slide ${idx + 1} of ${slides.length}, ${g.name} ${k} of ${n}: ${s.title}`;
  }
  function writeHash() {
    const h = `#present-${idx + 1}`;
    if (location.hash !== h) history.replaceState(history.state, '', h);
  }
  function show(i, dir, animate) {
    const prev = slides[idx], next = slides[i];
    idx = i;
    hydrate(i);
    slides.forEach(s => { if (s !== next && s !== prev) { s.classList.remove('is-on', 'is-leaving'); } });
    if (prev && prev !== next) {
      prev.classList.remove('is-on');
      prev.setAttribute('inert', ''); prev.setAttribute('aria-hidden', 'true');
      pauseIn(prev);
    }
    next.classList.add('is-on'); next.classList.remove('is-leaving');
    next.removeAttribute('inert'); next.removeAttribute('aria-hidden');
    next.querySelector('.pz-inner').scrollTop = 0;
    setChrome(); writeHash(); playIn(next); playMarks(next);
    if (animate && prev && prev !== next && !reduced()) {
      // The ground changes colour underneath (CSS); the old content leaves quickly, then the new one arrives.
      prev.classList.add('is-leaving');
      const out = prev.querySelector('.pz-inner').animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translateX(${-dir * 2}vw)` }], { duration: 180, easing: 'ease-in', fill: 'forwards' });
      out.onfinish = () => { prev.classList.remove('is-leaving'); out.cancel(); };
      next.querySelector('.pz-inner').animate([{ opacity: 0, transform: `translateX(${dir * 3}vw)` }, { opacity: 1, transform: 'none' }], { duration: 420, delay: 120, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
    }
  }
  function go(i) {
    if (!isOpen || i < 0 || i >= slides.length || i === idx) return;
    show(i, i > idx ? 1 : -1, true);
  }

  // --- Opening and closing --------------------------------------------------
  const page = () => [document.querySelector('.topbar'), document.querySelector('.shell')].filter(Boolean);
  function origin() {
    const b = document.getElementById('present-btn');
    const r = b && b.offsetParent ? b.getBoundingClientRect() : null;
    return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : { x: innerWidth / 2, y: innerHeight / 2 };
  }
  function radius(o) { return Math.hypot(Math.max(o.x, innerWidth - o.x), Math.max(o.y, innerHeight - o.y)) + 8; }

  async function open(n, { animate = true } = {}) {
    if (busy) return;
    if (!DATA) { try { await load(); } catch (e) { console.warn('Slides failed to load', e); return; } }
    if (!root) build();
    const i = Math.min(Math.max((n || 1) - 1, 0), slides.length - 1);
    if (isOpen) { go(i); return; }
    if (!HASH.test(location.hash)) store.set('pz-origin', location.hash.replace(/^#/, ''));
    returnFocus = document.activeElement;
    isOpen = true;
    root.hidden = false;
    document.documentElement.classList.add('pz-lock');
    idx = i; slides.forEach(s => s.classList.remove('is-on'));
    // The first slide's colours apply at once; transitions are only for moving between slides.
    root.classList.add('pz-instant');
    show(i, 1, false);
    void root.offsetWidth;
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('pz-instant')));
    root.focus({ preventScroll: true });
    if (!animate) { page().forEach(el => el.setAttribute('inert', '')); return; }
    if (reduced()) {
      busy = root.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: 'ease-out' }).finished;
    } else {
      const o = origin(), R = radius(o);
      page().forEach(el => {
        el.style.transformOrigin = `${o.x}px ${o.y}px`;
        el.animate([{ transform: 'none', opacity: 1 }, { transform: 'scale(.94)', opacity: .35 }], { duration: 640, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards' });
      });
      busy = root.animate([{ clipPath: `circle(0px at ${o.x}px ${o.y}px)`, opacity: 0 }, { opacity: 1, offset: .12 }, { clipPath: `circle(${R}px at ${o.x}px ${o.y}px)`, opacity: 1 }], { duration: 680, easing: 'cubic-bezier(.65,0,.25,1)' }).finished;
      // The first slide's words arrive just after the colour reaches them.
      const parts = slides[i].querySelectorAll('.pz-text > *, .pz-media');
      parts.forEach((el, k) => el.animate([{ opacity: 0, transform: 'translateY(28px)' }, { opacity: 1, transform: 'none' }], { duration: 520, delay: 200 + k * 60, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' }));
    }
    await busy.catch(() => {}); busy = null;
    page().forEach(el => el.setAttribute('inert', ''));
  }

  async function close({ animate = true } = {}) {
    if (!isOpen || busy) return;
    isOpen = false;
    if (document.fullscreenElement) { try { await document.exitFullscreen(); } catch (e) {} }
    const back = store.get('pz-origin');
    if (HASH.test(location.hash)) history.replaceState(history.state, '', back ? `#${back}` : location.pathname + location.search);
    page().forEach(el => el.removeAttribute('inert'));
    slides.forEach(pauseIn);
    if (animate && !reduced()) {
      const o = origin(), R = radius(o);
      page().forEach(el => {
        el.getAnimations().forEach(a => a.cancel());
        el.style.transformOrigin = `${o.x}px ${o.y}px`;
        el.animate([{ transform: 'scale(.94)', opacity: .35 }, { transform: 'none', opacity: 1 }], { duration: 600, easing: 'cubic-bezier(.65,0,.35,1)' });
      });
      // The words leave first, so the closing circle never slices them.
      const inner = slides[idx].querySelector('.pz-inner');
      inner.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, easing: 'ease-in', fill: 'forwards' });
      busy = root.animate([{ clipPath: `circle(${R}px at ${o.x}px ${o.y}px)`, opacity: 1 }, { opacity: 1, offset: .8 }, { clipPath: `circle(0px at ${o.x}px ${o.y}px)`, opacity: 0 }], { duration: 560, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards' }).finished;
    } else if (animate) {
      busy = root.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: 'forwards' }).finished;
    }
    if (busy) { await busy.catch(() => {}); busy = null; }
    page().forEach(el => { el.getAnimations().forEach(a => a.cancel()); el.style.transformOrigin = ''; });
    root.getAnimations({ subtree: true }).forEach(a => a.cancel());
    root.hidden = true;
    document.documentElement.classList.remove('pz-lock');
    const f = returnFocus && returnFocus.isConnected && returnFocus !== document.body ? returnFocus : document.getElementById('present-btn');
    if (f && f.focus) f.focus({ preventScroll: true });
  }

  // --- Input ----------------------------------------------------------------
  let down = null, swallowClick = false;
  function onDown(e) { if (e.pointerType !== 'mouse') down = { x: e.clientX, y: e.clientY, t: Date.now() }; }
  function onUp(e) {
    if (!down) return;
    const dx = e.clientX - down.x, dy = e.clientY - down.y;
    down = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) { swallowClick = true; go(idx + (dx < 0 ? 1 : -1)); setTimeout(() => { swallowClick = false; }, 350); }
  }
  function onClick(e) {
    const b = e.target.closest('[data-pz]');
    if (b) {
      const a = b.dataset.pz;
      if (a === 'close') close(); else if (a === 'prev') go(idx - 1); else if (a === 'next') go(idx + 1); else if (a === 'full') toggleFull();
      return;
    }
    if (swallowClick || e.target.closest('a, button, .pz-chrome, .pz-ctls')) return;
    if (getSelection && String(getSelection())) return;
    go(idx + (e.clientX < innerWidth * 0.3 ? -1 : 1));
  }
  function toggleFull() {
    try { if (document.fullscreenElement) document.exitFullscreen(); else root.requestFullscreen({ navigationUI: 'hide' }); } catch (e) {}
  }
  const typing = el => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
  function trapTab(e) {
    const f = [...root.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')].filter(el => !el.closest('[inert]'));
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === root)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  window.addEventListener('keydown', e => {
    const mod = e.metaKey || e.ctrlKey || e.altKey;
    if (!isOpen) {
      if (mod || typing(e.target) || e.repeat) return;
      const shiftP = e.shiftKey && (e.key === 'P' || e.key === 'p');
      const plainP = !e.shiftKey && e.key === 'p' && !document.body.classList.contains('is-canvas');
      if (shiftP || plainP) { e.preventDefault(); e.stopImmediatePropagation(); open(1); }
      return;
    }
    // While the deck is open, no key reaches the docs (search, canvas tools, sidebar).
    if (e.key === 'Tab') { trapTab(e); e.stopImmediatePropagation(); return; }
    if (mod) { e.stopImmediatePropagation(); return; }
    const onButton = e.target.closest && e.target.closest('button');
    let handled = true;
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': go(idx + 1); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace': go(idx - 1); break;
      case ' ': if (onButton) { handled = false; break; } go(idx + (e.shiftKey ? -1 : 1)); break;
      case 'Home': go(0); break;
      case 'End': go(slides.length - 1); break;
      case 'Escape': if (!document.fullscreenElement) close(); else handled = false; break;
      case 'f': case 'F': toggleFull(); break;
      case 'Enter': handled = false; break;
      default: handled = false;
    }
    if (handled) e.preventDefault();
    e.stopImmediatePropagation();
  }, true);

  window.addEventListener('hashchange', () => {
    const m = HASH.exec(location.hash);
    if (m) open(Number(m[1] || 1), { animate: !isOpen });
    else if (isOpen) close({ animate: false });
  });

  function init() {
    // The button lives in the sidebar, which the docs re-render, so clicks are delegated.
    document.addEventListener('click', e => { if (e.target.closest && e.target.closest('#present-btn')) open(1); });
    document.addEventListener('pointerover', e => { if (e.target.closest && e.target.closest('#present-btn')) load().catch(() => {}); });
    const m = HASH.exec(location.hash);
    if (m) open(Number(m[1] || 1), { animate: false });
    // Fetch the slides once the docs are idle, so the first Present opens without waiting on the network.
    else (window.requestIdleCallback || (f => setTimeout(f, 1500)))(() => load().catch(() => {}));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  // The docs read this to render the page the deck was opened from, behind the deck, after a reload on #present-N.
  window.SnufflePresent = { open: n => open(n), close: () => close(), origin: () => store.get('pz-origin') || '' };
})();
