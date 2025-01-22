import React from 'react'
import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        p: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white', // Adjust text color to ensure contrast
        mt: 'auto'
      }}
    >
      <Typography variant='body2'>
        © {new Date().getFullYear()} Admin Dashboard. All rights reserved.
      </Typography>
    </Box>
  )
}

export default Footer
