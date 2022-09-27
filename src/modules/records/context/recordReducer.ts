import { IRecord } from '../../shared/interfaces'
import { RecordState } from './RecordProvider'

type RecordActionType =
  | { type: 'SET RECORD MODAL'; payload: boolean }
  | {
      type: 'SET RECORD ALERT DIALOG'
      payload: boolean
    }
  | {
      type: 'SET ACTIVE RECORD'
      payload: IRecord | undefined
    }

export const recordReducer = (
  state: RecordState,
  action: RecordActionType,
): RecordState => {
  switch (action.type) {
    case 'SET RECORD MODAL':
      return {
        ...state,
        recordModal: action.payload,
      }
    case 'SET RECORD ALERT DIALOG':
      return {
        ...state,
        recordAlertDialog: action.payload,
      }
    case 'SET ACTIVE RECORD':
      return {
        ...state,
        activeRecord: action.payload,
      }
    default:
      return state
  }
}
