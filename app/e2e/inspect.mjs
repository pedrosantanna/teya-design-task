// In-page inspection: runs in the browser and returns what the shopper could see and tap right now.
// It reads roles and labels (the accessibility surface), not CSS classes.
export const INSPECT = () => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const SEL = 'button,a[href],input,textarea,select,[role=button],[role=link],[role=radio],[role=tab],[role=switch],[role=checkbox],[role=slider],[role=textbox],[role=menuitem],[tabindex="0"]';
  const nameOf = (el) => {
    const label = el.getAttribute('aria-label');
    if (label && label.trim()) return label.trim();
    const by = el.getAttribute('aria-labelledby');
    if (by) {
      const t = by.split(/\s+/).map((id) => document.getElementById(id)?.textContent?.trim() || '').join(' ').trim();
      if (t) return t;
    }
    const alt = el.getAttribute('alt') || el.getAttribute('title') || el.getAttribute('placeholder');
    if (alt && alt.trim()) return alt.trim();
    return (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' ');
  };
  const roleOf = (el) => el.getAttribute('role') || (el.tagName === 'A' ? 'link' : el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' ? 'textbox' : el.tagName.toLowerCase());
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return null;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) === 0) return null;
    if (el.closest('[aria-hidden="true"],[inert]')) return null;
    const cx = Math.min(Math.max(r.left + r.width / 2, 0), vw - 1);
    const cy = Math.min(Math.max(r.top + r.height / 2, 0), vh - 1);
    if (r.bottom <= 0 || r.top >= vh || r.right <= 0 || r.left >= vw) return null;
    const top = document.elementFromPoint(cx, cy);
    if (!top || !(el === top || el.contains(top) || top.contains(el))) return null;
    return r;
  };
  // Controls that are in the accessibility tree but sit behind another layer (a sheet open over a screen).
  let occluded = 0;
  for (const el of document.querySelectorAll(SEL)) {
    if (el.closest('[aria-hidden="true"],[inert]')) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1 || r.bottom <= 0 || r.top >= vh || r.right <= 0 || r.left >= vw) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    if (!visible(el)) occluded += 1;
  }
  const items = [];
  const seen = new Set();
  for (const el of document.querySelectorAll(SEL)) {
    if (seen.has(el)) continue;
    seen.add(el);
    const r = visible(el);
    if (!r) continue;
    items.push({
      role: roleOf(el),
      name: nameOf(el),
      x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10,
      disabled: el.getAttribute('aria-disabled') === 'true' || el.hasAttribute('disabled'),
    });
  }
  // Text cut off by numberOfLines or a fixed width.
  const truncated = [];
  for (const el of document.querySelectorAll('div,span,p,h1,h2,h3')) {
    if (el.children.length > 0 && !(el.children.length === 1 && el.firstElementChild.tagName === 'BR')) continue;
    const text = (el.textContent || '').trim();
    if (!text) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1 || r.bottom <= 0 || r.top >= vh) continue;
    if (el.closest('[aria-hidden="true"]')) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    // Only text the app itself cuts: an ellipsis or a line clamp that hides part of it.
    const clamp = cs.webkitLineClamp && cs.webkitLineClamp !== 'none';
    const ellipsis = cs.textOverflow === 'ellipsis';
    const cutX = el.scrollWidth > el.clientWidth + 1;
    const cutY = el.scrollHeight > el.clientHeight + 2;
    if ((ellipsis && cutX) || (clamp && cutY)) truncated.push(text.slice(0, 80));
  }
  const texts = [];
  for (const el of document.querySelectorAll('div,span,p,h1,h2,h3,button')) {
    if (el.children.length > 0) continue;
    const t = (el.textContent || '').trim();
    if (!t || !visible(el)) continue;
    texts.push(t.replace(/\s+/g, ' '));
  }
  const headings = [...document.querySelectorAll('h1,h2,h3,[role=heading]')].filter((h) => visible(h)).map((h) => (h.textContent || '').trim()).filter(Boolean);
  const text = texts.join(' | ');
  const overflowX = document.documentElement.scrollWidth > vw + 1;
  const unlabelledImages = [...document.querySelectorAll('[role=img]')].filter((el) => visible(el) && !nameOf(el)).length;
  return { occluded, unlabelledImages, texts, items, truncated: [...new Set(truncated)], headings, text, overflowX };
};
