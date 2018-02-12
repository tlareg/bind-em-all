const { NODE_ENV, BABEL_ENV } = process.env

const cjs = BABEL_ENV === 'cjs'
const test = NODE_ENV === 'test'
const prod = NODE_ENV === 'production'

const testConfig = {
  presets: "env"
}

const config = {
  presets: [
    [
      '@babel/env',
      {
        loose: true,
        modules: false,
        exclude: ['transform-typeof-symbol'],
        forceAllTransforms: true,
      },
    ],
    '@babel/react',
    '@babel/stage-2',
  ],
  plugins: [
    cjs && '@babel/transform-modules-commonjs',
  ].filter(Boolean),
}

module.exports = test ? testConfig : config