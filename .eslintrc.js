module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  plugins: ['prettier','import','react','jest','jsx-a11y','babel'],
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    semi: ['error','always'],
  }
}
