import { Dayjs } from 'dayjs'

export interface IRecord {
  id: string
  // userId: string
  price: number
  detail: string
  date: Dayjs | string
  completed: boolean
}
