import fs from 'fs-extra'
import { getPath } from './path'
import { debugInfo } from "./debug"
import { getPackageJson } from "./env"

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