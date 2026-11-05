// Web shortcut: `D` opens or closes the panel (and brings back a hidden debugger). Ignored while typing in a field or with a modifier held.
import { useEffect } from 'react';
import { Platform } from 'react-native';

import { useDebugger } from './visibility';

function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}

export function useDebugShortcut() {
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'd' && event.key !== 'D') return;
      if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
      if (isTyping(event.target) || isTyping(document.activeElement)) return;
      event.preventDefault();
      const { hidden, open, setOpen, toggleHidden } = useDebugger.getState();
      if (hidden) {
        toggleHidden();
        setOpen(true);
      } else {
        setOpen(!open);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
}
