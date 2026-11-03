import { useState } from 'react';

import { Button } from '../Button/Button';
import { Alert } from './Alert';

// Cancel for a refund: the destructive action confirms in an alert. The location prompt stacks three actions.
export function AlertExamples() {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(false);
  const close = () => setLocation(false);
  return (
    <>
      <Button label="Cancel for a refund" role="destructive" onPress={() => setOpen(true)} />
      <Button label="Location prompt" role="tonal" onPress={() => setLocation(true)} />
      <Alert
        visible={open}
        title="Cancel your order?"
        message="Paper & Co puts them back on sale and I refund £29.98 to your card."
        onDismiss={() => setOpen(false)}
        actions={[
          { label: 'Keep order', style: 'cancel', onPress: () => setOpen(false) },
          { label: 'Cancel for a refund', style: 'destructive', onPress: () => setOpen(false) },
        ]}
      />
      <Alert
        visible={location}
        title={'Allow “Snuffle” to use your location?'}
        message="Snuffle uses your location to find shops within a walk and show how far each one is."
        actions={[
          { label: 'Allow Once', onPress: close },
          { label: 'Allow While Using App', onPress: close },
          { label: "Don't Allow", onPress: close },
        ]}
      />
    </>
  );
}
