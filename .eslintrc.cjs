'use strict';

module.exports = {
  root: true,

  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],

  parserOptions: {
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },

  plugins: ['@typescript-eslint', 'import', 'prettier', 'react'],

  settings: {
    'import/core-modules': ['react', 'react-dom'],
    'react': { version: 'detect' },
  },

  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/lines-between-class-members': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'react/destructuring-assignment': 0,
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/react-in-jsx-scope': 0,
    'import/prefer-default-export': 0,
  },
};
