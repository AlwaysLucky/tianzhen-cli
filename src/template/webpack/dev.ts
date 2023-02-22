export const webpackDevConfig = `
module.exports = {
  mode: 'development',
  devServer: {
    hot: true,
    port: 9000,
    historyApiFallback: true
  }
}
`
