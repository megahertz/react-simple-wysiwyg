'use strict';

module.exports = {
  root: true,

  extends: [
    'prettier',
    'airbnb-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],

  parserOptions: {
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },

  plugins: ['prettier', '@typescript-eslint'],

  settings: {
    'import/core-modules': ['react', 'react-dom'],
  },

  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/lines-between-class-members': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'max-len': [2, { code: 80 }],
    'react/destructuring-assignment': 0,
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 0,
  },
};
