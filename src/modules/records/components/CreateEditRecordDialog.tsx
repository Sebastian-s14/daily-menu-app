import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'
import dayjs, { Dayjs } from 'dayjs'
import { useContext } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { IRecord } from '../../shared/interfaces'
import { RecordContext } from '../context'
import { useRecords } from '../hooks'

interface CreateEditRecordDialogProps {
  userId?: string
  isOpen: boolean
  // setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleClose: () => void
}

export const CreateEditRecordDialog = ({
  userId,
  isOpen,
  handleClose,
}: CreateEditRecordDialogProps) => {
  const { activeRecord } = useContext(RecordContext)
  const { addRecord, updateRecord } = useRecords(userId)

  const edit = Boolean(activeRecord)

  const { handleSubmit, control, reset, watch } = useForm<IRecord>({
    defaultValues: {
      id: edit ? activeRecord?.id : '',
      detail: edit ? activeRecord?.detail : '',
      price: edit ? activeRecord?.price : 10,
      date: edit ? dayjs(activeRecord?.date) : dayjs(),
      completed: edit ? activeRecord?.completed : false,
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit: SubmitHandler<IRecord> = async ({ id, ...formData }) => {
    // console.log({ formData })
    const dateString = (formData.date as Dayjs).format()
    console.log({ dateString })

    // if (formData.detail.trim().length === 0)
    //   return toast.error('Complete el detalle')

    if (edit) {
      // activeUserHistory?.id &&
      // updateUser(activeUserHistory?.id, {
      //   ...formData,
      // })
      activeRecord?.id &&
        updateRecord(activeRecord.id, {
          ...formData,
          date: dateString,
          price: Number(formData.price),
        })
    } else {
      userId &&
        (await addRecord({
          ...formData,
          date: dateString,
          price: Number(formData.price),
          // userId,
        }))
      reset()
    }

    handleClose()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{edit ? 'Editar' : 'Crear nuevo'} registro</DialogTitle>
          <DialogContent>
            <Controller
              name="detail"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Detalle"
                  margin="dense"
                  type="text"
                  focused
                />
              )}
            />
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <MobileDateTimePicker
                  {...field}
                  // views={['month', 'day', 'hours', 'minutes']}
                  label="Fecha"
                  renderInput={(params) => (
                    <TextField {...params} fullWidth margin="dense" />
                  )}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                // <TextField
                //   {...field}
                //   fullWidth
                //   label="Precio"
                //   margin="dense"
                //   type="number"
                //   autoComplete="cellphone"
                //   inputProps={{
                //     inputMode: 'numeric',
                //     pattern: '[0-9]*',
                //     maxLength: 2,
                //   }}
                // />
                <FormControl margin="dense" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Precio
                  </InputLabel>
                  <OutlinedInput
                    {...field}
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      maxLength: 2,
                    }}
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">S/. </InputAdornment>
                    }
                    label="Precio"
                  />
                </FormControl>
              )}
            />
            <Controller
              name="completed"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Switch checked={watch('completed')} {...field} />}
                  label={watch('completed') ? 'Pagado' : 'No Pagado'}
                />
              )}
            />
            {/* </Box> */}
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
              Cancelar
            </Button>
            <Button color="success" type="submit">
              {edit ? 'Actualizar' : 'Agregar'}
            </Button>
          </DialogActions>
        </Box>
      </LocalizationProvider>
    </Dialog>
  )
}
