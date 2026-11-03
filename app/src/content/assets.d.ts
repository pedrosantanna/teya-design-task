// Bundled images resolve to a Metro asset id that expo-image takes as a source.
declare module '*.jpg' {
  const source: number;
  export default source;
}
