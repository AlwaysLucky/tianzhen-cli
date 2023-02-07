import inquirer from 'inquirer'
import { initCli } from './src/cli'
import { answerType } from './src/interface'

const prompList = [
  {
    type: 'confirm',
    message: '创建vue3项目？',
    name: 'vue3'
  },
  {
    type: 'checkbox',
    message: '选择要安装的插件(默认全选)',
    name: 'plugins',
    choices: [
      {
        name: 'eslint install',
        value: 'eslint',
        checked: true,
      },
      {
        name: 'husky install',
        value: 'husky',
        checked: true,
      },
      {
        name: 'commitLint install',
        value: 'commitLint',
        checked: true,
      },
      {
        name: 'vscode格式化 install',
        value: 'vscode',
        checked: true,
      },
    ]
  }
]

const question = async () => {
  const answers: answerType = await inquirer.prompt(prompList)
  initCli(answers)
}

question()