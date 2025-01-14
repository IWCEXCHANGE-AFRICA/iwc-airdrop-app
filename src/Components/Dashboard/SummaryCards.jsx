import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

const SummaryCards = ({ title, value }) => {
  return (
    <Card
      sx={{
        backgroundColor: 'rgb(86, 55, 15)',
        color: 'white',
        padding: 2
      }}
    >
      <CardContent>
        <Typography variant='h6'>{title}</Typography>
        <Typography variant='h4'>{value}</Typography>
      </CardContent>
    </Card>
  )
}

export default SummaryCards
