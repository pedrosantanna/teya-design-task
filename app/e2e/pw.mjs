import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
export function loadPlaywright() {
  for (const dir of (process.env.PATH || '').split(path.delimiter)) {
    if (dir.endsWith(path.join('node_modules', '.bin')) && fs.existsSync(path.join(dir, '..', 'playwright'))) {
      return createRequire(path.join(dir, '..', 'x.js'))('playwright');
    }
  }
  return createRequire(import.meta.url)('playwright');
}
