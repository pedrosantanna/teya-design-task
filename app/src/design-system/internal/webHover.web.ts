// Web only: a copy of react-native-web's useHover, which keeps the pointerenter event in the lock and unlock listeners it leaves on the
// hovered node, and an event holds the nodes along its path. A tile that stays mounted on Nearby then kept a whole
// shop page alive for every visit (about 400 DOM nodes and 29 listeners each time). This copy is the same hook, with
// the listeners using the lock event they receive instead of the enter event. metro.config.js resolves react-native-web's
// own import of its useHover to this file on the web.
// @ts-expect-error react-native-web ships no types for its internal modules.
import { getModality } from 'react-native-web/dist/modules/modality';
// @ts-expect-error react-native-web ships no types for its internal modules.
import useEvent from 'react-native-web/dist/modules/useEvent';
// @ts-expect-error react-native-web ships no types for its internal modules.
import useLayoutEffect from 'react-native-web/dist/modules/useLayoutEffect';

type Fn = (e: unknown) => void;
type Config = {
  contain?: boolean;
  disabled?: boolean;
  onHoverStart?: Fn;
  onHoverChange?: (hovered: boolean) => void;
  onHoverUpdate?: Fn;
  onHoverEnd?: Fn;
};
type Listen = (target: unknown, listener: Fn | null) => void;
type PointerLike = { pointerType?: string; x?: number; y?: number; clientX: number; clientY: number };

const opts = { passive: true };
const LOCK = 'react-gui:hover:lock';
const UNLOCK = 'react-gui:hover:unlock';

const pointerType = (e: PointerLike) => e.pointerType ?? getModality();

function dispatchCustomEvent(target: EventTarget, type: string) {
  const event = document.createEvent('CustomEvent');
  event.initCustomEvent(type, true, true, undefined);
  target.dispatchEvent(event);
}

export default function useHover(targetRef: { current: EventTarget | null }, config: Config) {
  const { contain, disabled, onHoverStart, onHoverChange, onHoverUpdate, onHoverEnd } = config;
  const pe = typeof window !== 'undefined' && window.PointerEvent != null;
  const addMove: Listen = useEvent(pe ? 'pointermove' : 'mousemove', opts);
  const addEnter: Listen = useEvent(pe ? 'pointerenter' : 'mouseenter', opts);
  const addLeave: Listen = useEvent(pe ? 'pointerleave' : 'mouseleave', opts);
  const addLock: Listen = useEvent(LOCK, opts);
  const addUnlock: Listen = useEvent(UNLOCK, opts);
  useLayoutEffect(() => {
    const target = targetRef.current;
    if (target === null) return;
    const hoverEnd = (e: unknown) => {
      onHoverEnd?.(e);
      onHoverChange?.(false);
      addMove(target, null);
      addLeave(target, null);
    };
    const leave = (e: unknown) => {
      if (targetRef.current != null && pointerType(e as PointerLike) !== 'touch') {
        if (contain) dispatchCustomEvent(target, UNLOCK);
        hoverEnd(e);
      }
    };
    const move = (e: unknown) => {
      const p = e as PointerLike;
      if (pointerType(p) === 'touch') return;
      if (onHoverUpdate) {
        if (p.x == null) p.x = p.clientX;
        if (p.y == null) p.y = p.clientY;
        onHoverUpdate(p);
      }
    };
    const hoverStart = (e: unknown) => {
      onHoverStart?.(e);
      onHoverChange?.(true);
      if (onHoverUpdate) addMove(target, !disabled ? move : null);
      addLeave(target, !disabled ? leave : null);
    };
    const enter = (e: unknown) => {
      if (targetRef.current == null || pointerType(e as PointerLike) === 'touch') return;
      if (contain) dispatchCustomEvent(target, LOCK);
      hoverStart(e);
      // The lock events stand in for the enter event, so nothing here keeps the pointer event alive.
      const onLock = (lock: unknown) => {
        if ((lock as Event).target !== target) hoverEnd(lock);
      };
      const onUnlock = (lock: unknown) => {
        if ((lock as Event).target !== target) hoverStart(lock);
      };
      addLock(target, !disabled ? onLock : null);
      addUnlock(target, !disabled ? onUnlock : null);
    };
    addEnter(target, !disabled ? enter : null);
  }, [addEnter, addMove, addLeave, addLock, addUnlock, contain, disabled, onHoverStart, onHoverChange, onHoverUpdate, onHoverEnd, targetRef]);
}

