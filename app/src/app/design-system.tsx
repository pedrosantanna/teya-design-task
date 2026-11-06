import { router } from 'expo-router';
import type { ComponentType } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, UnistylesRuntime, useUnistyles } from 'react-native-unistyles';

import {
  AlertExamples,
  AnswerCardExamples,
  AnswerRowExamples,
  AvatarExamples,
  Button,
  ButtonExamples,
  CategoryCardExamples,
  ChatBubbleExamples,
  CheckboxExamples,
  CloseButtonExamples,
  AreaRowExamples,
  GlassButtonExamples,
  ConfirmButtonExamples,
  BottomAccessoryExamples,
  TextFieldExamples,
  ZoomOriginExamples,
  ZoomSourceExamples,
  CollectionCodeExamples,
  ComposerExamples,
  DockExamples,
  FloatingButtonExamples,
  IconExamples,
  IllustrationExamples,
  ListRowExamples,
  LiveActivityExamples,
  NotificationExamples,
  PaymentSheetExamples,
  ProductSummaryExamples,
  ShopMetaExamples,
  RatingSheetExamples,
  RatingSummaryExamples,
  ReliabilityRowExamples,
  ReviewCardExamples,
  MapExamples,
  NavBarExamples,
  OrderCardExamples,
  RequestRowExamples,
  SegmentedControlExamples,
  SelectExamples,
  SheetExamples,
  ShopPageLayoutExamples,
  PhotoCarouselExamples,
  LightboxExamples,
  ShopRowExamples,
  ShopTileExamples,
  SkeletonExamples,
  SnuffleMarkExamples,
  SnuffleSniffExamples,
  PhotoPickerSheetExamples,
  ChatEntryExamples,
  MarkIntroExamples,
  PageDotsExamples,
  SignInButtonExamples,
  StepperExamples,
  SwitchExamples,
  TagExamples,
  Text,
  TextExamples,
  ToastExamples,
  TypingIndicatorExamples,
  screenMargin,
  themeName,
} from '@/design-system';

type Section = { title: string; Examples: ComponentType; bleed?: boolean };

// Every component and its variants, in the order of the Components page.
const sections: Section[] = [
  { title: 'Text', Examples: TextExamples },
  { title: 'Icon', Examples: IconExamples },
  { title: 'Button', Examples: ButtonExamples },
  { title: 'Tags', Examples: TagExamples },
  { title: 'Answer card', Examples: AnswerCardExamples },
  { title: 'Category card', Examples: CategoryCardExamples },
  { title: 'Illustration', Examples: IllustrationExamples },
  { title: 'Answer row', Examples: AnswerRowExamples },
  { title: 'Order card', Examples: OrderCardExamples },
  { title: 'Snuffle mark', Examples: SnuffleMarkExamples },
  { title: 'Snuffle sniffing', Examples: SnuffleSniffExamples },
  { title: 'Photo picker sheet', Examples: PhotoPickerSheetExamples },
  { title: 'Chat entry', Examples: ChatEntryExamples },
  { title: 'Mark intro (splash)', Examples: MarkIntroExamples },
  { title: 'Chat bubble', Examples: ChatBubbleExamples },
  { title: 'Typing indicator', Examples: TypingIndicatorExamples },
  { title: 'Ask bar and composer', Examples: ComposerExamples },
  { title: 'Dock', Examples: DockExamples },
  { title: 'Shop tile', Examples: ShopTileExamples },
  { title: 'Shop row', Examples: ShopRowExamples },
  { title: 'List row', Examples: ListRowExamples },
  { title: 'Avatar', Examples: AvatarExamples },
  { title: 'Request row', Examples: RequestRowExamples, bleed: true },
  { title: 'Sheet', Examples: SheetExamples },
  { title: 'Payment sheet (simulated)', Examples: PaymentSheetExamples },
  { title: 'Alert', Examples: AlertExamples },
  { title: 'Page dots', Examples: PageDotsExamples },
  { title: 'Sign in button', Examples: SignInButtonExamples },
  { title: 'Nav bar', Examples: NavBarExamples },
  { title: 'Stepper', Examples: StepperExamples },
  { title: 'Segmented control', Examples: SegmentedControlExamples },
  { title: 'Collection code', Examples: CollectionCodeExamples },
  { title: 'Toast and snackbar', Examples: ToastExamples },
  { title: 'Notification (simulated)', Examples: NotificationExamples },
  { title: 'Live Activity (simulated)', Examples: LiveActivityExamples },
  { title: 'Close button', Examples: CloseButtonExamples },
  { title: 'Area row', Examples: AreaRowExamples },
  { title: 'Glass button', Examples: GlassButtonExamples },
  { title: 'Confirm button', Examples: ConfirmButtonExamples },
  { title: 'Bottom accessory', Examples: BottomAccessoryExamples },
  { title: 'Text field', Examples: TextFieldExamples },
  { title: 'Zoom origin (sheet grows from it)', Examples: ZoomOriginExamples },
  { title: 'Zoom source (screen zooms from it)', Examples: ZoomSourceExamples },
  { title: 'Map', Examples: MapExamples },
  { title: 'Shop page header', Examples: ShopPageLayoutExamples, bleed: true },
  { title: 'Photo carousel', Examples: PhotoCarouselExamples },
  { title: 'Photo viewer', Examples: LightboxExamples },
  { title: 'Shop meta', Examples: ShopMetaExamples },
  { title: 'Product summary', Examples: ProductSummaryExamples },
  { title: 'Reliability row', Examples: ReliabilityRowExamples },
  { title: 'Rating summary', Examples: RatingSummaryExamples },
  { title: 'Review card', Examples: ReviewCardExamples },
  { title: 'Rating sheet', Examples: RatingSheetExamples },
  { title: 'Skeleton', Examples: SkeletonExamples },
  { title: 'Prototype tools: switch', Examples: SwitchExamples },
  { title: 'Prototype tools: checkbox', Examples: CheckboxExamples },
  { title: 'Prototype tools: select', Examples: SelectExamples },
  {
    title: 'Prototype tools: floating button',
    Examples: FloatingButtonExamples,
  },
];

export default function DesignSystemGallery() {
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const margin = screenMargin(theme, frame.width);
  const choice = (on: boolean) => (on ? 'filled' : 'tonal');
  const setPlatform = (platform: 'ios' | 'android') => UnistylesRuntime.setTheme(themeName(platform, theme.scheme));
  const setScheme = (scheme: 'light' | 'dark') => UnistylesRuntime.setTheme(themeName(theme.platform, scheme));

  return (
    // The background sits on a View: on the web the ScrollView's own style doesn't take the theme.
    <View style={styles.scroll}>
      <ScrollView contentContainerStyle={styles.content(margin, insets.top, insets.bottom)}>
        <Button label="Back" role="plain" size="compact" onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))} />
        <View style={styles.group}>
          <Text variant="title1" accessibilityRole="header">
            Design system
          </Text>
          <Text variant="footnote" color="mutedForeground">{`Theme: ${theme.name}`}</Text>
          <View style={styles.row}>
            <Button label="iOS" size="compact" role={choice(theme.platform === 'ios')} onPress={() => setPlatform('ios')} />
            <Button label="Android" size="compact" role={choice(theme.platform === 'android')} onPress={() => setPlatform('android')} />
            <Button label="Light" size="compact" role={choice(theme.scheme === 'light')} onPress={() => setScheme('light')} />
            <Button label="Dark" size="compact" role={choice(theme.scheme === 'dark')} onPress={() => setScheme('dark')} />
          </View>
        </View>
        {sections.map(({ title, Examples, bleed }) => (
          <View key={title} style={styles.group}>
            <Text variant="title3" accessibilityRole="header">
              {title}
            </Text>
            <View style={bleed ? styles.bleed(margin) : undefined}>
              <Examples />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  scroll: { flex: 1, backgroundColor: theme.color.background },
  content: (margin: number, top: number, bottom: number) => ({
    paddingHorizontal: margin,
    paddingTop: top + theme.space[2],
    paddingBottom: bottom + theme.space[8],
    gap: theme.gap.section,
  }),
  group: { gap: theme.space[2] },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.space[2] },
  bleed: (margin: number) => ({ marginHorizontal: -margin }),
}));
