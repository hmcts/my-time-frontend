const { devDependencies } = require('./package.json');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'react-app',
    'plugin:import/typescript',
    'eslint:recommended',
  ],
  env: {
    es6: true,
  },
  rules: {
    'filenames/match-exported': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
      },
      extends: [
        'react-app',
        'plugin:import/typescript',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
      ],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
        '@typescript-eslint/ban-ts-comment': 0,
        'react/jsx-props-no-spreading': 0,
        'filenames/match-exported': 0,
        'react/static-property-placement': ['error', 'static public field'],
        'jsx-a11y/label-has-associated-control': 0,
      },
    },
    {
      files: [
        'stories.[jt]s?(x)',
        'test.[jt]s?(x)',
        'fixtures.[jt]s?(x)',
        '**.test.[jt]s?(x)',
        '**.spec.[jt]s?(x)',
        'example.[jt]s?(x)',
        'scripts/**',
        'src/stories/**',
      ],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
      settings: {
        'import/core-modules': [
          'govuk-react',
          ...Object.keys(devDependencies)
        ],
      },
    },
    {
      files: ['**.test.[jt]s?(x)', '**.spec.[jt]s?(x)'],
    },
    {
      files: ['test.[jt]s?(x)', '**.test.[jt]s?(x)'],
      env: {
        jest: true,
        browser: true,
      },
    },
    {
      files: ['stories.[jt]s?(x)', 'src/stories/**'],
      rules: {
        'import/no-anonymous-default-export': [2, { allowObject: true }],
      },
    },
  ],
};
