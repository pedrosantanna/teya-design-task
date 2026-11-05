// Expo's defaults, plus two web-only aliases: react-native-keyboard-controller resolves to a stub
// (src/design-system/internal/keyboardController.web.tsx), where there is no keyboard frame to follow, and
// react-native-web's own useHover to a copy that does not keep pointer events alive (webHover.web.ts).
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
const webStubs = {
  'react-native-keyboard-controller': path.join(__dirname, 'src/design-system/internal/keyboardController.web.tsx'),
};
const resolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && webStubs[moduleName]) return { type: 'sourceFile', filePath: webStubs[moduleName] };
  if (platform === 'web' && /(^|\/)modules\/useHover$/.test(moduleName) && context.originModulePath.includes(`${path.sep}react-native-web${path.sep}dist${path.sep}`)) {
    return { type: 'sourceFile', filePath: path.join(__dirname, 'src/design-system/internal/webHover.web.ts') };
  }
  return (resolveRequest ?? context.resolveRequest)(context, moduleName, platform);
};

module.exports = config;
