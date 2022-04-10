module.exports = {
  parser: '@babel/eslint-parser',
  extends: 'airbnb-base',
  env: {
    node: true,
    jest: true,
  },
  rules: {
    semi: ['error', 'never'],
  },
}
