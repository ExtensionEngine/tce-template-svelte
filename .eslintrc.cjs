'use strict';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    'svelte3',
    '@typescript-eslint'
  ],
  extends: '@extensionengine/eslint-config/base',
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  rules: {
    'import/first': 'off',
    'no-undef': 'off',
    'no-multiple-empty-lines': ['error', { max: 3 }],
    'sort-imports': ['error', { ignoreDeclarationSort: true }]
  },
  settings: {
    'svelte3/typescript': true
  }
};
