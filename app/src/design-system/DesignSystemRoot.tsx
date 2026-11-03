// Wraps the app once, inside the device frame: loads Gambetta and Switzer before text renders, and hosts
// sheets so they present inside the frame.
import type { ReactNode } from 'react';

import { SheetProvider } from './components/Sheet/Sheet';
import { useDesignSystemFonts } from './theme/fonts';

export function DesignSystemRoot({ children }: { children: ReactNode }) {
  const ready = useDesignSystemFonts();
  if (!ready) return null;
  return <SheetProvider>{children}</SheetProvider>;
}
