// What the prototype remembers between visits on the web build. Every access is guarded: storage can be
// blocked (private windows, previews), and the prototype then simply doesn't remember.
export type Persisted = { hasOnboarded?: boolean };

const KEY = 'snuffle-prototype';

export function readPersisted(): Persisted {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Persisted) : {};
  } catch {
    return {};
  }
}

export function writePersisted(patch: Persisted) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ ...readPersisted(), ...patch }));
  } catch {
    // Not remembered this time.
  }
}
