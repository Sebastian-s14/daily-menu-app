import AddIcon from '@mui/icons-material/Add'
import EngineeringIcon from '@mui/icons-material/Engineering'
import PersonIcon from '@mui/icons-material/Person'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { red, yellow } from '@mui/material/colors'
import Fab from '@mui/material/Fab'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import {
  collection,
  // getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { db } from '../../firebase'
import { CreateEditRecordDialog, RecordItem } from '../../records/components'
import { RecordContext } from '../../records/context'
import { useRecords } from '../../records/hooks'
import { AlertDialog } from '../../shared/components'
import { IRecord } from '../../shared/interfaces'
import { UserContext } from '../context'
import { useUsers } from '../hooks'

// console.log(dayjs.locale())

export const UserDetail = () => {
  const { userId } = useParams<'userId'>()
  const [records, setRecords] = useState<IRecord[]>()
  const [isLoading, setIsLoading] = useState(true)
  const { activeUser, setActiveUser } = useContext(UserContext)

  const {
    activeRecord,
    recordModal,
    recordAlertDialog,
    setRecordModal,
    setActiveRecord,
    setRecordAlertDialog,
  } = useContext(RecordContext)

  const { deleteRecord } = useRecords()
  const { getUser } = useUsers()

  const handleAddItem = () => {
    setRecordModal(true)
    setActiveRecord(undefined)
  }

  const handleDeleteRecord = async () => {
    // console.log({ activeUser })
    if (activeRecord?.id) {
      await deleteRecord(activeRecord.id)
      setRecordAlertDialog(false)
    }
  }

  useEffect(() => {
    userId &&
      getUser(userId)
        .then((user) => {
          // setUser(user)
          setActiveUser(user)
          setIsLoading(false)
        })
        .catch(() => {
          // setUser(undefined)
          setActiveUser(undefined)
          setIsLoading(false)
        })
    return () => setActiveUser(undefined)
    // return () => {
    //   setRecordModal(false)
    // }
  }, [getUser, userId, setActiveUser])

  useEffect(() => {
    let unsuscribe
    if (userId !== undefined) {
      const q = query(
        collection(db, `history/${userId}/records`),
        // where('date', '<=', new Date()),
        // where('date', '>=', new Date('2022-09-25T00:44:22.053Z')),
        // where('price', '>', 9),
        // orderBy('price'),
        // orderBy('userId'),
        orderBy('date', 'desc'),
      )
      unsuscribe = onSnapshot(q, (querySnapshot) => {
        // const data = querySnapshot.docs.map((doc) => ({
        //   id: doc.id,
        //   ...doc.data(),
        //   // date: doc.data().date.toDate(),
        // }))
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date.toDate(),
        }))
        console.log('call function')
        console.log({ data2: data })
        setRecords(data as IRecord[])
      })
    }
    return unsuscribe
  }, [userId])

  // const getRecords = useCallback(async () => {
  //   if (activeUser?.id) {
  //     console.log('GET records')
  //     const collectionRef = collection(db, `history/${activeUser.id}/records`)
  //     const docs = await getDocs(collectionRef)
  //     console.log(docs)
  //     const records2: any[] = []
  //     docs.forEach((doc) => {
  //       records2.push({ id: doc.id, ...doc.data() })
  //     })
  //     console.log({ records2 })
  //   }
  // }, [activeUser?.id])

  // useEffect(() => {
  //   getRecords()
  // }, [getRecords])

  if (isLoading)
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <CircularProgress size={90} />
      </Box>
    )

  return (
    <Box>
      <div>
        {/* <h5>id: {userId}</h5> */}
        <h2>Nombre: {activeUser?.name}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Typography variant="h5">Tipo:</Typography>
          {activeUser?.type === '1' ? (
            <PersonIcon fontSize="large" sx={{ color: yellow[600] }} />
          ) : (
            <EngineeringIcon fontSize="large" sx={{ color: red[500] }} />
          )}
        </div>
      </div>
      <span>Historial</span>
      <List>
        {records?.map((record) => (
          <RecordItem key={record.id} record={record} />
        ))}
      </List>
      <Box
        sx={{
          position: 'fixed',
          bottom: {
            xs: '.5rem',
            md: '1rem',
          },
          right: {
            xs: '.5rem',
            md: '1rem',
          },
        }}
      >
        <Fab color="primary" aria-label="add" onClick={handleAddItem}>
          <AddIcon />
        </Fab>
      </Box>
      <CreateEditRecordDialog
        isOpen={recordModal}
        key={activeRecord?.id}
        userId={activeUser?.id}
        handleClose={() => setRecordModal(false)}
      />
      <AlertDialog
        title="¿Está seguro de eliminar el registro?"
        isOpen={recordAlertDialog}
        handleClose={() => setRecordAlertDialog(false)}
        handleAccept={handleDeleteRecord}
      />
    </Box>
  )
}

export default UserDetail
