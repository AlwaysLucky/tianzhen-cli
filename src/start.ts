import { vueInit } from './core/vue'
import { eslintInit } from './core/eslint'
import { vscodeInit } from './template/vscode'
import { sassInit } from './core/sass'
import { specialFn } from './core/special'
import { getPackageJson, initProjectInfo, setEnv } from './utils/env'
import { hasElementInArray } from './utils/tools'
import { answerType } from './interface'
import { debugError } from './utils/debug'

export const start = async (base: string, answers: answerType) => {
  const packageJson = getPackageJson(base)
  initProjectInfo(packageJson)

  const { plugins = [], vueVersion = 'Vue3' } = answers

  if (hasElementInArray(plugins, 'sass')) {
    setEnv('isSass', true)
  }

  // vue3
  if (vueVersion === 'Vue3') {
    setEnv('isVue3', true)
    await vueInit()
    specialFn()
  }

  try {
    hasElementInArray(plugins, 'eslint') && eslintInit()

    hasElementInArray(plugins, 'vscode') && (await vscodeInit())

    hasElementInArray(plugins, 'sass') && sassInit()
  } catch (error) {
    debugError(JSON.stringify(error))
  }
}
