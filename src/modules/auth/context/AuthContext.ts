import { createContext } from 'react'
import { IAuthUser } from '../interfaces'

interface AuthContextProps {
  user?: IAuthUser
  setAuthUser: (user: IAuthUser) => void
  // addNewEntry: (description: string) => void
  // updateEntry: (entry: Entry, showSnackbar?: boolean) => void
}

export const AuthContext = createContext({} as AuthContextProps)
