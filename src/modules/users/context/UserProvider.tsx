import { useCallback, useReducer } from 'react'
// import { useSnackbar } from 'notistack'

import { userReducer, UserContext } from '.'
import { IUser, IUserRecord } from '../../shared/interfaces'

export interface UserState {
  userModal: boolean
  userAlertDialog: boolean
  activeUser?: IUser
  activeUserHistory?: IUserRecord
}

const USER_INITIAL_STATE: UserState = {
  userModal: false,
  userAlertDialog: false,
  activeUser: undefined,
  activeUserHistory: undefined,
}

export const UserProvider = ({
  children,
}: // eslint-disable-next-line @typescript-eslint/ban-types
React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(userReducer, USER_INITIAL_STATE)
  // const { enqueueSnackbar } = useSnackbar()

  // const setAuthUser = (user: IAuthUser) => {
  //   dispatch({ type: 'SET USER', payload: user })
  // }

  const setUserModal = useCallback((value: boolean) => {
    dispatch({ type: 'SET USER MODAL', payload: value })
  }, [])

  const setUserAlertDialog = useCallback((value: boolean) => {
    dispatch({ type: 'SET USER ALERT DIALOG', payload: value })
  }, [])

  const setActiveUser = useCallback((user?: IUser) => {
    dispatch({ type: 'SET ACTIVE USER', payload: user })
  }, [])

  const setActiveUserHistory = useCallback((userHistory?: IUserRecord) => {
    dispatch({ type: 'SET ACTIVE USER HISTORY', payload: userHistory })
  }, [])
  return (
    <UserContext.Provider
      value={{
        ...state,
        setUserModal,
        setUserAlertDialog,
        setActiveUser,
        setActiveUserHistory,
        // addNewEntry,
        // updateEntry,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
