import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { yellow, green } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import dayjs from 'dayjs'
import { useContext, useMemo } from 'react'
// import Divider from '@mui/material/Divider'

import { IRecord } from '../../shared/interfaces'
import { RecordContext } from '../context'

interface CardUserProps {
  record: IRecord
}

export const RecordItem = ({ record }: CardUserProps) => {
  const { setRecordModal, setActiveRecord, setRecordAlertDialog } =
    useContext(RecordContext)
  const convertDate = useMemo(
    () => dayjs(record.date).format('DD/MM/YYYY hh:mm a'),
    [record.date],
  )

  const handleEditRecord = () => {
    // console.log(dayjs(date))
    setRecordModal(true)
    setActiveRecord(record)
  }

  const handleDeleteRecord = () => {
    setActiveRecord(record)
    setRecordAlertDialog(true)
  }

  return (
    <>
      <ListItem
        sx={{
          backgroundColor: record.completed ? green[100] : yellow[100],
          borderBottom: '1px solid black',
        }}
        secondaryAction={
          <>
            <IconButton aria-label="edit" onClick={handleEditRecord}>
              <EditIcon sx={{ color: yellow[600] }} />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleDeleteRecord}>
              <DeleteIcon color="error" />
            </IconButton>
          </>
        }
      >
        <ListItemButton onClick={handleEditRecord}>
          {/* <ListItemAvatar>
            <Avatar sx={{ bgcolor: user.type === '2' ? red[500] : '' }}>
              {user.type === '2' ? <EngineeringIcon /> : <PersonIcon />}
            </Avatar>
          </ListItemAvatar> */}
          <ListItemText
            primary={convertDate}
            secondary={
              <>
                <span>{record.detail}</span>
                <br />
                <b>
                  {record.completed
                    ? 'Pagado'
                    : `Pendiente  |  S/. ${record.price}`}
                </b>
              </>
            }
          />
        </ListItemButton>
      </ListItem>
      {/* <Divider variant="middle" /> */}
    </>
  )
}
