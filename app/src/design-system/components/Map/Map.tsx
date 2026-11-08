// The map (imagery.md, Map style) on iOS and Android: MapLibre Native drawing bundled OpenStreetMap data for the
// prototype's high street with the theme's style, buildings in 3D, no labels and no network requests. The pin and
// the attribution are drawn over it; the static fallback image shows until the first full render, and stays if
// the map fails. Hidden from screen readers; the street and walk time in the card carry the same information.
// The web version is Map.web.tsx.
import { Camera, Map as MapLibreMap } from '@maplibre/maplibre-react-native';
import { memo, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { MAP_CAMERA } from './mapStyle';
import { cameraPadding, MapAttribution, MapPin, MapPlaceholder, MapSkeleton, useMapView, useSettled, type MapProps } from './MapParts';

export type { MapProps } from './MapParts';

export const Map = memo(function Map({ loading = false, pin = true, extent, interactive = false, accent, attribution = true, shopId, route = true }: MapProps) {
  const { theme } = useUnistyles();
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const view = useMapView(theme.scheme, accent, shopId, extent ?? (size ? { ...size, pinY: size.height / 2 } : undefined), route);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const settled = useSettled();
  return (
    <View
      style={styles.map}
      onLayout={(e) => setSize({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      pointerEvents={interactive ? 'auto' : 'none'}
    >
      {loading ? (
        <MapSkeleton />
      ) : (
        <>
          {failed || !settled ? null : (
            <MapLibreMap
              style={styles.fill}
              mapStyle={view.style}
              attribution={false}
              logo={false}
              compass={false}
              scaleBar={false}
              dragPan={interactive}
              touchZoom={interactive}
              doubleTapZoom={interactive}
              doubleTapHoldZoom={interactive}
              touchRotate={interactive}
              touchPitch={interactive}
              onDidFinishRenderingMapFully={() => setReady(true)}
              onDidFailLoadingMap={() => setFailed(true)}
            >
              <Camera center={view.center} {...MAP_CAMERA} zoom={view.zoom} bearing={view.bearing} padding={cameraPadding(extent, view.offsetX)} duration={0} />
            </MapLibreMap>
          )}
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
  fill: { ...StyleSheet.absoluteFillObject },
}));
