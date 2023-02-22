import fs from 'fs-extra'
import { writeInPackageJson } from '../utils/tools'
import { getEnv, getPackageJson } from '../utils/env'
import { getPath } from '../utils/path'
import { eslintrcFn } from '../template/eslintrc'
import { prettierrcInit } from '../template/prettierrc'

const baseDep = [
  'eslint@^7.25.0',
  'prettier@^2.7.1',
  'eslint-friendly-formatter@^4.0.1',
  'eslint-plugin-prettier@^4.0.0',
  'eslint-plugin-html@^6.2.0',
  'eslint-config-prettier@^8.5.0',
  'typescript@^4.7.4'
]

export async function eslintInit() {
  let devDependencies: string[] = baseDep
  if (getEnv('isVue2')) {
    devDependencies = [...devDependencies, 'eslint-plugin-vue@^6.2.2']
  }

  if (getEnv('isVue3')) {
    devDependencies = [...devDependencies, 'eslint-plugin-vue@^9.2.0', '@typescript-eslint/parser@^5.30.7']
  }

  writeInPackageJson(devDependencies, 'devDependencies')

  fs.outputFileSync(getPath('./.eslintrc.js'), eslintrcFn())
  fs.outputFileSync(getPath('./.prettierrc'), prettierrcInit)

  const packageJson = getPackageJson()
  if (packageJson['eslintConfig']) {
    delete packageJson.eslintConfig
    fs.writeJSONSync(getPath('package.json'), packageJson, { spaces: 2 })
  }
}
