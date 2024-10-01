module.exports = {
  extends: [
    '@rocketseat/eslint-config/node',
  ],
  ignorePatterns: ['.eslintrc.js', 'node_modules', 'data'],
  rules: {
    'no-useless-constructor': 'off'
  },
};
