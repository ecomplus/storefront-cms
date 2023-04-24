const path = require('path');

const coreVersion = require('./package.json').version;
const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
const isESM = process.env.NODE_ENV === 'esm';

console.info('Build Package:', path.basename(process.cwd()));

const defaultPlugins = [
  'lodash',
  [
    'babel-plugin-transform-builtin-extend',
    {
      globals: ['Error'],
    },
  ],
  'transform-export-extensions',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-nullish-coalescing-operator',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-syntax-dynamic-import',
  'babel-plugin-inline-json-import',
];

const svgo = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
  ],
};

function presets() {
  return [
    '@babel/preset-react',
    '@babel/preset-env',
    [
      '@emotion/babel-preset-css-prop',
      {
        autoLabel: 'always',
      },
    ],
    '@babel/typescript',
  ];
}

function plugins() {
  if (isESM) {
    return [
      ...defaultPlugins,
      [
        'transform-define',
        {
          STATIC_CMS_CORE_VERSION: `${coreVersion}`,
        },
      ],
      [
        'inline-react-svg',
        {
          svgo,
        },
      ],
    ];
  }

  if (isTest) {
    return [
      ...defaultPlugins,
      [
        'inline-react-svg',
        {
          svgo,
        },
      ],
    ];
  }

  if (!isProduction) {
    return [...defaultPlugins];
  }

  return defaultPlugins;
}

module.exports = {
  presets: presets(),
  plugins: plugins(),
};
