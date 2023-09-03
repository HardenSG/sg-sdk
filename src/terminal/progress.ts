// eslint-disable-next-line @typescript-eslint/no-var-requires
const chalk = require('chalk')
import { IProgressParamsType, IProgressReturnsType } from './type'

const defaultValue: IProgressParamsType = {
  maxValue: 100,
  inProgressText: '正在进程中～',
  isNeedPgsNotify: true,
  successNotifyText: '加载成功!',
  failedNotifyText: '加载失败！',
}

/**
 * 终端加载进度提示
 * @param params IProgressType
 * @returns
 */
function progress(params: IProgressParamsType): IProgressReturnsType {
  const { maxValue, inProgressText, isNeedPgsNotify, successNotifyText, failedNotifyText } = {
    ...defaultValue,
    ...params,
  }

  let progress = ''
  let count = 0

  /**
   * 更新当前状态
   * @param currentValue 当前进度
   * @param status 当前状态，false为失败
   * @returns
   */
  function emitProgressUpdate(currentValue: number, status: boolean = true) {
    // 清空行
    process.stdout.clearLine(0)
    // 光标移动到行首
    process.stdout.cursorTo(0)

    progress += '='
    count = currentValue
    const message = isNeedPgsNotify
      ? inProgressText + `当前进度: ${count}% ` + `((${progress}=>` + '))'
      : `((${progress}))`

    process.stdout.write(chalk.blue(message))
    process.stdout.write('\n')
    ;(!status || count >= maxValue) &&
      process.stdout.write(
        !status
          ? chalk.bgRedBright(failedNotifyText + '🤯')
          : chalk.bgGreenBright(successNotifyText + '🤪'),
      )
  }
  return {
    emitProgressUpdate,
  }
}

export default progress
