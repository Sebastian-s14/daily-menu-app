import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import EngineeringIcon from '@mui/icons-material/Engineering'
import PersonIcon from '@mui/icons-material/Person'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import { red, yellow } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { useContext } from 'react'

import { IUser } from '../../shared/interfaces'
import { UserContext } from '../context'
// import { useUsers } from '../hooks'

interface CardUserProps {
  user: IUser
}
export const CardUser = ({ user }: CardUserProps) => {
  const { setUserModal, setActiveUser, setUserAlertDialog } =
    useContext(UserContext)

  // const { deleteUser } = useUsers()

  const handleDelete = () => {
    // deleteUser(user.id)
    setActiveUser(user)
    setUserAlertDialog(true)
  }

  const handleSelect = () => {
    setActiveUser(user)
    setUserModal(true)
  }

  return (
    <ListItem
      secondaryAction={
        <Box>
          <IconButton aria-label="edit" onClick={handleSelect}>
            <EditIcon sx={{ color: yellow[600] }} />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      }
    >
      <ListItemButton onClick={handleSelect}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: user.type === '2' ? red[500] : '' }}>
            {user.type === '2' ? <EngineeringIcon /> : <PersonIcon />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={user.name} />
      </ListItemButton>
    </ListItem>
  )
}
