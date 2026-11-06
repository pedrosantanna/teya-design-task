// The photo of a request: the one the shopper picked in the chat's bar, else the request's own. Shown in the chat's
// bar and on the request's row in Requests, so both read the same entry.
import type { ImageKey } from '@/content/images';

import { useAppStore } from './store';

/** `sam:eclipse`: request ids repeat across the two personas, so the persona is part of the key. */
export const photoKey = (persona: string, requestId: string) => `${persona}:${requestId}`;

export function useRequestPhoto(persona: string, requestId: string, fallback: ImageKey): ImageKey {
  return useAppStore((s) => s.requestPhotos[photoKey(persona, requestId)] ?? fallback);
}

export function chooseRequestPhoto(persona: string, requestId: string, photo: ImageKey) {
  const { requestPhotos, set } = useAppStore.getState();
  set({ requestPhotos: { ...requestPhotos, [photoKey(persona, requestId)]: photo } });
}
