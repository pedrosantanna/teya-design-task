// The small button at the top right that opens the panel. Hidden with the debugger, and while the panel is open.
import { Platform } from 'react-native';

import './chrome';
import { useChromeScheme } from '@/store';

import { useDebugger } from './visibility';

export function DebugToggle() {
  const show = useDebugger((s) => !s.hidden && !s.open);
  const setOpen = useDebugger((s) => s.setOpen);
  // The debugger is prototype chrome: it follows the docs' theme, not the app's.
  const chrome = useChromeScheme((s) => s.scheme);
  if (Platform.OS !== 'web' || !show) return null;
  return (
    <button type="button" className="dbg dbg-toggle" data-scheme={chrome} aria-label="Open the state debugger" onClick={() => setOpen(true)}>
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M2 4.5h7M12 4.5h2M2 11.5h2M7 11.5h7" />
        <circle cx="10.5" cy="4.5" r="1.5" />
        <circle cx="5.5" cy="11.5" r="1.5" />
      </svg>
    </button>
  );
}
