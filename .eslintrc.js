const prettier = require('./.prettierrc.js');

module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    '@react-native-community',
    'airbnb',
    'prettier',
    'prettier/react',
    // '@paralect/eslint-config',
    'plugin:react-hooks/recommended',
  ],
  globals: {
    __DEV__: true,
    GLOBAL: true,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'prettier'],
  settings: { 'import/resolver': { 'babel-module': {} } },
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'import/no-named-as-default': 0,
    'no-unused-expressions': 'off',
    'no-nested-ternary': 'off',
    'arrow-body-style': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.js', '.jsx', '.json', '.native.js'] },
    ],
    'react/prop-types': ['error', { skipUndeclared: true }],
    'prettier/prettier': ['error', prettier],
  },
};
