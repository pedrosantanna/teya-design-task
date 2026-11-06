// The panel: web-only prototype chrome. On windows wide enough for the phone frame it is docked on the right,
// full height, beside the frame (never over it); on narrow windows it overlays from the right with a close button.
// Plain DOM styled by panel.css, like the docs site's panels; native builds never mount it.
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

import './chrome';
import { ActionsSection, ContentSection, JourneySection, ShopperSection, SimulationSection, StatesSection } from './sections';
import { useDebugger } from './visibility';

export function DebugPanel({ docked = false }: { docked?: boolean }) {
  const visible = useDebugger((s) => s.open && !s.hidden);
  const setOpen = useDebugger((s) => s.setOpen);
  const { theme } = useUnistyles();

  // The overlay closes with Escape.
  useEffect(() => {
    if (Platform.OS !== 'web' || !visible || docked) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, docked, setOpen]);

  if (Platform.OS !== 'web' || !visible) return null;
  return (
    <aside className={`dbg dbg-panel ${docked ? 'is-docked' : 'is-overlay'}`} data-scheme={theme.scheme} aria-label="State debugger">
      <div className="dbg-head">
        <h2 className="dbg-title">State debugger</h2>
        <button type="button" className="dbg-iconbtn" aria-label="Close the state debugger" onClick={() => setOpen(false)}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      </div>
      <div className="dbg-body">
        <JourneySection />
        <ShopperSection />
        <StatesSection />
        <ContentSection />
        <SimulationSection />
        <ActionsSection />
      </div>
    </aside>
  );
}
