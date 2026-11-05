import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import {
  Chip,
  Composer,
  Dock,
  Illustration,
  LargeTitle,
  NavBar,
  RequestRow,
  Text,
  Toast,
  ZoomTarget,
  screenMargin,
  useNavBarHeight,
  useNavBarScroll,
  type PhotoSource,
  type RequestRowShop,
  type ShopAccentName,
  type StatusTone,
} from '@/design-system';
import { imageSource } from '@/content/images';
import { requestFilter, shopAccent, shopById, sim, twelveHour, useActiveRequestRow, useApp, useContent, useSim } from '@/store';

type Filter = 'All' | 'Needs you' | 'Looking' | 'Waiting' | 'Done';
const FILTERS: Filter[] = ['All', 'Needs you', 'Looking', 'Waiting', 'Done'];
const EMPTY: Record<Filter, string> = {
  All: 'Ask for anything nearby and your requests will show here.',
  'Needs you': 'Nothing needs you right now.',
  Looking: "Snuffle isn't looking for anything right now.",
  Waiting: 'No orders are waiting right now.',
  Done: 'Nothing is done yet.',
};

type Row = {
  id: string;
  name: string;
  time: string;
  preview: string;
  status: string;
  tone: StatusTone;
  filter: Exclude<Filter, 'All'>;
  image: PhotoSource;
  accent?: ShopAccentName;
  logos: RequestRowShop[];
  unread: number;
  action?: string;
};

// Requests, full screen (v7 frame "Requests"): every request as a row with one status label, filters that
// group the states, and the ask bar. Zooms open from the round Requests button on Nearby (decision 026, iOS 26
// patterns): the native zoom with its interactive dismiss on iOS, a view transition on the web, a container
// transform on Android. A request's chat pushes from the side.
export default function Requests() {
  const { theme } = useUnistyles();
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const content = useContent();
  const scroll = useNavBarScroll();
  const top = useNavBarHeight();
  const request = useApp('request');
  const order = useApp('order');
  const answers = useApp('answers');
  const stage = useSim((s) => s.stage);
  const active = useActiveRequestRow();
  const [filter, setFilter] = useState<Filter>('All');
  const [closed, setClosed] = useState<string[]>([]);
  const [undo, setUndo] = useState<string | null>(null);
  const margin = screenMargin(theme, frame.width);

  const rows: Row[] = [];
  if (active && (request !== 'none' || stage !== 'none')) {
    const logos = content.active.offers
      .filter((o) => answers[o.shopId] && answers[o.shopId] !== 'asked' && answers[o.shopId] !== 'seen' && answers[o.shopId] !== 'doesntHave')
      .slice(0, 3)
      .map((o) => shopById(content, o.shopId))
      .flatMap((s) => (s ? [{ name: s.name, accent: shopAccent(s) }] : []));
    rows.push({
      id: content.active.id,
      name: content.active.title,
      time: content.id === 'sam' ? '1:12pm' : '12:30pm',
      preview: active.preview,
      status: active.status,
      tone: active.tone,
      filter: requestFilter(request === 'none' ? 'asking' : request, order),
      image: imageSource(content.active.image, 56),
      accent: order !== 'none' ? shopAccent(shopById(content, content.order.shopId)) : undefined,
      logos,
      unread: active.unread,
    });
  }
  for (const r of content.others) {
    rows.push({
      id: r.id,
      name: r.title,
      time: twelveHour(r.when),
      preview: r.preview,
      status: r.label,
      tone: r.state === 'needsYou' ? 'needsYou' : r.state === 'collected' ? 'success' : 'default',
      filter: r.state === 'collected' ? 'Done' : requestFilter(r.state, 'none'),
      image: imageSource(r.image, 56),
      logos: [],
      unread: r.state === 'needsYou' ? 1 : 0,
      action: r.action,
    });
  }
  const shown = rows
    .map((r) => (closed.includes(r.id) ? { ...r, status: 'Closed', tone: 'default' as const, filter: 'Done' as const, action: undefined, unread: 0 } : r))
    .filter((r) => filter === 'All' || r.filter === filter);
  const needsYou = rows.filter((r) => r.filter === 'Needs you' && !closed.includes(r.id)).length;

  const open = (id: string) => router.push({ pathname: '/requests/[id]', params: { id } });
  const close = (id: string) => {
    setClosed((c) => [...c, id]);
    setUndo(id);
  };

  return (
    <ZoomTarget>
    <View style={styles.screen}>
      <Animated.ScrollView onScroll={scroll.onScroll} scrollEventThrottle={16} contentContainerStyle={styles.content(top, insets.bottom)}>
        <View style={styles.pad(margin)}>
          <LargeTitle title="Requests" display scroll={scroll} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters(margin)}>
          {FILTERS.map((f) => (
            <Chip key={f} label={f} value={f} selected={filter === f} count={f === 'Needs you' && needsYou > 0 ? needsYou : undefined} onPress={(v) => setFilter(v as Filter)} />
          ))}
        </ScrollView>
        {shown.length === 0 ? (
          <View style={styles.empty(margin)}>
            {/* No requests yet: the crossroads (illustrations.md); a filtered list that's empty keeps to text. */}
            {filter === 'All' ? <Illustration name="crossroads" size="large" /> : null}
            <Text variant="subheadline" color="mutedForeground" align="center">
              {EMPTY[filter]}
            </Text>
          </View>
        ) : (
          <View>
            {shown.map((r) => (
              <RequestRow
                key={r.id}
                id={r.id}
                name={r.name}
                time={r.time}
                preview={r.preview}
                status={r.status}
                tone={r.tone}
                image={r.image}
                accent={r.accent}
                shopLogos={r.logos}
                unread={r.unread}
                actionLabel={r.action}
                onAction={open}
                onPress={open}
                onClose={closed.includes(r.id) ? undefined : close}
              />
            ))}
          </View>
        )}
      </Animated.ScrollView>
      <NavBar
        title="Requests"
        mode="large"
        leading="back"
        backLabel="Nearby"
        onLeading={() => (router.canGoBack() ? router.back() : router.navigate('/'))}
        scroll={scroll}
      />
      <Dock>
        <View style={styles.composer(margin)}>
        <Composer
          value=""
          onChangeText={() => undefined}
          placeholder="Ask for anything nearby"
          mark
          onFieldPress={() => {
            sim.compose(null);
            router.push('/requests/new');
          }}
        />
        </View>
      </Dock>
      <Toast
        visible={undo != null}
        message="Request closed"
        actionLabel="Undo"
        onAction={() => setClosed((c) => c.filter((id) => id !== undo))}
        onHide={() => setUndo(null)}
      />
    </View>
    </ZoomTarget>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: { flex: 1, backgroundColor: theme.color.background },
  // Proximity (spacing.md): 16 from the bar's controls to the large title, 16 from the title to the filters.
  content: (top: number, bottom: number) => ({
    paddingTop: top + theme.gap.title,
    paddingBottom: bottom + theme.space[3] + theme.size.field + theme.space[2] + theme.clearance.askBar,
    gap: theme.gap.title,
  }),
  pad: (margin: number) => ({ paddingHorizontal: margin }),
  filters: (margin: number) => ({ paddingHorizontal: margin, gap: theme.space[2] }),
  empty: (margin: number) => ({ paddingHorizontal: margin, paddingTop: theme.space[8], alignItems: 'center', gap: theme.space[4] }),
  composer: (margin: number) => ({ paddingHorizontal: margin }),
}));
