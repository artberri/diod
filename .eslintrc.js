module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['eslint:recommended', 'prettier'],
	rules: {
		'prefer-template': ['error'],
		'object-shorthand': ['error'],
	},
	overrides: [
		{
			files: ['*.mjs'],
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		{
			files: ['*.ts', '*.tsx'],
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
				'no-unused-expressions': ['off'],
				'@typescript-eslint/no-unused-expressions': ['error'],
				'no-unused-vars': ['off'],
				'@typescript-eslint/no-unused-vars': ['error'],
				'no-shadow': ['off'],
				'@typescript-eslint/no-shadow': ['error'],

				'@typescript-eslint/no-floating-promises': ['error'],
				'@typescript-eslint/explicit-member-accessibility': ['error'],
				'@typescript-eslint/prefer-readonly': ['error'],
				'@typescript-eslint/explicit-function-return-type': ['error'],
				'@typescript-eslint/array-type': ['error', { default: 'array-simple' }],

				'import/no-unresolved': ['error'],
				'import/no-default-export': ['error'],
			},
		},
	],
}
