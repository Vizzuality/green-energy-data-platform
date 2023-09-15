module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/core-modules': [
      'modules',
    ],
  },
  extends: [
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:cypress/recommended',
    'plugin:import/recommended',
  ],
  plugins: ['cypress'],
  rules: {
    'no-console': [1, { allow: ['warn', 'error'] }],
    'react/jsx-props-no-spreading': [0, {}],
    'react/require-default-props': 0,
  },
};
