/**
 * 终端进度条传参
 */
export interface IProgressParamsType {
  maxValue: number
  inProgressText?: string
  isNeedPgsNotify?: boolean
  successNotifyText?: string
  failedNotifyText?: string
}

export type IProgressReturnsType = {
  emitProgressUpdate(currentValue: number, status?: boolean): void
}
