// Places (location spec, Saved places): the shopper's saved places, opened from the Account sheet's Places row.
// Add, rename and delete live in the store for the session (mock persistence).
import Add01Icon from '@hugeicons/core-free-icons/Add01Icon';
import MapsLocation01Icon from '@hugeicons/core-free-icons/MapsLocation01Icon';
import Search01Icon from '@hugeicons/core-free-icons/Search01Icon';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { useShallow } from 'zustand/react/shallow';

import { Button, LargeTitle, ListRow, NavBar, Sheet, Text, TextField, screenMargin, useNavBarHeight, useNavBarScroll } from '@/design-system';
import { placeIcon } from '@/screens/LocationSheet';
import { addressBook, currentPlace, useAppActions, useAppStore, type Place } from '@/store';

type Editing = { mode: 'add' } | { mode: 'edit'; place: Place } | null;

export default function Places() {
  const { theme } = useUnistyles();
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const top = useNavBarHeight();
  const scroll = useNavBarScroll();
  const margin = screenMargin(theme, frame.width);
  const { places, place } = useAppStore(useShallow((s) => ({ places: s.places, place: s.place })));
  const { set } = useAppActions();
  const [editing, setEditing] = useState<Editing>(null);
  const back = () => (router.canGoBack() ? router.back() : router.navigate('/'));

  const save = (next: Place) => {
    const exists = places.some((p) => p.id === next.id);
    set({
      places: exists ? places.map((p) => (p.id === next.id ? next : p)) : [...places, next],
      // Nearby shows the renamed place's new name at once.
      ...(place.id === next.id ? { place: next } : null),
    });
    setEditing(null);
  };
  const remove = (id: string) => {
    set({ places: places.filter((p) => p.id !== id), ...(place.id === id ? { place: currentPlace } : null) });
    setEditing(null);
  };

  return (
    <View style={styles.screen}>
      <Animated.ScrollView onScroll={scroll.onScroll} scrollEventThrottle={16} contentContainerStyle={styles.content(margin, top, insets.bottom)}>
        <LargeTitle title="Places" scroll={scroll} />
        {places.length > 0 ? (
          <View>
            {places.map((p, i) => (
              <ListRow
                key={p.id}
                id={p.id}
                icon={placeIcon(p)}
                title={p.label}
                detail={p.address}
                chevron
                position={places.length === 1 ? 'only' : i === 0 ? 'first' : i === places.length - 1 ? 'last' : 'middle'}
                onPress={() => setEditing({ mode: 'edit', place: p })}
              />
            ))}
          </View>
        ) : (
          <Text variant="subheadline" color="mutedForeground">
            No saved places. Add one to switch to it from Nearby.
          </Text>
        )}
        <Text variant="footnote" color="mutedForeground">
          Saved places show in “Where are you shopping?” on Nearby.
        </Text>
      </Animated.ScrollView>
      <NavBar
        title="Places"
        mode="large"
        leading="back"
        backLabel="Nearby"
        onLeading={back}
        scroll={scroll}
        trailing={[{ icon: Add01Icon, label: 'Add place', onPress: () => setEditing({ mode: 'add' }) }]}
      />
      <PlaceSheet editing={editing} onClose={() => setEditing(null)} onSave={save} onDelete={remove} />
    </View>
  );
}

function PlaceSheet({ editing, onClose, onSave, onDelete }: { editing: Editing; onClose: () => void; onSave: (p: Place) => void; onDelete: (id: string) => void }) {
  const [shown, setShown] = useState<Editing>(editing);
  const [name, setName] = useState('');
  const [query, setQuery] = useState('');
  const [address, setAddress] = useState<{ address: string; area: Place['area'] } | null>(null);

  // Each opening starts from the place being edited, or empty for a new one.
  if (editing !== shown) {
    setShown(editing);
    if (editing) {
      setName(editing.mode === 'edit' ? editing.place.label : '');
      setAddress(editing.mode === 'edit' ? { address: editing.place.address, area: editing.place.area } : null);
      setQuery('');
    }
  }

  const q = query.trim().toLowerCase();
  const results = q ? addressBook.filter((a) => a.address.toLowerCase().includes(q)) : [];
  const ready = name.trim().length > 0 && address != null;
  const confirm = () => {
    if (!ready || !shown) return;
    const id = shown.mode === 'edit' ? shown.place.id : `place-${Date.now()}`;
    onSave({ id, label: name.trim(), address: address.address, area: address.area });
  };

  return (
    <Sheet
      open={editing != null}
      onClose={onClose}
      title={shown?.mode === 'edit' ? 'Edit place' : 'New place'}
      onConfirm={confirm}
      confirmLabel="Save"
      confirmDisabled={!ready}
    >
      <TextField value={name} onChangeText={setName} label="Name" placeholder="Name, e.g. Gym" />
      {address ? (
        <ListRow icon={MapsLocation01Icon} title={address.address} detail="Address" />
      ) : null}
      <TextField value={query} onChangeText={setQuery} label="Search for an address" placeholder={address ? 'Change the address' : 'Search for an address'} icon={Search01Icon} />
      {q ? (
        results.length > 0 ? (
          <View>
            {results.map((r, i) => (
              <ListRow
                key={r.address}
                id={r.address}
                icon={MapsLocation01Icon}
                title={r.address}
                position={results.length === 1 ? 'only' : i === 0 ? 'first' : i === results.length - 1 ? 'last' : 'middle'}
                onPress={() => {
                  setAddress(r);
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
      ) : null}
      {shown?.mode === 'edit' ? <Button label="Delete place" role="destructive" onPress={() => onDelete(shown.place.id)} /> : null}
    </Sheet>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: { flex: 1, backgroundColor: theme.color.background },
  content: (margin: number, top: number, bottom: number) => ({
    paddingHorizontal: margin,
    paddingTop: top + theme.gap.title,
    paddingBottom: bottom + theme.space[8],
    gap: theme.gap.title,
  }),
}));
