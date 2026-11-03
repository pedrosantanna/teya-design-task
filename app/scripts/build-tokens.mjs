#!/usr/bin/env node
// Builds the typed theme from the DTCG 2025.10 token files.
//
//   node scripts/build-tokens.mjs          write src/design-system/theme/theme.generated.ts
//   node scripts/build-tokens.mjs --check  regenerate to a temp file and fail if it differs (token drift)
//
// It reads tokens/resolver.json, merges the sources for every platform x scheme
// combination, resolves {aliases}, converts DTCG values to React Native values
// and writes one `as const` object per theme.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tokensDir = path.join(root, 'src/design-system/tokens');
const outFile = path.join(root, 'src/design-system/theme/theme.generated.ts');

const readJson = (file) => JSON.parse(fs.readFileSync(path.join(tokensDir, file), 'utf8'));
const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (isObject(value) && isObject(target[key]) && !('$value' in value)) deepMerge(target[key], value);
    else target[key] = structuredClone(value);
  }
  return target;
}

// Push group-level $type down to every token so each leaf knows its type.
function inheritTypes(node, inherited) {
  const type = node.$type ?? inherited;
  if ('$value' in node) {
    if (type) node.$type = type;
    return;
  }
  for (const [key, child] of Object.entries(node)) {
    if (!key.startsWith('$') && isObject(child)) inheritTypes(child, type);
  }
}

function lookup(tree, ref) {
  const node = ref.split('.').reduce((n, k) => (n ? n[k] : undefined), tree);
  if (!node || !('$value' in node)) throw new Error(`Unknown token reference {${ref}}`);
  return node;
}

function resolveValue(tree, value, seen = []) {
  if (typeof value === 'string' && /^\{[^}]+\}$/.test(value)) {
    const ref = value.slice(1, -1);
    if (seen.includes(ref)) throw new Error(`Circular reference: ${[...seen, ref].join(' -> ')}`);
    return resolveValue(tree, lookup(tree, ref).$value, [...seen, ref]);
  }
  if (Array.isArray(value)) return value.map((v) => resolveValue(tree, v, seen));
  if (isObject(value)) return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolveValue(tree, v, seen)]));
  return value;
}

const round = (n) => Math.round(n * 1000) / 1000;

function convert(type, value) {
  switch (type) {
    case 'color':
      return value.hex.toUpperCase();
    case 'dimension':
      if (value.unit !== 'px') throw new Error(`Only px dimensions are supported, got ${value.unit}`);
      return value.value;
    case 'duration':
      return value.unit === 's' ? value.value * 1000 : value.value;
    case 'number':
      return value;
    case 'fontWeight':
      return String(value);
    case 'fontFamily':
      return Array.isArray(value) ? value : [value];
    case 'typography': {
      const fontSize = convert('dimension', value.fontSize);
      const family = convert('fontFamily', value.fontFamily);
      return {
        fontFamily: family[0],
        // CSS font stack for the web build, fallbacks included (decision 027).
        fontFamilyWeb: family.map((f) => (/\s/.test(f) ? `"${f}"` : f)).join(', '),
        fontWeight: convert('fontWeight', value.fontWeight),
        fontSize,
        lineHeight: Math.round(fontSize * value.lineHeight),
        letterSpacing: round(convert('dimension', value.letterSpacing)),
      };
    }
    default:
      throw new Error(`Unsupported token type: ${type}`);
  }
}

// Turn the resolved token tree into plain values, skipping $-keys and primitives.
function toValues(tree, node) {
  if ('$value' in node) return convert(node.$type, resolveValue(tree, node.$value));
  const out = {};
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$') || !isObject(child)) continue;
    out[key] = toValues(tree, child);
  }
  return out;
}

function springConfig(platform, s) {
  if (platform === 'ios') {
    // Reanimated: duration in ms and dampingRatio = 1 - bounce (motion.md).
    return { duration: s.duration, dampingRatio: round(1 - s.bounce) };
  }
  // Material 3 gives damping ratio and stiffness; Reanimated takes damping = 2 * ratio * sqrt(stiffness * mass).
  const mass = 1;
  return { stiffness: s.stiffness, damping: round(2 * s.dampingRatio * Math.sqrt(s.stiffness * mass)), mass };
}

function buildTheme(resolver, platform, scheme) {
  const contextsFor = { platform, scheme };
  const tree = {};
  for (const step of resolver.resolutionOrder) {
    const [, kind, name] = step.$ref.split('/');
    const refs = kind === 'sets' ? resolver.sets[name].sources : resolver.modifiers[name].contexts[contextsFor[name]];
    if (!refs) throw new Error(`No sources for ${step.$ref} (${contextsFor[name]})`);
    for (const ref of refs) deepMerge(tree, readJson(ref.$ref));
  }
  inheritTypes(tree);
  const v = toValues(tree, tree);
  const { destructive, ...colors } = v.color;
  // Primitives (color ramps, dimension.*, font.*) stay out of the theme: components use roles only.
  for (const key of ['white', 'black', 'biscuit', 'indigo', 'peach', 'pistachio', 'butter', 'lavender', 'system', 'semantic']) delete colors[key];
  return {
    name: `${platform}${scheme[0].toUpperCase()}${scheme.slice(1)}`,
    platform,
    scheme,
    color: { ...colors, destructive: destructive[scheme] },
    space: v.space,
    gap: v.gap,
    inset: { card: v.inset.card, sheet: v.inset.sheet, bubbleVertical: v.inset.bubble.vertical, bubbleHorizontal: v.inset.bubble.horizontal },
    clearance: v.clearance,
    margin: { screenCompact: v.margin.screen.compact, screenRegular: v.margin.screen.regular },
    hit: v.hit,
    radius: v.radius,
    size: v.size,
    layout: v.layout,
    type: v.type,
    state: v.state,
    spring: Object.fromEntries(Object.entries(v.spring).map(([k, s]) => [k, springConfig(platform, s)])),
  };
}

function render(themes) {
  const ts = (value) => JSON.stringify(value, null, 2).replace(/"([A-Za-z_][A-Za-z0-9_]*)":/g, '$1:');
  const ios = themes.find((t) => t.name === 'iosLight');
  const flatColor = Object.keys(ios.color).filter((k) => typeof ios.color[k] === 'string');
  const union = (keys) => keys.map((k) => `'${k}'`).join(' | ');
  const lines = [
    '// Generated by scripts/build-tokens.mjs from src/design-system/tokens/*.tokens.json.',
    '// Do not edit. Change the token files and run `npm run tokens`.',
    '/* eslint-disable */',
    '',
  ];
  for (const t of themes) lines.push(`export const ${t.name} = ${ts(t)} as const;`, '');
  lines.push(
    `export const themes = { ${themes.map((t) => t.name).join(', ')} } as const;`,
    '',
    'export type ThemeName = keyof typeof themes;',
    'export type AppTheme = (typeof themes)[ThemeName];',
    `export type ColorName = ${union(flatColor)};`,
    `export type BadgeName = ${union(Object.keys(ios.color.badge))};`,
    `export type ShopAccentName = ${union(Object.keys(ios.color.shop.accent))};`,
    `export type TypeStyleName = ${union(Object.keys(ios.type))};`,
    `export type SpaceName = ${union(Object.keys(ios.space))};`,
    `export type RadiusName = ${union(Object.keys(ios.radius))};`,
    `export type SpringName = ${union(Object.keys(ios.spring))};`,
    '',
  );
  return lines.join('\n');
}

function build() {
  const resolver = readJson('resolver.json');
  const platforms = Object.keys(resolver.modifiers.platform.contexts);
  const schemes = Object.keys(resolver.modifiers.scheme.contexts);
  const themes = platforms.flatMap((p) => schemes.map((s) => buildTheme(resolver, p, s)));
  return render(themes);
}

const output = build();
if (process.argv.includes('--check')) {
  const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'tokens-')), 'theme.generated.ts');
  fs.writeFileSync(tmp, output);
  const current = fs.existsSync(outFile) ? fs.readFileSync(outFile, 'utf8') : '';
  if (current !== fs.readFileSync(tmp, 'utf8')) {
    console.error('Token drift: theme.generated.ts does not match the token files. Run `npm run tokens`.');
    process.exit(1);
  }
  console.log('Tokens: no drift.');
} else {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, output);
  console.log(`Wrote ${path.relative(root, outFile)}`);
}
