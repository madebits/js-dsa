// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  //parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    node: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  plugins: [],
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'spaced-comment': 0,
    'no-console': 1,
    // manage complexity
    'max-params': ['error', 6],
    'max-depth': ['error', 4],
    'max-nested-callbacks': ['error', 3],
    'max-statements': ['error', 60],
    complexity: ['error', 20]
  }
}
