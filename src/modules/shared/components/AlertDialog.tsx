import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'

interface AlertDialogProps {
  title: string
  isOpen: boolean
  handleClose: () => void
  handleAccept: () => void
}

export const AlertDialog = ({
  title,
  isOpen,
  handleClose,
  handleAccept,
}: AlertDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancelar
        </Button>
        <Button color="success" onClick={handleAccept}>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
