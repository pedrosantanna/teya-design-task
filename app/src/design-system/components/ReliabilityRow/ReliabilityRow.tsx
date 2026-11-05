// One line of "How they do on Snuffle" on the shop page (change shop-ratings-and-range): how often the shop answers,
// how fast (or that stock comes from its till), and how often it had the item when it said yes. A grouped row with a
// leading symbol, spoken in full ("Answers 9 in 10 requests, 46 of 51 so far").
import CheckmarkBadge01Icon from '@hugeicons/core-free-icons/CheckmarkBadge01Icon';
import Clock01Icon from '@hugeicons/core-free-icons/Clock01Icon';
import FlashIcon from '@hugeicons/core-free-icons/FlashIcon';
import MessageDone01Icon from '@hugeicons/core-free-icons/MessageDone01Icon';
import SparklesIcon from '@hugeicons/core-free-icons/SparklesIcon';
import type { IconSvgElement } from '@hugeicons/react-native';
import { memo } from 'react';

import { ListRow } from '../ListRow/ListRow';
import type { RowPosition } from '../ShopRow/ShopRow';

/** answers: requests answered. speed: usual reply time. till: a connected shop. stock: had it when it said yes. new: too few yeses to say. */
export type ReliabilityKind = 'answers' | 'speed' | 'till' | 'stock' | 'new';

const icons: Record<ReliabilityKind, IconSvgElement> = {
  answers: MessageDone01Icon,
  speed: Clock01Icon,
  till: FlashIcon,
  stock: CheckmarkBadge01Icon,
  new: SparklesIcon,
};

export type ReliabilityRowProps = {
  kind: ReliabilityKind;
  /** "Answers 9 in 10 requests", "Usually replies in 6 min", "Had it 24 of 25 times they said yes". */
  title: string;
  /** Footnote under the title: "46 of 51 so far". */
  detail?: string;
  /** Spoken in full, with units in words: "Usually replies in 6 minutes". */
  accessibilityLabel: string;
  position?: RowPosition;
};

export const ReliabilityRow = memo(function ReliabilityRow({ kind, title, detail, accessibilityLabel, position = 'only' }: ReliabilityRowProps) {
  return <ListRow icon={icons[kind]} title={title} detail={detail} position={position} surface="card" accessibilityLabel={accessibilityLabel} />;
});
