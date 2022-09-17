import { IAuthUser } from '../interfaces'
import { AuthState } from './AuthProvider'

type UserActionType = { type: 'SET USER'; payload: IAuthUser }

export const authReducer = (
  state: AuthState,
  action: UserActionType,
): AuthState => {
  switch (action.type) {
    case 'SET USER':
      return {
        ...state,
        user: action.payload,
      }

    default:
      return state
  }
}
