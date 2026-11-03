import Search01Icon from '@hugeicons/core-free-icons/Search01Icon';
import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { TextField } from './TextField';

// Empty with a search icon, and filled.
export function TextFieldExamples() {
  const [search, setSearch] = useState('');
  const [name, setName] = useState('Work');
  return (
    <View style={styles.column}>
      <TextField value={search} onChangeText={setSearch} label="Search for an address" placeholder="Search for an address" icon={Search01Icon} />
      <TextField value={name} onChangeText={setName} label="Name" />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  column: { gap: theme.space[3] },
}));
