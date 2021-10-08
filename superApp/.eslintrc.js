module.exports = {
	globals: {
		web3: true,
		artifacts: true,
		describe: true,
		contract: true,
		context: true,
		before: true,
		after: true,
		beforeEach: true,
		afterEach: true,
		it: true,
		assert: true,
	},
	root: true,
	env: {
		es6: true,
		browser: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	plugins: ['react', 'react-hooks'],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 8,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
			experimentalObjectRestSpread: true,
		},
	},

	rules: {
		'comma-dangle': ['warn', 'always-multiline'],
		'max-len': [
			'warn',
			{
				code: 120,
				tabWidth: 4,
				ignoreStrings: true,
			},
		],
		'callback-return': ['warn', ['callback', 'cb']],
		'padding-line-between-statements': 'off',
		'space-before-function-paren': [0, 'always'],
		'eqeqeq': [2, 'smart'],
		'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
		'quotes': ['warn', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
		'no-unused-vars': 'warn',
		'react/jsx-uses-react': 'warn',
		'react/jsx-uses-vars': 'warn',
		'react/prop-types': 'warn',
		'react-hooks/rules-of-hooks': 'warn',
		'react-hooks/exhaustive-deps': 'warn',
		'indent': ['warn', 'tab', { SwitchCase: 1 }],
		'no-tabs': 'off',
		'react/self-closing-comp': [
			'warn',
			{
				component: true,
				html: true,
			},
		],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
