import fs from 'fs-extra'
import spawn from 'cross-spawn'
import { getPath } from './path'
import { debugInfo, debugWarning } from "./debug"
import { getEnv, getPackageJson } from "./env"

export function hasElementInArray(devArr: Array<String>, element: string) {
  return devArr.find(ele => ele === element)
}

export function writeInPackageJson(devArr: string[], key: string) {
  const packageJson = getPackageJson()
  if(!packageJson[key]) packageJson[key] = {}
  devArr.forEach(item => {
    const index = item.lastIndexOf('@')
    const k = index !== -1 ? item.slice(0, index) : item
    const v = index !== -1 ? item.slice(index + 1) || '' : ''
    packageJson[key][k] = v
    debugInfo(`${item}✅`)
  })
  fs.writeJsonSync(getPath('package.json'), packageJson, { spaces: 2 })
}

export const run = async (str: string) => {
  const basePath = getEnv('base') as string
  const runArr = str.split(' ')
  if (runArr.length < 2) {
    debugWarning(`运行参数错误${str}`)
    return false
  }
  const [npm, ...args] = runArr
  debugInfo(`${runArr.join(' ')}✅`)
  spawn.sync(npm, args, {
    stdio: 'pipe',
    cwd: basePath
  })
}