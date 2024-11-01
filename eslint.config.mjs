import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';


export default [
  {files: ['**/*.{js,mjs,cjs,jsx}']},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      // React
      'react/jsx-uses-vars': 'error',
      // JS
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'prefer-const': 'warn',
    }
  },
  prettier // last to override other formatting rules
];