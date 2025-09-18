const purgecss = require('@fullhuman/postcss-purgecss').default;

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
    purgecss({
      content: ['./src/**/*.html', './src/**/*.js'], // adjust if needed
      safelist: ['.dark-mode'], // keep important classes
    }),
  ],
};
