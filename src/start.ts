import { vueInit } from './core/vue'
import { eslintInit } from './core/eslint'
import { vscodeInit } from './template/vscode'
import { specialFn } from './core/special'
import { getPackageJson, initProjectInfo, setEnv } from './utils/env'
import { hasElementInArray } from './utils/tools'
import { answerType } from './interface'
import { debugError } from './utils/debug'

export const start = async (base: string, answers: answerType) => {
  console.log('base', base);
  console.log(answers);
  const packageJson = getPackageJson(base)
  initProjectInfo(packageJson)

  const { vue3 = false, plugins = [] } = answers

  // vue3
  if (vue3) {
    setEnv('isVue3', true)
    await vueInit()
    specialFn()
  }

  try {
    hasElementInArray(plugins, 'eslint') && eslintInit()

    hasElementInArray(plugins, 'vscode') && vscodeInit()
  } catch (error) {
    debugError(JSON.stringify(error))
  }
}