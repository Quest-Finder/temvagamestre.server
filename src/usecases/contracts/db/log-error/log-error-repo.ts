import { type LogErrorModel } from '@/domain/models'

export interface LogErrorRepo {
  execute: (data: LogErrorModel) => Promise<void>
}
