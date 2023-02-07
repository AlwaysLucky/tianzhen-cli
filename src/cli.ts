import cac from 'cac'
import { start } from './start'
import { setEnv } from './utils/env'
import { name, version } from '../package.json'
import { answerType }  from './interface'

const cli = cac(name)

export function initCli(answers: answerType) {
  cli
    .command('[root]')
    .alias('alias')
    .action(async (_root, options) => {
      let base: string = options.base
      if(!base) {
        base = process.cwd()
      }
      setEnv('base', base)
      start(base, answers)
    })
  cli.help()
  cli.version(version)
  cli.parse()
}