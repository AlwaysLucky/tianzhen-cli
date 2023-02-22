import { getEnv } from '../../utils/env'

export function webpackBaseFn() {
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
    const { merge } = require('webpack-merge')
    const { VueLoaderPlugin } = require('vue-loader')
    const devConfig = require('./webpack.dev')
    // const isProduct = process.env.NODE_ENV === 'production'
    const baseConfig = {
      module: {
        rules: [${rules}]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html' // 这里需要使用自定义模版文件
        }),
        new VueLoaderPlugin()
      ]
    }
    module.exports = merge(baseConfig, devConfig)
  `
  return webpackConfig
}
