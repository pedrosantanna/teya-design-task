// Haptics per platforms.md. iOS uses expo-haptics' feedback calls, Android the HapticFeedbackConstants
// through performAndroidHapticsAsync, the web has none.
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export type HapticKind = 'selection' | 'primary' | 'success' | 'warning';

const android: Record<HapticKind, Haptics.AndroidHaptics> = {
  selection: Haptics.AndroidHaptics.Segment_Tick,
  primary: Haptics.AndroidHaptics.Context_Click,
  success: Haptics.AndroidHaptics.Confirm,
  warning: Haptics.AndroidHaptics.Reject,
};

export function haptic(kind: HapticKind): void {
  if (Platform.OS === 'web') return;
  const ignore = () => undefined;
  if (Platform.OS === 'android') {
    Haptics.performAndroidHapticsAsync(android[kind]).catch(ignore);
    return;
  }
  switch (kind) {
    case 'selection':
      Haptics.selectionAsync().catch(ignore);
      return;
    case 'primary':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(ignore);
      return;
    case 'success':
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(ignore);
      return;
    case 'warning':
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(ignore);
  }
}
