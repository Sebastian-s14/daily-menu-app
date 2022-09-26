import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import Fab from '@mui/material/Fab'
import CircularProgress from '@mui/material/CircularProgress'

import { IUser } from '../../shared/interfaces'
import { useUsers } from '../hooks'

export const UserDetail = () => {
  const { userId } = useParams<'userId'>()
  const [user, setUser] = useState<IUser>()
  const [isLoading, setIsLoading] = useState(true)
  const { getUser } = useUsers()

  const handleAddItem = () => {
    console.log('handleAddItem')
  }

  useEffect(() => {
    userId &&
      getUser(userId)
        .then((user) => {
          setUser(user)
          setIsLoading(false)
        })
        .catch(() => {
          setUser(undefined)
          setIsLoading(false)
        })
  }, [getUser, userId])

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
        <h5>id: {userId}</h5>
        <h2>Nombre: {user?.name}</h2>
      </div>
      <span>Historial</span>
      <Box>items</Box>
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
    </Box>
  )
}

export default UserDetail
