module.exports = {
  ignorePatterns: ['src/infra/svelte/**/*.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin'
  ],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'yoda': ['error', 'never', { exceptRange: true }],
    'eqeqeq': ['error', 'always'],
    'no-console': 'error',
    'complexity': ['error', 25],
    'arrow-parens': ['error', 'as-needed'],
    'no-path-concat': 'error',
    'no-process-env': 'error',
    'no-unneeded-ternary': 'error',
    'max-classes-per-file': ['error', 1],
    'no-implicit-coercion': 'error',
    'array-element-newline': ['error', 'consistent'],
    'max-lines-per-function': ['error', { max: 100 }],

    'jest/consistent-test-it': ['error'],

    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'error',

    '@typescript-eslint/return-await': ['error', 'in-try-catch'],
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/unbound-method': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/member-ordering': ['error', {
      default: [
        'signature', // index signature

        'abstract-field',
        'abstract-method',

        'static-field',
        'instance-field',

        'constructor',

        'static-method',
        'instance-method',
      ]
    }],
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-inferrable-types': ['error', { ignoreProperties: true }],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/member-delimiter-style': 'error',
    '@typescript-eslint/restrict-plus-operands': ['error', { 'checkCompoundAssignments': true }],
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/explicit-function-return-type': ['error', {
      allowExpressions: true,
      allowHigherOrderFunctions: true,
      allowTypedFunctionExpressions: true,
    }],
    '@typescript-eslint/restrict-template-expressions': ['error', {
      allowNumber: true,
      allowBoolean: true,
      allowNullable: true,
    }],
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
  },
  overrides: [
    {
      files: ['**/*.spec.ts'],
      rules: {
        'max-lines-per-function': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
      },
    },
  ]
};
