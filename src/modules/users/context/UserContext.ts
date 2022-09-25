import { createContext } from 'react'
import { IUser } from '../../shared/interfaces'

interface UserContextProps {
  userModal: boolean
  activeUser?: IUser
  setUserModal: (value: boolean) => void
  setActiveUser: (user?: IUser) => void
  // setUserUser: (user: IUserUser) => void
  // addNewEntry: (description: string) => void
  // updateEntry: (entry: Entry, showSnackbar?: boolean) => void
}

export const UserContext = createContext({} as UserContextProps)
