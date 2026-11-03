// Where an overlay or a screen zooms from: views register under an id (ZoomOrigin, ZoomSource) and an
// overlay measures the one it opens from, in window coordinates, at the moment it opens.
import type { ComponentRef, RefObject } from 'react';
import type { View } from 'react-native';

export type ViewRef = ComponentRef<typeof View>;

export type Rect = { x: number; y: number; width: number; height: number };

const origins = new Map<string, RefObject<ViewRef | null>>();

export function registerOrigin(id: string, ref: RefObject<ViewRef | null>) {
  origins.set(id, ref);
  return () => {
    if (origins.get(id) === ref) origins.delete(id);
  };
}

/** The view's rectangle in window coordinates, or null if nothing is registered under the id (or it isn't laid out). */
export function measureOrigin(id: string | undefined): Promise<Rect | null> {
  return measureView(id ? origins.get(id)?.current : null);
}

export function measureView(view: ViewRef | null | undefined): Promise<Rect | null> {
  return new Promise((resolve) => {
    if (!view) return resolve(null);
    view.measureInWindow((x, y, width, height) => resolve(width > 0 && height > 0 ? { x, y, width, height } : null));
  });
}

/** The DOM node registered under the id, on the web (for view transitions). */
export function originNode(id: string): unknown {
  return origins.get(id)?.current ?? null;
}
