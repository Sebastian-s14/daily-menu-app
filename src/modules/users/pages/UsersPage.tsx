import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import List from '@mui/material/List'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'

import { db } from '../../firebase'
import { AlertDialog } from '../../shared/components'
import { IUser } from '../../shared/interfaces'
import { CardUser, CreateEditUserDialog } from '../components'
import { UserContext } from '../context'
import { useUsers } from '../hooks'

export const UsersPage = () => {
  const [users, setUsers] = useState<IUser[]>()
  const {
    activeUser,
    userModal,
    userAlertDialog,
    setUserModal,
    setActiveUser,
    setUserAlertDialog,
  } = useContext(UserContext)

  const { deleteUser } = useUsers()

  const handleAdduser = () => {
    setUserModal(true)
    setActiveUser(undefined)
  }

  const handleDeleteUser = async () => {
    // console.log({ activeUser })
    if (activeUser?.id) {
      await deleteUser(activeUser.id)
      setUserAlertDialog(false)
    }
  }

  // if (users.length > 0)
  //   return (
  //     <Box
  //       sx={{
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         height: '100%',
  //       }}
  //     >
  //       <CircularProgress size={90} />
  //     </Box>
  //   )

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('uppercaseName'))
    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      console.log('call function')
      // console.log({ data })
      setUsers(data as IUser[])
    })
    return unsuscribe
  }, [])

  return (
    <>
      <Box
        sx={{
          overflowY: 'auto',
          paddingBottom: '.8rem',
        }}
      >
        <List>
          {users?.map((user) => (
            <CardUser key={user.id} user={user} />
          ))}
        </List>
      </Box>
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
        <Fab color="primary" aria-label="add" onClick={handleAdduser}>
          <AddIcon />
        </Fab>
      </Box>
      <CreateEditUserDialog
        key={activeUser?.id}
        isOpen={userModal}
        handleClose={() => setUserModal(false)}
      />
      <AlertDialog
        isOpen={userAlertDialog}
        handleClose={() => setUserAlertDialog(false)}
        handleAccept={handleDeleteUser}
      />
    </>
  )
}

export default UsersPage
