import React, { useState } from 'react'
import { Box, TextField, Button, Typography, Grid, Link } from '@mui/material'

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = () => {
    if (password === '' || confirmPassword === '') {
      setMessage('Please fill in both password fields.')
      return
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    // Handle password reset here (call to API)
    setMessage('Password has been successfully reset.')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 4
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          padding: 4,
          backgroundColor: '#fff',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
          textAlign: 'center'
        }}
      >
        <Typography variant='h5' component='h1' mb={2}>
          Reset Password
        </Typography>
        <Typography variant='body1' color='textSecondary' mb={4}>
          Please enter your new password below.
        </Typography>

        <Box component='form'>
          <TextField
            label='New Password'
            variant='outlined'
            fullWidth
            require
            type='password'
            value={password}
            onChange={handlePasswordChange}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#D0A106'
                },
                '&:hover fieldset': {
                  borderColor: '#b78c07'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#D0A106'
                }
              },
              '& .MuiInputBase-root': {
                height: 40,
                borderRadius: 50
              }
            }}
          />
          <TextField
            label='Confirm Password'
            variant='outlined'
            fullWidth
            required
            type='password'
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#D0A106'
                },
                '&:hover fieldset': {
                  borderColor: '#b78c07'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#D0A106'
                }
              },
              '& .MuiInputBase-root': {
                height: 40,
                borderRadius: 50
              }
            }}
          />
          {message && (
            <Typography
              variant='body2'
              color={message.includes('successfully') ? 'green' : 'red'}
              mb={2}
            >
              {message}
            </Typography>
          )}
          <Button
            variant='contained'
            onClick={handleSubmit}
            fullWidth
            sx={{
              py: 1.5,
              mb: 2,
              height: 40,
              textTransform: 'none',
              fontSize: '1rem',
              borderRadius: 50,
              backgroundColor: '#D0A106',
              '&:hover': {
                backgroundColor: '#b78c07'
              }
            }}
          >
            Reset Password
          </Button>
        </Box>

        <Grid container justifyContent='center'>
          <Link href='/' variant='body2' color='#D0A106'>
            Back to Login
          </Link>
        </Grid>
      </Box>
    </Box>
  )
}

export default ResetPasswordPage
