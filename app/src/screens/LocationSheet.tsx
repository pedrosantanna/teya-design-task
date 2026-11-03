// "Where are you shopping?" (location spec): current location, saved places, an address search with mock results,
// the walking radius and Confirm. Nothing changes until Confirm; Nearby then reloads with the chosen area.
import Briefcase01Icon from '@hugeicons/core-free-icons/Briefcase01Icon';
import Home01Icon from '@hugeicons/core-free-icons/Home01Icon';
import Location01Icon from '@hugeicons/core-free-icons/Location01Icon';
import MapsLocation01Icon from '@hugeicons/core-free-icons/MapsLocation01Icon';
import Navigation03Icon from '@hugeicons/core-free-icons/Navigation03Icon';
import Search01Icon from '@hugeicons/core-free-icons/Search01Icon';
import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useShallow } from 'zustand/react/shallow';

import { ListRow, SegmentedControl, Sheet, Text, TextField, type RowPosition } from '@/design-system';
import { addressBook, currentPlace, useAppActions, useAppStore, type Place, type Radius } from '@/store';

const RADII: { value: string; label: string }[] = [
  { value: '10', label: '10 min' },
  { value: '15', label: '15 min' },
  { value: '20', label: '20 min' },
];

export const placeIcon = (place: Place) => (place.id === 'current' ? Navigation03Icon : place.id === 'home' ? Home01Icon : place.id === 'work' ? Briefcase01Icon : Location01Icon);

const position = (i: number, n: number): RowPosition => (n === 1 ? 'only' : i === 0 ? 'first' : i === n - 1 ? 'last' : 'middle');

export function LocationSheet({ open, onClose, origin, onConfirm }: { open: boolean; onClose: () => void; origin?: string; onConfirm?: () => void }) {
  const { place, radius, places } = useAppStore(useShallow((s) => ({ place: s.place, radius: s.radius, places: s.places })));
  const { set } = useAppActions();
  const [chosen, setChosen] = useState<Place>(place);
  const [within, setWithin] = useState<Radius>(radius);
  const [query, setQuery] = useState('');
  const [wasOpen, setWasOpen] = useState(open);

  // Each opening starts from what Nearby shows now.
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setChosen(place);
      setWithin(radius);
      setQuery('');
    }
  }

  const options = [currentPlace, ...places];
  if (!options.some((p) => p.id === chosen.id)) options.push(chosen);
  const q = query.trim().toLowerCase();
  const results = q ? addressBook.filter((a) => a.address.toLowerCase().includes(q)) : [];

  const confirm = () => {
    set({ place: chosen, radius: within });
    onClose();
    onConfirm?.();
  };

  return (
    <Sheet open={open} onClose={onClose} title="Where are you shopping?" detents={['medium', 'large']} opaque origin={origin} onConfirm={confirm} confirmLabel="Confirm">
      <TextField value={query} onChangeText={setQuery} label="Search for an address" placeholder="Search for an address" icon={Search01Icon} />
      {q ? (
        results.length > 0 ? (
          <View>
            {results.map((r, i) => (
              <ListRow
                key={r.address}
                id={r.address}
                icon={MapsLocation01Icon}
                title={r.address}
                position={position(i, results.length)}
                onPress={() => {
                  setChosen({ id: `search:${r.address}`, label: r.address, address: r.address, area: r.area });
                  setQuery('');
                }}
              />
            ))}
          </View>
        ) : (
          <Text variant="footnote" color="mutedForeground">
            No addresses match
          </Text>
        )
      ) : (
        <View>
          {options.map((p, i) => (
            <ListRow
              key={p.id}
              id={p.id}
              icon={placeIcon(p)}
              // The place's name, its address underneath (as Current location), so a long street never wraps.
              title={p.label}
              detail={p.id.startsWith('search:') || p.address === p.label ? undefined : p.address}
              selected={chosen.id === p.id}
              position={position(i, options.length)}
              onPress={() => setChosen(p)}
            />
          ))}
        </View>
      )}
      <View style={styles.group}>
        <Text variant="footnote" color="mutedForeground">{`Within ${within} min walk`}</Text>
        <SegmentedControl segments={RADII} value={String(within)} onChange={(v) => setWithin(Number(v) as Radius)} accessibilityLabel="Walking distance" />
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create((theme) => ({
  group: { gap: theme.space[2] },
}));
