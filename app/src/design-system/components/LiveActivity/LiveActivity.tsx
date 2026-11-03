import { memo } from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { FloatingSurface } from '../../internal/FloatingSurface';
import { cornerCurve } from '../../theme';
import { SnuffleMark } from '../SnuffleMark/SnuffleMark';
import { Text } from '../Text/Text';

export type LiveActivityProps = {
  /** The request name: "Eclipse glasses". */
  title: string;
  /** The request's status label without its deadline: "2 shops have them". */
  status: string;
  /** "by 4pm" */
  deadline?: string;
  /** Shops that have answered, out of `asked`; drawn as a segmented bar. */
  answered: number;
  asked: number;
};

/**
 * A request's live status on the lock screen (components.md, Notification and Live Activity): a Live
 * Activity on iOS, a Live Update (an ongoing notification before Android 16) on Android. Simulated
 * (decision 038); the status words come from the state table, as on the request row.
 */
export const LiveActivity = memo(function LiveActivity({ title, status, deadline, answered, asked }: LiveActivityProps) {
  // The platform form follows the theme; the React Compiler would keep the first one, since the theme object stays the same.
  'use no memo';
  const { theme } = useUnistyles();
  const ios = theme.platform === 'ios';
  const segments = Array.from({ length: asked }, (_, i) => i < answered);
  const label = `${title}, ${status}${deadline ? `, ${deadline}` : ''}, ${answered} of ${asked} shops answered`;

  if (!ios) {
    // Android: an ongoing notification (a Live Update from Android 16) with a determinate progress bar.
    return (
      <FloatingSurface style={styles.card(false)}>
        <View accessible accessibilityLabel={label} style={styles.body}>
          <View style={styles.header}>
            <SnuffleMark size="inline" />
            <Text variant="caption1" color="mutedForeground" numberOfLines={1}>
              {`Snuffle · ${answered} of ${asked} answered${deadline ? ` · ${deadline}` : ''}`}
            </Text>
          </View>
          <View style={styles.grow}>
            <Text variant="subheadlineStrong" numberOfLines={1}>
              {title}
            </Text>
            <Text variant="subheadline" numberOfLines={1}>
              {status}
            </Text>
          </View>
          <View style={styles.track}>
            <View style={styles.progress(asked > 0 ? answered / asked : 0)} />
          </View>
        </View>
      </FloatingSurface>
    );
  }

  return (
    <FloatingSurface style={styles.card(true)}>
      <View accessible accessibilityLabel={label} style={styles.body}>
        <View style={styles.row}>
          <SnuffleMark size="icon" />
          <View style={styles.grow}>
            <Text variant="headline" numberOfLines={1}>
              {title}
            </Text>
            <Text variant="subheadline" color="mutedForeground" numberOfLines={1}>
              {status}
            </Text>
          </View>
          {deadline ? (
            <Text variant="subheadline" color="mutedForeground">
              {deadline}
            </Text>
          ) : null}
        </View>
        <View style={styles.bar}>
          {segments.map((on, i) => (
            <View key={i} style={styles.segment(on)} />
          ))}
        </View>
      </View>
    </FloatingSurface>
  );
});

const styles = StyleSheet.create((theme) => ({
  card: (ios: boolean) => ({
    ...cornerCurve,
    borderRadius: ios ? theme.radius.bubble : theme.radius.card,
    padding: theme.space[4],
  }),
  body: { gap: theme.space[3] },
  row: { flexDirection: 'row', alignItems: 'center', gap: theme.space[3] },
  grow: { flex: 1, gap: theme.space[1] / 2 },
  header: { flexDirection: 'row', alignItems: 'center', gap: theme.space[2] },
  bar: { flexDirection: 'row', gap: theme.space[1] },
  // Material linear progress indicator: a rounded track with a determinate fill, in Snuffle's Lavender (it is Snuffle reporting).
  track: { height: theme.space[1], borderRadius: theme.radius.full, backgroundColor: theme.color.snuffle.bubble, overflow: 'hidden' },
  progress: (share: number) => ({ width: `${Math.round(share * 100)}%`, height: '100%', borderRadius: theme.radius.full, backgroundColor: theme.color.snuffle.dot }),
  segment: (on: boolean) => ({
    flex: 1,
    height: theme.space[1],
    borderRadius: theme.radius.full,
    backgroundColor: on ? theme.color.snuffle.dot : theme.color.snuffle.bubble,
  }),
}));
