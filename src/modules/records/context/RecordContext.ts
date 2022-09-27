import { createContext } from 'react'
import { IRecord } from '../../shared/interfaces'

interface RecordContextProps {
  recordModal: boolean
  recordAlertDialog: boolean
  activeRecord?: IRecord
  setActiveRecord: (user?: IRecord) => void
  setRecordModal: (value: boolean) => void
  setRecordAlertDialog: (value: boolean) => void
}

export const RecordContext = createContext({} as RecordContextProps)
