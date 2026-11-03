// Shared helpers for the illustration pipeline (render.mjs, encode.mjs).
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const APP = path.resolve(HERE, '../..');
export const REPO = path.resolve(APP, '..');
export const FRAMES = path.join(HERE, '.frames');
export const ASSETS = path.join(APP, 'assets/illustrations');
export const GENERATED = path.join(APP, 'src/design-system/components/Illustration/manifest.generated.ts');

export const manifest = () => JSON.parse(readFileSync(path.join(HERE, 'manifest.json'), 'utf8'));

// Every job the manifest asks for: one illustration, ground, size and scale, with its clips plus a still.
// An illustration renders every ground × size it lists, plus each `extra` combination ({ grounds, sizes }).
export function jobs(m, filter = {}) {
  const pick = (list, f) => (f ? list.filter((x) => f.includes(String(x))) : list);
  const out = [];
  const seen = new Set();
  for (const ill of pick(m.illustrations, null)) {
    if (filter.only && !filter.only.includes(ill.name)) continue;
    for (const combo of [{ grounds: ill.grounds, sizes: ill.sizes }, ...(ill.extra || [])]) {
      for (const g of pick(combo.grounds, filter.grounds)) {
        for (const scheme of pick(['light', 'dark'], filter.schemes)) {
          const ground = `${g}-${scheme}`;
          for (const sizeName of pick(combo.sizes, filter.sizes)) {
            const size = m.sizes[sizeName];
            if (filter.pt && !filter.pt.includes(String(size))) continue;
            for (const scale of pick(m.scales, filter.scales)) {
              const key = `${ill.name}/${ground}/${sizeName}/${scale}`;
              if (seen.has(key)) continue;
              seen.add(key);
              out.push({ ill, ground, color: m.grounds[ground], dark: m.groundTones?.[ground], sizeName, size, scale });
            }
          }
        }
      }
    }
  }
  return out;
}

// The scales a size's clips ship at: animationScalesBySize[size] when set (the hero size ships clips at @2x only,
// to stay inside the asset budget), else animationScales, else every scale.
export const clipScales = (m, sizeName) => m.animationScalesBySize?.[sizeName] ?? m.animationScales ?? m.scales;

// File stem: <name>[-<clip>].<ground>.<size>@<scale>x (Metro reads @2x/@3x as scale variants of <…>.<size>).
export const stem = (name, clip, ground, size, scale) => `${name}${clip && clip !== 'still' ? `-${clip}` : ''}.${ground}.${size}@${scale}x`;

// Parses --key value / --key=value flags; comma lists become arrays.
export function flags(argv = process.argv.slice(2)) {
  const o = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const [k, inline] = a.slice(2).split('=');
    const v = inline ?? (argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : 'true');
    o[k] = v.includes(',') || ['only', 'grounds', 'schemes', 'sizes', 'pt', 'scales', 'clips', 'set'].includes(k) ? v.split(',') : v;
  }
  return o;
}

// Loads a dev tool (playwright, sharp) that is not in package.json: from the app's node_modules if present,
// else from the temporary install `npx -p <pkg>@<version>` puts on PATH.
export async function tool(name, hint) {
  const flat = (mod) => (typeof mod.default === 'function' ? Object.assign(mod.default, mod) : { ...(mod.default || {}), ...mod });
  try {
    return flat(await import(name));
  } catch {}
  for (const dir of (process.env.PATH || '').split(path.delimiter)) {
    if (!dir.endsWith(path.join('node_modules', '.bin'))) continue;
    const pkg = path.join(dir, '..', name, 'package.json');
    if (!existsSync(pkg)) continue;
    const req = createRequire(pkg);
    const entry = req.resolve(name);
    return flat(await import(pathToFileURL(entry).href));
  }
  throw new Error(`${name} is not installed. Run through npx, e.g.\n  ${hint}`);
}
