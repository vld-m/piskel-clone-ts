const memberOrderingConfig = {
  default: [
    'signature',

    'public-static-field',
    'protected-static-field',
    'private-static-field',

    'public-instance-field',
    'protected-instance-field',
    'private-instance-field',

    'public-abstract-field',
    'protected-abstract-field',
    'private-abstract-field',

    'public-field',
    'protected-field',
    'private-field',

    'static-field',
    'instance-field',
    'abstract-field',

    'field',

    'constructor',

    'public-static-method',
    'protected-static-method',
    'private-static-method',

    'public-instance-method',
    'protected-instance-method',
    'private-instance-method',

    'public-abstract-method',
    'protected-abstract-method',
    'private-abstract-method',

    'public-method',
    'protected-method',
    'private-method',

    'static-method',
    'instance-method',
    'abstract-method',

    'method',
  ],
};

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {},
  overrides: [
    {
      files: ['**/*.ts'],
      env: {
        browser: true,
        es6: true,
      },
      extends: [
        'airbnb-base',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
      },
      plugins: ['@typescript-eslint'],
      rules: {
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            ts: 'never',
            js: 'never',
          },
        ],
        '@typescript-eslint/member-ordering': ['warn', memberOrderingConfig],
      },
      settings: {
        'import/resolver': 'webpack',
      },
    },
  ],
};
