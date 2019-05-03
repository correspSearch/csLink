module.exports = {
	parserOptions: {
		parser: 'babel-eslint'
	},
	extends: [
		'plugin:vue/recommended',
		'standard',
		'airbnb/base',
	],
	plugins: [
		'vue',
	],
	rules: {
		'vue/v-on-style': 'off',
		'vue/v-bind-style': 'off',
		'vue/no-v-html': 'off',
		'max-len': 'off',
		'no-console': 'off',
		'no-useless-escape': 'off',
	}
}
