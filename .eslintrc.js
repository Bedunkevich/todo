module.exports = {
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 8,
        sourceType: "module",
        ecmaFeatures: {
            js: true
        }
    },
    rules: {
        semi: 2
    },
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true
    },
    extends: [
        "./config/eslint/rules/best-practices",
        "./config/eslint/rules/style",
        "./config/eslint/rules/variables",
        "./config/eslint/rules/react"
    ].map(require.resolve),
    plugins: ["react"]
};