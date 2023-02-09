import { getEnv } from '../utils/env'

export function webpackConfigFn() {
  const rules = [
    `
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    `
  ]

  if (getEnv('isSass')) {
    rules.push(`
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [[
                'autoprefixer'
              ]]
            }
          }
        }, 'sass-loader']
      }
    `)
  }

  const webpackConfig = `
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const { VueLoaderPlugin } = require('vue-loader')
    module.exports = {
      module: {
        rules: [${rules}]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html' // 这里需要使用自定义模版文件
        }),
        new VueLoaderPlugin()
      ],
      devServer: {
        port: 9000
      }
    }
  `
  return webpackConfig
}
