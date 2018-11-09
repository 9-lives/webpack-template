/**
 * eslint 配置
 */
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  // global variables
  globals: {},
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  rules: {
  }
}