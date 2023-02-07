import fs from "fs-extra";
import { env, getPackageJson } from '../utils/env'
import { getPath } from '../utils/path'

export function specialFn() {
  const { isVue3 } = env
  if(!isVue3) return
  const packageJson = getPackageJson()
  
  if(packageJson.type) {
    delete packageJson.type
    fs.writeJsonSync(getPath('package.json'), packageJson, {
      spaces: 2
    })
  }
}