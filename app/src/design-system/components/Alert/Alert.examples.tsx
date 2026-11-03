import { useState } from 'react';

import { Button } from '../Button/Button';
import { Alert } from './Alert';

// Cancel for a refund: the destructive action confirms in an alert.
export function AlertExamples() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="Cancel for a refund" role="destructive" onPress={() => setOpen(true)} />
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
    </>
  );
}
