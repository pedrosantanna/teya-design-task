import { useState } from 'react';

import { Button } from '../Button/Button';
import { PaymentSheet, type PaymentSheetStatus } from './PaymentSheet';

// Opens the sheet in the current platform's form; Confirm runs Processing, then Done, then closes.
export function PaymentSheetExamples() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<PaymentSheetStatus>('ready');
  const confirm = () => {
    setStatus('processing');
    setTimeout(() => setStatus('done'), 900);
    setTimeout(() => {
      setOpen(false);
      setStatus('ready');
    }, 1500);
  };
  return (
    <>
      <Button label="Open the payment sheet" role="tonal" onPress={() => setOpen(true)} />
      <PaymentSheet
        open={open}
        merchant="Paper & Co"
        items="2 × eclipse glasses"
        total="£29.98"
        cardName="Debit card"
        cardNumber="•••• 4021"
        status={status}
        onConfirm={confirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
