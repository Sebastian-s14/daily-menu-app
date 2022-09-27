import { useCallback, useReducer } from 'react'
// import { useSnackbar } from 'notistack'

import { recordReducer, RecordContext } from '.'
import { IRecord } from '../../shared/interfaces'

export interface RecordState {
  recordModal: boolean
  recordAlertDialog: boolean
  activeRecord?: IRecord
}

const RECORD_INITIAL_STATE: RecordState = {
  recordModal: false,
  recordAlertDialog: false,
  activeRecord: undefined,
}

export const RecordProvider = ({
  children,
}: // eslint-disable-next-line @typescript-eslint/ban-types
React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(recordReducer, RECORD_INITIAL_STATE)
  // const { enqueueSnackbar } = useSnackbar()

  // const setAuthUser = (user: IAuthUser) => {
  //   dispatch({ type: 'SET USER', payload: user })
  // }

  const setRecordModal = useCallback((value: boolean) => {
    dispatch({ type: 'SET RECORD MODAL', payload: value })
  }, [])

  const setRecordAlertDialog = useCallback((value: boolean) => {
    dispatch({ type: 'SET RECORD ALERT DIALOG', payload: value })
  }, [])

  const setActiveRecord = useCallback((user?: IRecord) => {
    dispatch({ type: 'SET ACTIVE RECORD', payload: user })
  }, [])
  return (
    <RecordContext.Provider
      value={{
        ...state,
        setRecordModal,
        setRecordAlertDialog,
        setActiveRecord,
      }}
    >
      {children}
    </RecordContext.Provider>
  )
}
