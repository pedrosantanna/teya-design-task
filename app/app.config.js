// Extends app.json. `npm run export:web` builds the web export for any sub-path (for example `prototype/` in the
// docs artifact): it sets a placeholder base URL here, and scripts/relative-web.mjs swaps the placeholder for
// the folder the page is served from, read at runtime. A plain `npx expo export` still builds for the root.
module.exports = ({ config }) => {
  if (!process.env.SNUFFLE_RELATIVE_WEB) return config;
  return { ...config, experiments: { ...config.experiments, baseUrl: '/__snuffle_base__' } };
};
