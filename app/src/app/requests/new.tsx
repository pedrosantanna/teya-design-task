import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { ASK_ORIGIN, ASK_ORIGIN_REQUESTS, ChatBubble, ChatGestureArea, ChatScroll, Chip, Composer, composerInset, Ground, ListRow, NavBar, Sheet, TypingIndicator, navigateWith, screenMargin, useNavBarHeight } from '@/design-system';
import { LocationSheet } from '@/screens/LocationSheet';
import { OFF_SCRIPT_REPLY, TYPING_MS, matchAsk, scriptedAsks, shopById, sim, useApp, useAppActions, useContent, useSim } from '@/store';

const SUGGESTIONS = ['Eclipse glasses near me, today', 'A fan I can collect after work', "Sourdough from Rossi's every Friday"];
// What Snuffle does, said once, instead of a greeting (craft-pass-2).
const OPENING = "Tell me what you need and by when. I'll ask the shops within a short walk and bring back who has it.";
// Links the composer's field to the gesture area, so an interactive dismiss starts once the finger reaches the
// composer (its field and chips row, about two field heights), not the keyboard (iMessage).
const COMPOSER_ID = 'new-request-composer';
// The deadline chip's choices; "Any time" until the shopper picks one or the text names one ("…, today").
const DEADLINES = ['Any time', 'Today', 'After work', 'This weekend'];
const SPLIT_REPLY = 'Glasses today and a cake for Saturday go to different shops. Shall I make them two requests, so each gets its own answers?';


/** "By 4pm" from "…before 4pm" or "…by 4:30pm"; "Today" from "today". */
function deadlineFrom(text: string): string | null {
  const time = /\b(?:by|before)\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i.exec(text);
  if (time) return `By ${time[1].replace(/\s+/g, '').toLowerCase()}`;
  if (/\btoday\b/i.test(text)) return 'Today';
  if (/\bafter work\b|finish work/i.test(text)) return 'After work';
  return null;
}

// The Ask screen (v7 frames "Ask" and "Snuffle suggests two requests"; craft-pass-2): Snuffle's opening bubble
// with three suggestions, the composer with the place and deadline chips, and Snuffle's reply when the text isn't one
// request. A chat's neutral ground and "New request" in the bar: Snuffle is named once, by its sender line. The two
// chips are values already set, drawn alike with a chevron: the place opens the location sheet (its walking
// distance), the deadline a short list; the deadline also follows the text ("…, today").
// The composer grows out of Nearby's ask bar as the keyboard rises.
export default function NewRequest() {
  const { theme } = useUnistyles();
  // Opened from the Requests list's bar or from Nearby's: the composer grows from that bar and folds back into it.
  const fromRequests = useLocalSearchParams<{ from?: string }>().from === 'requests';
  const origin = fromRequests ? ASK_ORIGIN_REQUESTS : ASK_ORIGIN;
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const top = useNavBarHeight();
  const content = useContent();
  const draft = useApp('draft');
  const { set } = useAppActions();
  const sent = useSim((s) => s.composeText);
  const shop = draft?.shopId ? shopById(content, draft.shopId) : undefined;
  const [text, setText] = useState(draft?.text ?? '');
  const radius = useApp('radius');
  const [placeOpen, setPlaceOpen] = useState(false);
  const [deadlineOpen, setDeadlineOpen] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const margin = screenMargin(theme, frame.width);
  // The shopper's pick wins; else, while typing, from the field; once sent, from what was sent ("Today" for "…, today").
  const deadline = picked ?? deadlineFrom(text || sent || '') ?? DEADLINES[0];

  const send = (value: string) => {
    const words = shop && !value.toLowerCase().includes(shop.name.toLowerCase()) ? `${value} from ${shop.name}` : value;
    set({ draft: null });
    setText('');
    if (matchAsk(words) === 'active') sim.startRequest(words);
    else sim.compose(words);
  };

  return (
    <Ground value="chat">
    <View style={styles.screen}>
      {/* Keyboard (react-native-keyboard-controller): the composer rides on the keyboard frame by frame on the UI
          thread (KeyboardStickyView), the conversation's padding grows with it so the last message stays above the
          composer (KeyboardChatScrollView), and dragging the conversation down takes the keyboard with the finger.
          With the keyboard open the home-indicator inset is dropped, so the composer sits a step above the keys. */}
      <ChatGestureArea style={styles.fill} interpolator="ios" offset={theme.size.field * 2} textInputNativeID={COMPOSER_ID}>
        <ChatScroll
          style={styles.fill}
          offset={insets.bottom}
          keyboardLiftBehavior="whenAtEnd"
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content(margin, top, composerInset(insets.bottom, theme))}
        >
          {sent ? (
            <Conversation key={sent} text={sent} />
          ) : (
            <View>
              <ChatBubble sender="snuffle" text={shop ? `What would you like to ask ${shop.name}? I'll send it to them and tell you when they answer.` : OPENING} />
              <View style={styles.replyChips} accessibilityLabel="Suggestions">
                {SUGGESTIONS.map((s) => (
                  <Chip key={s} kind="suggestion" label={s} onPress={send} />
                ))}
              </View>
            </View>
          )}
        </ChatScroll>
      </ChatGestureArea>
      <KeyboardStickyView style={styles.composer(margin, composerInset(insets.bottom, theme))} offset={{ opened: composerInset(insets.bottom, theme) }}>
        <Composer
          value={text}
          onChangeText={setText}
          onSend={send}
          mark
          morphFrom={origin}
          autoFocus={!sent}
          nativeID={COMPOSER_ID}
          placeholder={shop ? `Ask ${shop.name}` : 'Ask for anything nearby'}
          chips={
            <>
              <Chip kind="menu" label={`Within ${radius} min`} onPress={() => setPlaceOpen(true)} />
              <Chip kind="menu" label={deadline} onPress={() => setDeadlineOpen(true)} />
            </>
          }
        />
      </KeyboardStickyView>
      <NavBar
        title="New request"
        fill="chat"
        leading="back"
        backLabel={fromRequests ? 'Requests' : 'Nearby'}
        onLeading={() => {
          sim.compose(null);
          set({ draft: null });
          // Back the way it came: the composer folds into the ask bar while the screen crossfades.
          if (router.canGoBack()) navigateWith('unmorph', () => router.back(), origin);
          else router.navigate('/');
        }}
      />
      <LocationSheet open={placeOpen} onClose={() => setPlaceOpen(false)} />
      <Sheet open={deadlineOpen} onClose={() => setDeadlineOpen(false)} title="By when?">
        <View>
          {DEADLINES.map((d, i) => (
            <ListRow
              key={d}
              id={d}
              title={d}
              selected={deadline === d}
              position={i === 0 ? 'first' : i === DEADLINES.length - 1 ? 'last' : 'middle'}
              onPress={(value) => {
                setPicked(value);
                setDeadlineOpen(false);
              }}
            />
          ))}
        </View>
      </Sheet>
    </View>
    </Ground>
  );
}

function Conversation({ text }: { text: string }) {
  const [shown, setShown] = useState<string | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => setShown(text), TYPING_MS);
    return () => clearTimeout(timer);
  }, [text]);
  const split = matchAsk(text) === 'split';
  const replied = shown === text;
  const glasses = text.split(/,?\s+and\s+/i)[0];
  return (
    <View>
      <ChatBubble sender="shopper" text={text} animateIn />
      {replied ? (
        <>
          <ChatBubble sender="snuffle" gap="newSender" text={split ? SPLIT_REPLY : OFF_SCRIPT_REPLY} animateIn />
          <View style={styles.replyChips}>
            {split ? (
              <>
                <Chip kind="suggestion" label="Split into 2" onPress={() => sim.startRequest(glasses)} />
                <Chip kind="suggestion" label="Keep as one" onPress={() => sim.startRequest(text)} />
              </>
            ) : (
              scriptedAsks().map((s) => (
                <Chip key={s} kind="suggestion" label={s} onPress={() => (matchAsk(s) === 'active' ? sim.startRequest(s) : sim.compose(s))} />
              ))
            )}
          </View>
        </>
      ) : (
        <TypingIndicator gap="newSender" />
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  // A chat's neutral ground: Card in light mode, Background in dark (colour.md, Snuffle).
  screen: { flex: 1, backgroundColor: theme.color.chat.ground },
  fill: { flex: 1 },
  content: (margin: number, top: number, bottom: number) => ({
    paddingHorizontal: margin,
    paddingTop: top + theme.space[4],
    paddingBottom: bottom + theme.size.field * 2 + theme.clearance.askBar,
  }),
  replyChips: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.space[2], marginTop: theme.space[2] },
  composer: (margin: number, bottom: number) => ({ position: 'absolute', left: margin, right: margin, bottom: bottom + theme.space[2] }),
}));
