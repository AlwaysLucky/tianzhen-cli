import chalk from "chalk";
const debugSwitch = true
const log = console.log

export const debugError = (msg: string) => {
  debugSwitch && log(chalk.hex('#646cff')(`[xianzao-cli]:`) + chalk.red(msg));
  // 如果出错就退出
  process.exit(0);
};

/**
 * debug 信息
 * @param msg 信息
 */
export const debugInfo = (msg: string) => {
  debugSwitch && log(chalk.hex('#646cff')(`[tianzhen-cli]:`) + chalk.green(msg));
};