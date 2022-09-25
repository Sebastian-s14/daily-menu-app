import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import List from '@mui/material/List'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'

import { db } from '../../firebase'
import { IUser } from '../../shared/interfaces'

import { CardUser, CreateEditUserDialog } from '../components'
import { UserContext } from '../context'
// import { useUsers } from '../hooks'

export const UsersPage = () => {
  const [users, setUsers] = useState<IUser[]>()
  const { userModal, setUserModal, setActiveUser, activeUser } =
    useContext(UserContext)

  const handleAdduser = () => {
    setUserModal(true)
    setActiveUser(undefined)
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
    const q = query(collection(db, 'users'))
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
      {/* All users */}
      {/* Bienvenid@, {user?.name}
      <br />
      {user?.email}
      <br /> */}
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
      <Box
        sx={{
          overflowY: 'auto',
          padding: '1rem',
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
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
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
    </>
  )
}
