import path from 'path'
import fs from 'fs-extra'
import { checkVueVersion } from '../utils/check'

export const env = {
  base: '',
  isVue: false,
  isVue3: false,
  isReact: false,
  isVue2: false,
  isVueCli: false,
  isWebpack: true,
  isEslint: false,
};

type envKeys = keyof typeof env;

/**
 * @name 设置变量
 */
export const setEnv = (key: envKeys, val: any) => {
  env[key] = val as never;
};

export const getEnv = (key: envKeys) => {
  return env[key]
}

export function getPackageJson(base: string = getEnv('base') as string) {
  const file = path.resolve(base, 'package.json')
  const json = fs.readJSONSync(file)
  return json
}

export function initProjectInfo(packageJson: any) {
  const deps = { ...packageJson.devDependencies, ...packageJson.dependencies }

  if(deps['vue']) {
    setEnv('isVue', true)
    if(checkVueVersion(deps['vue']) === 2) {
      setEnv('isVue2', true)
    }

    if(checkVueVersion(deps['vue']) === 3) {
      setEnv('isVue3', true)
    }
  }

  if(deps['react']) {

  }

  if(deps['eslint']) {
    setEnv('isEslint', true)
  }
}