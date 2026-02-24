module.exports = {
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
  rules: {
    'react/button-has-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'no-param-reassign': 'off',
    'react/no-unescaped-entities': 'off',
    'no-promise-executor-return': 'off',
    'guard-for-in': 'off',
    'eqeqeq': ['error', 'always', { null: 'ignore' }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
  },
};
