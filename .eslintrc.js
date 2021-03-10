module.exports = {
  env: {
    node: true,
    commonjs: true,
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: { 'prettier/prettier': 'error' },
};
