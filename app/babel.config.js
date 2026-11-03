module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Unistyles 3 rewrites StyleSheet and component imports under src/ so styles react to theme changes.
      ['react-native-unistyles/plugin', { root: 'src' }],
    ],
  };
};
