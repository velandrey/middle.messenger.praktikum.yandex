import js from '@eslint/js';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
    {
        rules: {
            'no-var': 'error',
            'semi': 'error',
            'indent': 'error',
            'no-multi-spaces': 'error',
            'space-in-parens': 'error',
            'no-multiple-empty-lines': 'error',
            'prefer-const': 'error',
            'no-use-before-define': 'error',
            'eol-last': 'error',
            'no-unused-vars': 'off',
            'max-len': [1, 100],
            'max-params': [2, 3],
            'import/extensions': 'off',
            'import/no-extraneous-dependencies': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
        },
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2022,
                ...globals.node,
            },
        }
    },
    tseslint.configs.recommended,
    globalIgnores(['dist/*','node_modules/*'])
]);
