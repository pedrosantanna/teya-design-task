// The panel: web-only prototype chrome. On windows wide enough for the phone frame it is docked on the right,
// full height, beside the frame (never over it); on narrow windows it overlays from the right with a close button.
// Plain DOM styled by panel.css, like the docs site's panels; native builds never mount it.
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

import './chrome';
import { ActionsSection, ContentSection, JourneySection, ShopperSection, SimulationSection, StatesSection } from './sections';
import { screenNames, useRelevance } from './relevance';
import { useDebugger } from './visibility';

export function DebugPanel({ docked = false }: { docked?: boolean }) {
  const visible = useDebugger((s) => s.open && !s.hidden);
  const hidden = useDebugger((s) => s.hidden);
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

  // The panel stays mounted while the debugger is shown, so opening and closing can slide (panel.css): docked, its
  // column widens and the phone frame refits beside it; as an overlay, it slides in from the right.
  if (Platform.OS !== 'web' || hidden) return null;
  return (
    <aside
      className={`dbg dbg-panel ${docked ? 'is-docked' : 'is-overlay'}${visible ? ' is-open' : ''}`}
      data-scheme={theme.scheme}
      aria-label="State debugger"
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="dbg-head">
        <h2 className="dbg-title">State debugger</h2>
        <button type="button" className="dbg-iconbtn" aria-label="Close the state debugger" onClick={() => setOpen(false)}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      </div>
      <Controls />
    </aside>
  );
}

/**
 * The sections, for the screen showing now. Only the controls that change this screen show; the rest are named in
 * one line per section, and a section where none applies folds to its title. It follows the route and the sheets live.
 */
function Controls() {
  const { screen, on } = useRelevance();
  return (
    <>
      <p className="dbg-where" aria-live="polite">
        Controls for <b>{screenNames[screen]}</b>
      </p>
      <div className="dbg-body">
        <JourneySection />
        <ShopperSection />
        <StatesSection on={on} />
        <ContentSection on={on} />
        <SimulationSection on={on} />
        <ActionsSection />
      </div>
    </>
  );
}
