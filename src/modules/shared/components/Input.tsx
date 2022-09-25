import TextField from '@mui/material/TextField'
import { useController, UseControllerProps } from 'react-hook-form'
import { IUser } from '../interfaces'

interface InputProps extends UseControllerProps<IUser> {
  // control: Control<IUser, any>
  // nameInput: string
  labelInput: string
}

export const Input = ({
  control,
  name,
  labelInput,
}: // defaultValue,
InputProps) => {
  // console.log({ control })
  const {
    field: { onChange, onBlur, value, ref },
    // fieldState: { invalid, isTouched, isDirty },
    // formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    // rules: { required: true },
    // defaultValue,
  })
  // console.log({ value })

  return (
    <TextField
      onChange={onChange} // send value to hook form
      onBlur={onBlur} // notify when input is touched/blur
      value={value} // input value
      name={name} // send down the input name
      inputRef={ref} // send input ref, so we can focus on input when error appear
      fullWidth
      label={labelInput}
      margin="dense"
      // autoComplete="name2"
    />
  )
}
