import { writeInPackageJson } from '../utils/tools'

export async function sassInit() {
  let devDependencies: string[] = [
    'sass@^1.53.0',
    'sass-loader@^13.0.2',
    'style-loader@^3.3.1',
    'css-loader@^6.7.1',
    'postcss-loader@^7.0.0',
    'autoprefixer@^10.4.7'
  ]

  writeInPackageJson(devDependencies, 'devDependencies')
}
