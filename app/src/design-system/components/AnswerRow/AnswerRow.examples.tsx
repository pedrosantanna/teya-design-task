import { View } from 'react-native';

import { AnswerRow } from './AnswerRow';

// The asking list in the v7 frame "Asking shops": every kind of status.
export function AnswerRowExamples() {
  return (
    <View>
      <AnswerRow shop="Broadway Chemist" street="Hammersmith Broadway" status="In stock now · 1 of 2" kind="till" position="first" />
      <AnswerRow shop="Bush Opticians" street="Shepherd's Bush Green" status="Doesn't have them" kind="no" position="middle" />
      <AnswerRow shop="Paper & Co" street="King Street" status="Has them" kind="yes" position="middle" />
      <AnswerRow shop="Olympia Cameras" street="Kensington High Street" status="Seen" kind="seen" position="middle" />
      <AnswerRow shop="Goldhawk Pharmacy" street="Goldhawk Road" status="Asked" kind="asked" position="last" />
    </View>
  );
}
