import React, { useState } from 'react'
import { Box, TextField, Button, Typography, Grid, Link } from '@mui/material'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handleSubmit = () => {
    if (!email) {
      setMessage('Please enter a valid email address.')
      return
    }

    // Handle password reset request here
    setMessage('A password reset link has been sent to your email.')
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
          Forgot Password
        </Typography>
        <Typography variant='body1' color='textSecondary' mb={4}>
          Please enter your email address to receive a password reset link.
        </Typography>

        <Box component='form'>
          <TextField />
          {message && (
            <Typography
              variant='body2'
              color={message.includes('sent') ? 'green' : 'red'}
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
            Send Reset Link
          </Button>
        </Box>

        <Grid container justifyContent='center'>
          <Link href='/' variant='body2'>
            Back to Login
          </Link>
        </Grid>
      </Box>
    </Box>
  )
}

export default ForgotPassword
