import React from 'react'
import { TextField } from '@mui/material'
import { styled } from '@mui/system'

// Styled TextField
const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px', // Custom border radius
    height: '50px', // Reduced height
    '& fieldset': {
      borderColor: 'black' // Default border color
    },

    '&.Mui-focused fieldset': {
      borderColor: 'black', // Focused border color
      borderWidth: '1px' // Focused border width
    }
  }
}))

const LoginField = ({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
  type,
  ...props
}) => (
  <CustomTextField
    label={label}
    type={type} // Ensure 'type' is passed correctly
    variant='outlined'
    name={name} // Add 'name' to ensure it's handled correctly
    value={value} // Add 'value' so the field is controlled
    onChange={onChange}
    error={error}
    helperText={helperText}
    fullWidth
    required
    {...props}
  />
)

export default LoginField
