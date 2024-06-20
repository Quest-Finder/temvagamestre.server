import { type LogErrorModel } from '@/models'

export interface LogErrorRepo {
  execute: (data: LogErrorModel) => Promise<void>
}
