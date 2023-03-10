import fs from 'fs-extra'
import path from 'path'
import { htmlTemplate } from '../template/indexHtml'
import { webpackBaseFn } from '../template/webpack/base'
import { webpackDevConfig } from '../template/webpack/dev'
import { webpackPrdConfig } from '../template/webpack/prd'
import { templateIndex } from '../template/index'
import { templateVueFn } from '../template/vue'
import { writeInPackageJson } from '../utils/tools'
import { getEnv, getPackageJson } from '../utils/env'
import { getPath } from '../utils/path'

export async function vueInit(plugins: String[]) {
  const dependencies: string[] = ['webpack@^5.73.0', 'webpack-cli@^4.10.0', 'webpack-merge@^5.8.0', 'cross-env@^7.0.3', 'webpack-dev-server@^4.9.3', 'html-webpack-plugin@^5.5.0']

  if (getEnv('isVue2')) {
    dependencies.push('vue@^2.6.14')
  }

  if (getEnv('isVue3')) {
    dependencies.push('vue@^3.2.47')

    writeInPackageJson(['vue-loader@^17.0.0', '@vue/compiler-sfc@^3.2.37'], 'devDependencies')
    fs.outputFileSync(getPath('./public/index.html'), htmlTemplate)
    fs.outputFileSync(getPath('./src/App.vue'), templateVueFn(plugins))
    fs.outputFileSync(getPath('./src/index.js'), templateIndex)

    fs.copy(getPath('./src/assets/avatar.jpg'), path.resolve('./src', './assets/avatar.jpg'))

    fs.outputFileSync(getPath('./build/webpack.base.js'), webpackBaseFn())
    fs.outputFileSync(getPath('./build/webpack.dev.js'), webpackDevConfig)
    fs.outputFileSync(getPath('./build/webpack.prd.js'), webpackPrdConfig)

    const packageJson = getPackageJson()
    packageJson.scripts['start'] = 'webpack-dev-server --config build/webpack.base.js'
    packageJson.scripts['build'] = 'cross-env NODE_ENV=production webpack --config build/webpack.base.js'

    fs.writeJSONSync(getPath('package.json'), packageJson, { spaces: 2 })
  }

  writeInPackageJson(dependencies, 'dependencies')
}
