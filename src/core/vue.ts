import { writeInPackageJson } from "../utils/tools";
import { getEnv} from "../utils/env";


export async function vueInit() {
  let dependencies: string[] = []
  if(getEnv('isVue2')) {
    dependencies.push('vue@^2.6.14')
  }

  if(getEnv('isVue3')) {
    dependencies.push('vue@^3.2.47')
  }

  writeInPackageJson(dependencies, 'dependencies')
}