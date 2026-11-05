// Web only: react-native-web's Pressable delays onPressIn by 50 ms unless a screen passes delayPressIn, which holds
// the pressed state back by three frames. Native presses start on touch-down, so the web responder does too:
// the default start delay becomes 0 and a component that sets its own delay keeps it.
// @ts-expect-error react-native-web ships no types for its internal modules.
import PressResponder from 'react-native-web/dist/modules/usePressEvents/PressResponder';

type Config = { delayPressStart?: number } | null;
type Proto = { configure: (config: Config) => void; __snuffle?: boolean };

{
  const proto = (PressResponder as { prototype: Proto }).prototype;
  if (!proto.__snuffle) {
    proto.__snuffle = true;
    const configure = proto.configure;
    proto.configure = function (config: Config) {
      configure.call(this, config && config.delayPressStart == null ? { ...config, delayPressStart: 0 } : config);
    };
  }
}
