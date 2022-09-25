import { IUser } from '../../shared/interfaces'
import { UserState } from './UserProvider'

type UserActionType =
  | { type: 'SET USER MODAL'; payload: boolean }
  | {
      type: 'SET ACTIVE USER'
      payload: IUser | undefined
    }
  | {
      type: 'SET USER ALERT DIALOG'
      payload: boolean
    }

export const userReducer = (
  state: UserState,
  action: UserActionType,
): UserState => {
  switch (action.type) {
    case 'SET USER MODAL':
      return {
        ...state,
        userModal: action.payload,
      }
    case 'SET ACTIVE USER':
      return {
        ...state,
        activeUser: action.payload,
      }
    case 'SET USER ALERT DIALOG':
      return {
        ...state,
        userAlertDialog: action.payload,
      }

    default:
      return state
  }
}
