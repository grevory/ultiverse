module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:react-hooks/recommended',
      'prettier',
      'plugin:prettier/recommended',
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: [
      'react',
      'jsx-a11y',
      'import',
      'react-hooks',
      'prettier',
    ],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'prettier/prettier': ['error'],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'import/no-unresolved': 'off',
      'indent': ['error', 4],
    },
  };
