// The map (imagery.md, Map style) on iOS and Android: MapLibre Native drawing bundled OpenStreetMap data for the
// prototype's high street with the theme's style, buildings in 3D, no labels and no network requests. The pin and
// the attribution are drawn over it; the static fallback image shows until the first full render, and stays if
// the map fails. Hidden from screen readers; the street and walk time in the card carry the same information.
// The web version is Map.web.tsx.
import { Camera, Map as MapLibreMap } from '@maplibre/maplibre-react-native';
import { memo, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { MAP_CENTER } from './mapData';
import { MAP_CAMERA, mapStyle } from './mapStyle';
import { cameraPadding, MapAttribution, MapFallback, MapPin, type MapProps } from './MapParts';

export type { MapProps } from './MapParts';

export const Map = memo(function Map({ loading = false, pin = true, extent, interactive = false }: MapProps) {
  const { theme } = useUnistyles();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <View
      style={styles.map}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      pointerEvents={interactive ? 'auto' : 'none'}
    >
      {loading ? null : (
        <>
          {failed ? null : (
            <MapLibreMap
              style={styles.fill}
              mapStyle={mapStyle(theme.scheme)}
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
              <Camera center={MAP_CENTER} {...MAP_CAMERA} padding={cameraPadding(extent)} duration={0} />
            </MapLibreMap>
          )}
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
  fill: { ...StyleSheet.absoluteFillObject },
}));
