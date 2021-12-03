module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'import/no-extraneous-dependencies': 0,
    'no-console': 'off',
  },
};
