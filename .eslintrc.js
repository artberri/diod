module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './test/tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    'prefer-template': ['error'],
    'object-shorthand': ['error'],

    'no-unused-expressions': ['off'],
    '@typescript-eslint/no-unused-expressions': ['error'],
    'no-unused-vars': ['off'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-shadow': ['off'],
    '@typescript-eslint/no-shadow': ['error'],
    'brace-style': ['error'],
    '@typescript-eslint/brace-style': ['error'],

    '@typescript-eslint/explicit-member-accessibility': ['error'],
    '@typescript-eslint/prefer-readonly': ['error'],
    '@typescript-eslint/explicit-function-return-type': ['error'],
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],

    'import/no-default-export': ['error'],
  },
}
