import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { Map } from '../Map/Map';
import { Text } from '../Text/Text';
import { LargeTitle, NavBar, useNavBarHeight, useNavBarScroll } from './NavBar';

const ROWS = Array.from({ length: 14 }, (_, i) => `Request ${i + 1}`);

function Rows() {
  return (
    <>
      {ROWS.map((r) => (
        <Text key={r} variant="body" color="mutedForeground">
          {r}
        </Text>
      ))}
    </>
  );
}

function LargeDemo() {
  const scroll = useNavBarScroll();
  const top = useNavBarHeight(0);
  return (
    <View style={styles.frame}>
      <Animated.ScrollView onScroll={scroll.onScroll} scrollEventThrottle={16} contentContainerStyle={styles.content(top)}>
        <LargeTitle title="Requests" scroll={scroll} />
        <Rows />
      </Animated.ScrollView>
      <NavBar title="Requests" mode="large" scroll={scroll} topInset={0} trailing={[{ icon: 'more', label: 'More' }]} />
    </View>
  );
}

function InlineDemo() {
  const scroll = useNavBarScroll();
  const top = useNavBarHeight(0);
  return (
    <View style={styles.frame}>
      <Animated.ScrollView onScroll={scroll.onScroll} scrollEventThrottle={16} contentContainerStyle={styles.content(top)}>
        <Rows />
      </Animated.ScrollView>
      <NavBar title="Eclipse glasses" leading="back" backLabel="Requests" scroll={scroll} topInset={0} trailing={[{ icon: 'more', label: 'More' }]} />
    </View>
  );
}

function RevealDemo() {
  const scroll = useNavBarScroll(true);
  return (
    <View style={styles.frame}>
      <Animated.ScrollView onScroll={scroll.onScroll} scrollEventThrottle={16}>
        <View style={styles.map}>
          <Map />
        </View>
        <View style={styles.card}>
          <Text variant="displayTitle">Paper & Co</Text>
          <Rows />
        </View>
      </Animated.ScrollView>
      <NavBar title="Paper & Co" mode="reveal" revealAt={200} leading="close" hideOnScroll scroll={scroll} topInset={0} trailing={[{ icon: 'share', label: 'Share' }]} />
    </View>
  );
}

// Scroll inside each frame: large title collapsing, inline with Back, and the shop page's bar that reveals its title and hides on scroll down.
export function NavBarExamples() {
  return (
    <View style={styles.list}>
      <LargeDemo />
      <InlineDemo />
      <RevealDemo />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.gap.block },
  frame: {
    height: theme.size.thumb.request * 5,
    borderRadius: theme.radius.inner,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.color.border,
    overflow: 'hidden',
    backgroundColor: theme.color.background,
  },
  content: (top: number) => ({ paddingTop: top, paddingHorizontal: theme.space[4], gap: theme.space[3], paddingBottom: theme.space[8] }),
  map: { height: theme.size.thumb.request * 4 },
  card: {
    marginTop: -theme.radius.sheet,
    borderTopLeftRadius: theme.radius.sheet,
    borderTopRightRadius: theme.radius.sheet,
    backgroundColor: theme.color.card,
    padding: theme.inset.sheet,
    gap: theme.space[3],
  },
}));
