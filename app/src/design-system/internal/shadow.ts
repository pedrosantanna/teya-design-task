// The delicate card shadow (colour.md, Surfaces; craft-pass-2): two soft layers, 0 1 2 at 4% and 0 4 12 at 5% of
// Foreground (light), for a Card surface that sits on the Background or on Card itself. React Native 0.76+ and the
// web both take `boxShadow` as a string. In dark mode the layers fall on a darker ground and all but vanish, which
// is intended: dark surfaces separate by lightness.
import type { AppTheme } from '../theme';
import { withAlpha } from '../theme';

export function cardShadow(theme: AppTheme): string {
  const near = withAlpha(theme.color.shadow, theme.state.cardShadow);
  const far = withAlpha(theme.color.shadow, theme.state.cardShadowFar);
  const one = theme.space[1] / 4;
  return `0 ${one}px ${2 * one}px ${near}, 0 ${theme.space[1]}px ${theme.space[3]}px ${far}`;
}
