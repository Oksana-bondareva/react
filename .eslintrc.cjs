module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', "@typescript-eslint", "import", "react-compiler"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  
    "react-compiler/react-compiler": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/ban-types": [
      "error",
      {
        "extendDefaults": true,
        "types": {
          "{}": false
        }
      }],
  },

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },

    'import/resolver': {
      alias: {
        map: [
          ['', './public']
        ],
        extensions: ['.ts', '.tsx', ".js", ".jsx",]
      }
    }
  }
}
