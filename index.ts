#!/usr/bin/env node
import inquirer from 'inquirer'
import { initCli } from './src/cli'
import { answerType } from './src/interface'

const prompList = [
  {
    name: 'vueVersion',
    type: 'list',
    message: '选择Vue版本',
    choices: ['Vue3', 'Vue2']
  },
  {
    type: 'checkbox',
    message: '选择要安装的插件(默认全选)',
    name: 'plugins',
    choices: [
      {
        name: 'sass',
        value: 'sass',
        checked: true
      },
      {
        name: 'eslint',
        value: 'eslint',
        checked: true
      },
      {
        name: 'husky',
        value: 'husky',
        checked: true
      },
      {
        name: 'commitLint',
        value: 'commitLint',
        checked: true
      },
      {
        name: 'vscode本地配置',
        value: 'vscode',
        checked: true
      }
    ]
  }
]

const question = async () => {
  const answers: answerType = await inquirer.prompt(prompList)
  initCli(answers)
}

question()
