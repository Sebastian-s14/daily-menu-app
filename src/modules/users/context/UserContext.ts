import { createContext } from 'react'
import { IUser } from '../../shared/interfaces'

interface UserContextProps {
  userModal: boolean
  userAlertDialog: boolean
  activeUser?: IUser
  // activeUserHistory?: IUserRecord
  setUserModal: (value: boolean) => void
  setUserAlertDialog: (value: boolean) => void
  setActiveUser: (user?: IUser) => void
  // setActiveUserHistory: (user?: IUserRecord) => void
  // setUserUser: (user: IUserUser) => void
  // addNewEntry: (description: string) => void
  // updateEntry: (entry: Entry, showSnackbar?: boolean) => void
}

export const UserContext = createContext({} as UserContextProps)
