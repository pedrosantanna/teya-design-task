import { useState } from 'react';

import { SegmentedControl } from './SegmentedControl';

const segments = [
  { value: 'once', label: 'Once' },
  { value: 'weekly', label: 'Every week' },
];

export function SegmentedControlExamples() {
  const [value, setValue] = useState('once');
  return <SegmentedControl segments={segments} value={value} onChange={setValue} accessibilityLabel="How often" />;
}
