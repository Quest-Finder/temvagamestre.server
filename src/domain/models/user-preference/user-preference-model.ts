export type Frequency = 'daily' | 'weekly' | 'monthly'

export type ActiveType = 'player' | 'gameMaster'

export type UserPreferenceModel = {
  id: string
  frequency: Frequency | null
  activeType: ActiveType
}
