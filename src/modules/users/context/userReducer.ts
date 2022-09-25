import { IUser } from '../../shared/interfaces'
import { UserState } from './UserProvider'

type UserActionType =
  | { type: 'SET USER MODAL'; payload: boolean }
  | {
      type: 'SET ACTIVE USER'
      payload: IUser
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

    default:
      return state
  }
}
