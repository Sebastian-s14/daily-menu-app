import { useCallback, useReducer } from 'react'
// import { useSnackbar } from 'notistack'

import { authReducer, AuthContext } from '.'
import { IAuthUser } from '../interfaces'

export interface AuthState {
  user?: IAuthUser
}

const AUTH_INITIAL_STATE: AuthState = {
  user: undefined,
}

export const AuthProvider = ({
  children,
}: // eslint-disable-next-line @typescript-eslint/ban-types
React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
  // const { enqueueSnackbar } = useSnackbar()

  // const setAuthUser = (user: IAuthUser) => {
  //   dispatch({ type: 'SET USER', payload: user })
  // }

  const setAuthUser = useCallback((user: IAuthUser) => {
    console.log('call function')
    dispatch({ type: 'SET USER', payload: user })
  }, [])

  // const addNewEntry = async (description: string) => {
  //     const { data } = await entriesApi.post<Entry>('/entries', {
  //         description,
  //     })
  //     dispatch({ type: '[ENTRIES] - Add Entry', payload: data })
  // }

  // const updateEntry = async (
  //     { _id, description, status }: Entry,
  //     showSnackbar = false,
  // ) => {
  //     try {
  //         const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
  //             description,
  //             status,
  //         })
  //         dispatch({ type: '[ENTRIES] - Entry-Updated', payload: data })
  //         if (showSnackbar)
  //             enqueueSnackbar('Entrada actualizada', {
  //                 variant: 'success',
  //                 autoHideDuration: 1500,
  //                 anchorOrigin: {
  //                     vertical: 'top',
  //                     horizontal: 'right',
  //                 },
  //             })
  //     } catch (error) {
  //         console.log({ error })
  //     }
  // }

  // const refreshEntries = async () => {
  //     const { data } = await entriesApi.get<Entry[]>('/entries')
  //     dispatch({ type: '[ENTRIES] - Refresh-data', payload: data })
  // }

  // useEffect(() => {
  //     refreshEntries()
  // }, [])

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setAuthUser,
        // addNewEntry,
        // updateEntry,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
