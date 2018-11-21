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
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-console': [
      'error',
      {
        allow: [
          'error',
        ],
      },
    ],
  },
}