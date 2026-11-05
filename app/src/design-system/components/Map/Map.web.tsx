// The map on the web: maplibre-gl drawing the same bundled OpenStreetMap data and style as the native map.
// maplibre-gl's CSP build and its worker are loaded as plain files from `map/` next to the page (copied into
// public/ by scripts/copy-map-web.mjs), so the main bundle stays small and nothing needs a blob: worker, which
// the docs artifact's iframe may block. The static fallback image shows until the map is idle and stays if the
// script, the worker or WebGL fails.
import type { Map as GlMap } from 'maplibre-gl';
import { memo, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { MAP_CENTER } from './mapData';
import { MAP_CAMERA, mapStyle } from './mapStyle';
import { cameraPadding, MapAttribution, MapFallback, MapPin, useSettled, type MapProps } from './MapParts';

export type { MapProps } from './MapParts';

type GlLib = typeof import('maplibre-gl');

let glPromise: Promise<GlLib> | null = null;

/** Loads maplibre-gl's CSP build once, from `map/` beside the page. */
function loadGl(): Promise<GlLib> {
  if (glPromise) return glPromise;
  const g = globalThis as unknown as { __SNUFFLE_BASE__?: string; maplibregl?: GlLib };
  const base = `${g.__SNUFFLE_BASE__ ?? ''}/map/`;
  glPromise = new Promise<GlLib>((resolve, reject) => {
    if (g.maplibregl) return resolve(g.maplibregl);
    const script = document.createElement('script');
    script.src = `${base}maplibre-gl-csp.js`;
    script.async = true;
    script.onload = () => {
      const lib = g.maplibregl;
      if (!lib) return reject(new Error('maplibre-gl did not load'));
      lib.setWorkerUrl(`${base}maplibre-gl-csp-worker.js`);
      resolve(lib);
    };
    script.onerror = () => reject(new Error('maplibre-gl failed to load'));
    document.head.appendChild(script);
  });
  glPromise.catch(() => {
    glPromise = null;
  });
  return glPromise;
}

export const Map = memo(function Map({ loading = false, pin = true, extent, interactive = false }: MapProps) {
  const { theme } = useUnistyles();
  const container = useRef<unknown>(null);
  const map = useRef<GlMap | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const settled = useSettled();
  const scheme = theme.scheme;
  const padding = cameraPadding(extent);
  const paddingKey = `${padding.bottom}`;

  useEffect(() => {
    if (loading || !settled) return undefined;
    let cancelled = false;
    let observer: ResizeObserver | null = null;
    loadGl()
      .then((gl) => {
        const node = container.current as unknown as HTMLElement | null;
        if (cancelled || !node) return;
        const m = new gl.Map({
          container: node,
          style: mapStyle(scheme) as never,
          center: MAP_CENTER,
          ...MAP_CAMERA,
          interactive,
          attributionControl: false,
          fadeDuration: 0,
        });
        m.setPadding(padding);
        m.once('idle', () => !cancelled && setReady(true));
        m.on('error', (e) => {
          // A failed source or worker leaves the fallback in place.
          console.warn('Map:', e.error?.message);
          if (!m.loaded() && !cancelled) setFailed(true);
        });
        m.getCanvas().addEventListener('webglcontextlost', () => setFailed(true));
        observer = new ResizeObserver(() => m.resize());
        observer.observe(node);
        map.current = m;
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
      observer?.disconnect();
      map.current?.remove();
      map.current = null;
      setReady(false);
    };
    // The map is created once per mount; theme and padding changes are applied below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, interactive, settled]);

  useEffect(() => {
    map.current?.setStyle(mapStyle(scheme) as never);
  }, [scheme]);

  useEffect(() => {
    map.current?.setPadding(padding);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paddingKey]);

  return (
    <View style={styles.map} aria-hidden pointerEvents={interactive ? 'auto' : 'none'}>
      {loading ? null : (
        <>
          <View ref={container as never} style={[styles.fill, failed ? styles.hidden : null]} />
          {ready && !failed ? null : <MapFallback extent={extent} />}
          {pin ? <MapPin extent={extent} /> : null}
          <MapAttribution extent={extent} />
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  map: { flex: 1, alignSelf: 'stretch', overflow: 'hidden', backgroundColor: theme.color.mapGround },
  fill: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  hidden: { display: 'none' },
}));
