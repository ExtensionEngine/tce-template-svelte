module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  extends: '@extensionengine/eslint-config/base',
  plugins: [
    'svelte3',
    '@typescript-eslint'
  ],
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
