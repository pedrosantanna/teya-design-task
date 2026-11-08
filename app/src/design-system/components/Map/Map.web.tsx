// The map on the web: maplibre-gl drawing the same bundled OpenStreetMap data and style as the native map.
// maplibre-gl's CSP build and its worker are loaded as plain files from `map/` next to the page (copied into
// public/ by scripts/copy-map-web.mjs), so the main bundle stays small and nothing needs a blob: worker, which
// the docs artifact's iframe may block. The static fallback image shows until the map is idle and stays if the
// script, the worker or WebGL fails.
import type { Map as GlMap } from 'maplibre-gl';
import { memo, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { MAP_CAMERA } from './mapStyle';
import { cameraPadding, MapAttribution, MapPin, MapPlaceholder, MapSkeleton, useMapView, useSettled, type MapProps } from './MapParts';

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

export const Map = memo(function Map({ loading = false, pin = true, extent, interactive = false, accent, attribution = true, shopId, route = true }: MapProps) {
  const { theme } = useUnistyles();
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const view = useMapView(theme.scheme, accent, shopId, extent ?? (size ? { ...size, pinY: size.height / 2 } : undefined), route);
  const viewRef = useRef(view);
  viewRef.current = view;
  const container = useRef<unknown>(null);
  const map = useRef<GlMap | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const settled = useSettled();
  const padding = cameraPadding(extent, view.offsetX);
  const paddingKey = `${padding.bottom}:${padding.left}:${padding.right}`;

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
          style: viewRef.current.style as never,
          ...MAP_CAMERA,
          center: viewRef.current.center,
          zoom: viewRef.current.zoom,
          bearing: viewRef.current.bearing,
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

  // A new scheme or shop: restyle and move the camera to the shop.
  useEffect(() => {
    const m = map.current;
    if (!m) return;
    m.setStyle(viewRef.current.style as never);
    m.jumpTo({ center: viewRef.current.center, zoom: viewRef.current.zoom, bearing: viewRef.current.bearing });
     
  }, [view.key]);

  useEffect(() => {
    map.current?.setPadding(padding);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paddingKey]);

  return (
    <View style={styles.map} onLayout={(e) => setSize({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })} aria-hidden pointerEvents={interactive ? 'auto' : 'none'}>
      {loading ? (
        <MapSkeleton />
      ) : (
        <>
          <View ref={container as never} style={[styles.fill, failed ? styles.hidden : null]} />
          {/* The placeholder shows from the first frame and cross-fades to the live map: the static image of the area round
              Blythe Road for the plain map, the street skeleton for a shop's route (the image is of other streets). */}
          <MapPlaceholder key={view.key} extent={extent} image={view.key === 'area'} ready={ready && !failed} />
          {pin ? <MapPin extent={extent} accent={accent} offsetX={view.offsetX} /> : null}
          {attribution ? <MapAttribution extent={extent} /> : null}
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
