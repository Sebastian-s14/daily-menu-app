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
import { useNavigate } from 'react-router-dom'

import { IUser } from '../../shared/interfaces'
import { UserContext } from '../context'

interface CardUserProps {
  user: IUser
}
export const CardUser = ({ user }: CardUserProps) => {
  const { setActiveUser, setUserAlertDialog, setUserModal } =
    useContext(UserContext)

  const navigate = useNavigate()

  const handleDelete = () => {
    setActiveUser(user)
    setUserAlertDialog(true)
  }

  const handleSelect = () => navigate(`user/${user.id}`)

  const handleEdit = () => {
    setActiveUser(user)
    setUserModal(true)
  }

  return (
    <ListItem
      secondaryAction={
        <Box>
          <IconButton aria-label="edit" onClick={handleEdit}>
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
          <Avatar sx={{ bgcolor: user.type === '2' ? red[500] : yellow[600] }}>
            {user.type === '2' ? <EngineeringIcon /> : <PersonIcon />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={user.name} />
      </ListItemButton>
    </ListItem>
  )
}
