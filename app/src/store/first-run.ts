// First run (openspec/changes/first-run): the splash, Getting started, the location ask and sign in, shown
// before Nearby until the shopper finishes them once. The flag lives in the store and is persisted.
import { router } from 'expo-router';

import { FIRST_RUN_STEPS } from './journey';
import { writePersisted } from './persist';
import { stepHooks, useAppStore } from './store';

function setOnboarded(value: boolean) {
  useAppStore.setState({ hasOnboarded: value });
  writePersisted({ hasOnboarded: value });
}

/** Sign in (or Not now) finished first run: remember it and fade into Nearby. */
export function finishFirstRun() {
  setOnboarded(true);
  useAppStore.setState({ step: 'home' });
  try {
    if (router.canDismiss()) router.dismissAll();
  } catch {
    // nothing to dismiss
  }
  router.replace('/');
}

/** Forget first run and play it again from the splash (debugger, and the account sheet in native dev builds). */
export function replayFirstRun() {
  setOnboarded(false);
  useAppStore.setState({ step: 'splash' });
  try {
    if (router.canDismiss()) router.dismissAll();
  } catch {
    // nothing to dismiss
  }
  router.replace('/welcome');
}

// Picking a journey step past first run in the debugger counts as having done it, so Back to Nearby stays there.
stepHooks.push((step) => {
  if (!FIRST_RUN_STEPS.includes(step) && !useAppStore.getState().hasOnboarded) setOnboarded(true);
});
