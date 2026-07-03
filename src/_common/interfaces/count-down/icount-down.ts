export interface ICountDown {
  event: {
    id: number
    name: string
    description: string
    date: string
    userId: number
  }
  daysUntil: number
}