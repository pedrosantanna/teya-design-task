// What the prototype remembers between launches on native builds: a small JSON file in the app's documents,
// read synchronously so the first frame already knows it. The web build uses persist.web.ts (localStorage).
// Deleting the app clears it.
import { File, Paths } from 'expo-file-system';

export type Persisted = { hasOnboarded?: boolean };

const NAME = 'snuffle-prototype.json';

function file(): File | null {
  try {
    return new File(Paths.document, NAME);
  } catch {
    return null;
  }
}

export function readPersisted(): Persisted {
  try {
    const f = file();
    if (!f?.exists) return {};
    return JSON.parse(f.textSync()) as Persisted;
  } catch {
    return {};
  }
}

export function writePersisted(patch: Persisted) {
  try {
    const f = file();
    if (!f) return;
    const next = { ...readPersisted(), ...patch };
    if (!f.exists) f.create();
    f.writeSync(JSON.stringify(next));
  } catch {
    // Not remembered this time; first run shows again on the next launch.
  }
}
