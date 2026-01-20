// config/babel.config.js
export default {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not dead'],
        },
        debug: false,
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
}
