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
	rules: {
		'no-console': 'off',
		'quotes': [
			'error',
			'single',
			{
				allowTemplateLiterals: true,
				avoidEscape: true,
			},
		],
		'max-len': [
			'error',
			{
				code: 120,
				tabWidth: 4,
				ignoreStrings: true,
			},
		],
		'callback-return': ['warn', ['callback', 'cb']],
		'camelcase': [
			'error',
			{
				ignoreDestructuring: true,
				properties: 'never',
			},
		],
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'always',
				named: 'never',
				asyncArrow: 'always',
			},
		],
		'padding-line-between-statements': 'off',
		'require-atomic-updates': 'off',
	},
};
