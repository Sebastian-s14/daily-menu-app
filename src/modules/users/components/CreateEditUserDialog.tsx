import EngineeringIcon from '@mui/icons-material/Engineering'
import PersonIcon from '@mui/icons-material/Person'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import { useContext } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Input } from '../../shared/components'
import { IUser } from '../../shared/interfaces'
import { UserContext } from '../context'
import { useUsers } from '../hooks'

interface CreateEditUserDialogProps {
  isOpen: boolean
  // setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleClose: () => void
}

export const CreateEditUserDialog = ({
  isOpen,
  handleClose,
}: CreateEditUserDialogProps) => {
  const { activeUser } = useContext(UserContext)
  const { addUser, updateUser } = useUsers()
  // console.count()

  const edit = Boolean(activeUser)

  // console.log({ edit })

  const { handleSubmit, control, reset } = useForm<IUser>({
    defaultValues: {
      id: edit ? activeUser?.id : '',
      name: edit ? activeUser?.name : '',
      cellphone: edit ? activeUser?.cellphone : '',
      type: edit ? activeUser?.type : '1',
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit: SubmitHandler<IUser> = async ({ id, ...formData }) => {
    console.log({ formData })

    if (formData.name.trim().length === 0)
      return toast.error('Complete el nombre')

    if (edit) {
      activeUser?.id &&
        updateUser(activeUser?.id, {
          ...formData,
          uppercaseName: formData.name.toUpperCase(),
        })
    } else {
      await addUser({ ...formData, uppercaseName: formData.name.toUpperCase() })
      reset()
    }

    handleClose()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth key={activeUser?.id}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {edit ? 'Editar' : 'Crear nuevo'} usuario {activeUser?.name}
        </DialogTitle>
        <DialogContent>
          <Input name="name" control={control} labelInput="Nombre" />
          <Controller
            name="cellphone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Teléfono"
                margin="dense"
                type="text"
                autoComplete="cellphone"
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  maxLength: 9,
                }}
              />
            )}
          />
          <Box
            sx={{
              paddingTop: '.2rem',
            }}
          >
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label={
                      <div style={{ display: 'flex', gap: '.5rem' }}>
                        <PersonIcon /> Obrero
                      </div>
                    }
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label={
                      <div style={{ display: 'flex', gap: '.5rem' }}>
                        <EngineeringIcon /> Ingeniero
                      </div>
                    }
                  />
                </RadioGroup>
              )}
            />
          </Box>
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
    </Dialog>
  )
}
