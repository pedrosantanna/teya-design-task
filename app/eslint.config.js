// ESLint flat config. The local rules keep every visual value coming from the design tokens.
// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const reactNative = require('eslint-plugin-react-native');

// Style properties that must take a theme value, never a number written in place.
const SPACING_PROPS =
  /^(margin|padding)(Top|Bottom|Left|Right|Horizontal|Vertical|Start|End|Block|Inline)?$|^(gap|rowGap|columnGap|fontSize|lineHeight|letterSpacing|borderRadius|border(Top|Bottom)(Left|Right|Start|End)Radius|width|height|minWidth|maxWidth|minHeight|maxHeight)$/;
const COLOR_LITERAL = /^(#[0-9a-f]{3,8}|(rgb|rgba|hsl|hsla|oklch|oklab|color)\(.*\))$/i;

const local = {
  rules: {
    'no-raw-style-numbers': {
      meta: {
        type: 'problem',
        docs: { description: 'Spacing, size, radius and type values come from the theme, not number literals.' },
        schema: [],
        messages: {
          raw: '`{{name}}: {{value}}` is a raw number. Use a theme token (theme.space, theme.gap, theme.radius, theme.size, theme.type).',
        },
      },
      create(context) {
        const isRawNumber = (node) =>
          (node.type === 'Literal' && typeof node.value === 'number' && node.value !== 0) ||
          (node.type === 'UnaryExpression' && node.operator === '-' && isRawNumber(node.argument));
        return {
          Property(node) {
            const name = node.key && (node.key.name ?? node.key.value);
            if (typeof name !== 'string' || !SPACING_PROPS.test(name)) return;
            if (isRawNumber(node.value)) {
              context.report({ node: node.value, messageId: 'raw', data: { name, value: context.sourceCode.getText(node.value) } });
            }
          },
        };
      },
    },
    'no-color-strings': {
      meta: {
        type: 'problem',
        docs: { description: 'Colours come from theme.color roles, never from hex, rgb or hsl strings.' },
        schema: [],
        messages: { raw: 'Colour literal {{value}}. Use a colour role from the theme (theme.color.*).' },
      },
      create(context) {
        const check = (node, value) => {
          if (typeof value === 'string' && COLOR_LITERAL.test(value.trim())) {
            context.report({ node, messageId: 'raw', data: { value: JSON.stringify(value) } });
          }
        };
        return {
          Literal: (node) => check(node, node.value),
          TemplateLiteral: (node) => node.expressions.length === 0 && check(node, node.quasis[0].value.cooked),
        };
      },
    },
  },
};

module.exports = defineConfig([
  expoConfig,
  {
    ignores: [
      'dist/*',
      '.expo/*',
      'node_modules/*',
      'src/design-system/theme/theme.generated.ts',
      // The map's vendored maplibre-gl build (copied on install), its data and its generated style.
      'public/map/*',
      'assets/map/*',
      'src/design-system/components/Map/style.generated.ts',
    ],
  },
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: { globals: { Buffer: 'readonly', process: 'readonly', console: 'readonly', URL: 'readonly', fetch: 'readonly' } },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { 'react-native': reactNative, snuffle: local },
    rules: {
      'react-native/no-color-literals': 'error',
      'react-native/no-inline-styles': 'error',
      'snuffle/no-raw-style-numbers': 'error',
      'snuffle/no-color-strings': 'error',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@hugeicons/core-free-icons',
              message:
                "Import each icon from its own path ('@hugeicons/core-free-icons/ArrowRight01Icon'); the package root pulls every icon into the web bundle.",
            },
          ],
        },
      ],
    },
  },
  {
    // Screens build UI from design-system components only.
    files: ['src/app/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react-native',
              importNames: ['Text', 'Pressable', 'StyleSheet', 'TouchableOpacity', 'TouchableHighlight', 'Button'],
              message: "Screens use primitives from '@/design-system' and StyleSheet from 'react-native-unistyles'.",
            },
            {
              name: '@hugeicons/core-free-icons',
              message: "Import each icon from its own path ('@hugeicons/core-free-icons/ArrowRight01Icon').",
            },
          ],
          patterns: [
            {
              group: ['@/design-system/*', '**/design-system/components/*'],
              message: "Import from '@/design-system' only; component internals are private.",
            },
          ],
        },
      ],
    },
  },
]);
