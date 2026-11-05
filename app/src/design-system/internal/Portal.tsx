// A small portal: content rendered through <Portal> appears in the host that SheetProvider puts at the
// root of the app, inside the device frame on the web, above every screen.
import { createContext, Fragment, useCallback, useContext, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Platform, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import type { ViewRef } from './origins';
import { useOverlayOpen } from './overlay';

type SetNode = (id: string, node: ReactNode | null) => void;

const PortalContext = createContext<SetNode | null>(null);

export function PortalHost({ children }: { children: ReactNode }) {
  const [nodes, setNodes] = useState<[string, ReactNode][]>([]);
  // Stable, so a Portal's effect doesn't run again on every host render.
  const set = useCallback<SetNode>(
    (id, node) =>
      setNodes((prev) => {
        if (node == null) return prev.filter(([key]) => key !== id);
        const at = prev.findIndex(([key]) => key === id);
        if (at < 0) return [...prev, [id, node]];
        const next = prev.slice();
        next[at] = [id, node];
        return next;
      }),
    [],
  );
  // While a sheet or the photo viewer is open, the page behind is hidden from VoiceOver, TalkBack and the web's
  // accessibility tree and keyboard focus (`inert`); the overlays render in the host below, a sibling.
  const behind = useOverlayOpen();
  const page = useRef<ViewRef>(null);
  useEffect(() => {
    // React Native Web drops `inert`, so the DOM node gets it directly.
    const node = page.current as unknown as { toggleAttribute?: (name: string, force: boolean) => void } | null;
    if (Platform.OS === 'web') node?.toggleAttribute?.('inert', behind);
  }, [behind]);
  return (
    <PortalContext.Provider value={set}>
      <View ref={page} style={styles.page} importantForAccessibility={behind ? 'no-hide-descendants' : 'auto'} accessibilityElementsHidden={behind} aria-hidden={behind || undefined}>
        {children}
      </View>
      <View pointerEvents="box-none" style={styles.host}>
        {nodes.map(([id, node]) => (
          <Fragment key={id}>{node}</Fragment>
        ))}
      </View>
    </PortalContext.Provider>
  );
}

export function Portal({ children }: { children: ReactNode }) {
  const set = useContext(PortalContext);
  const id = useId();
  useEffect(() => {
    set?.(id, children);
  }, [set, id, children]);
  useEffect(() => () => set?.(id, null), [set, id]);
  // Without a host (a test or a screen outside the root), render in place.
  return set ? null : <>{children}</>;
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  host: { ...StyleSheet.absoluteFillObject, zIndex: 100 },
});
