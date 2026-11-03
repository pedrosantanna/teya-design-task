import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { ASK_ORIGIN, ChatBubble, Chip, Composer, Ground, NavBar, TypingIndicator, navigateWith, screenMargin, useNavBarHeight } from '@/design-system';
import { OFF_SCRIPT_REPLY, TYPING_MS, matchAsk, scriptedAsks, shopById, sim, useApp, useAppActions, useContent, useSim } from '@/store';

const SUGGESTIONS = ['Eclipse glasses near me, today', 'A fan I can collect after work', "Sourdough from Rossi's every Friday"];
// What Snuffle does, said once, instead of a greeting (craft-pass-2).
const OPENING = "Tell me what you need and by when. I'll ask the shops within a short walk and bring back who has it.";
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
// with three suggestions, the composer with the place and deadline chips read from the text, and Snuffle's reply
// when the text isn't one request. A chat's neutral ground, "Snuffle" with the glyph in the bar, no tint or glow.
// The composer grows out of Nearby's ask bar as the keyboard rises.
export default function NewRequest() {
  const { theme, rt } = useUnistyles();
  const insets = useSafeAreaInsets();
  const top = useNavBarHeight();
  const content = useContent();
  const draft = useApp('draft');
  const { set } = useAppActions();
  const sent = useSim((s) => s.composeText);
  const shop = draft?.shopId ? shopById(content, draft.shopId) : undefined;
  const [text, setText] = useState(draft?.text ?? '');
  const [nearOnly, setNearOnly] = useState(true);
  const margin = screenMargin(theme, rt.screen.width);
  // While typing, from the field; once sent, from what was sent ("Today" for "…, today").
  const deadline = deadlineFrom(text || sent || '');

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
      <KeyboardAvoidingView style={styles.fill} behavior="padding">
        <ScrollView contentContainerStyle={styles.content(margin, top, insets.bottom)} keyboardShouldPersistTaps="handled">
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
        </ScrollView>
        <View style={styles.composer(margin, insets.bottom)}>
          <Composer
            value={text}
            onChangeText={setText}
            onSend={send}
            mark
            morphFrom={ASK_ORIGIN}
            autoFocus={!sent}
            placeholder={shop ? `Ask ${shop.name}` : 'Ask for anything nearby'}
            chips={
              <>
                <Chip label="Within 15 min" selected={nearOnly} onPress={() => setNearOnly((on) => !on)} />
                <Chip label={deadline ?? 'Any time'} selected={!!deadline} />
              </>
            }
          />
        </View>
      </KeyboardAvoidingView>
      <NavBar
        title="Snuffle"
        titleMark
        fill="chat"
        leading="back"
        backLabel="Nearby"
        onLeading={() => {
          sim.compose(null);
          set({ draft: null });
          // Back the way it came: the composer folds into the ask bar while the screen crossfades.
          if (router.canGoBack()) navigateWith('unmorph', () => router.back(), ASK_ORIGIN);
          else router.navigate('/');
        }}
      />
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
