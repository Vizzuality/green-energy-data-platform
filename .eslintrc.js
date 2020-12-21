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
  },
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:cypress/recommended',
  ],
  plugins: ['cypress'],
  rules: {
    'no-console': [1, { allow: ['warn', 'error'] }],
    'react/jsx-props-no-spreading': [0, {}],
  },
};
