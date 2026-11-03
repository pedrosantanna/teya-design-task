// Layout animations (entering and exiting) driven by the spring tokens. iOS springs are written as
// duration and bounce, Android's as Material stiffness and damping (motion.md), so the builder is set
// from whichever form the active theme has.
import type { ComplexAnimationBuilder } from 'react-native-reanimated';

import type { AppTheme } from '../theme';

type Spring = AppTheme['spring'][keyof AppTheme['spring']];

/** Pass an instance: `withSpringToken(new FadeIn(), theme.spring.fade)`. */
export function withSpringToken<T extends ComplexAnimationBuilder>(builder: T, spring: Spring): T {
  const b = builder.springify() as T;
  if ('duration' in spring) return b.duration(spring.duration).dampingRatio(spring.dampingRatio) as T;
  return b.stiffness(spring.stiffness).damping(spring.damping).mass(spring.mass) as T;
}
