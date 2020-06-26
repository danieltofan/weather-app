module.exports = {
  lintOnSave: false,
  outputDir: 'docs',
  publicPath: process.env.NODE_ENV === 'production' ? '/weather-app/' : '/'
}
