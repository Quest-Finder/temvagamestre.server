import { type ActiveType } from '../active-type.ts/active-type-enum'
import { type Frequency } from '../frequency/frequency-enum'

export type PreferenceModel = {
  id: string
  frequency: Frequency
  activeType: ActiveType
}
