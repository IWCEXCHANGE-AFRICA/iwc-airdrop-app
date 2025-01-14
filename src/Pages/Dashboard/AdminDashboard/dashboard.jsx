import React, { useState } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import SummaryCards from '../../../Components/Dashboard/SummaryCards'
import ParticipantsTable from '../../../Components/Dashboard/ParticipantsTable'

const initialParticipants = [
  { id: 1, wallet: '0x1234...abcd', tokens: 150, status: 'Eligible' },
  { id: 2, wallet: '0x5678...efgh', tokens: 0, status: 'Not Eligible' },
  { id: 3, wallet: '0x9101...ijkl', tokens: 200, status: 'Claimed' }
]

const IwcAirdropDashboard = () => {
  const [participants, setParticipants] = useState(initialParticipants)

  return (
    <Box
      sx={{
        backgroundColor: '#E6E6FA', // Improved contrast
        color: 'white',
        minHeight: '100vh',
        width: '100%',
        p: 3
      }}
    >
      <Typography variant='h4' color='rgb(42, 27, 8)' gutterBottom>
        IWC Airdrop Dashboard
      </Typography>

      {/* Summary Cards Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SummaryCards
            title='Total Participants'
            value={participants.length}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SummaryCards
            title='Total Tokens'
            value={participants.reduce(
              (acc, participant) => acc + participant.tokens,
              0
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SummaryCards
            title='Eligible Participants'
            value={participants.filter(p => p.status === 'Eligible').length}
          />
        </Grid>
      </Grid>

      {/* Participants Table Section */}
      <Typography variant='h6' gutterBottom mt={4}>
        Participants
      </Typography>
      <ParticipantsTable
        participants={participants}
        setParticipants={setParticipants}
      />

      {/* Announcements Section */}
      <Box mt={4}>
        <Typography variant='h6'>Announcements</Typography>
        <Typography variant='body1'>
          Airdrop ends on 31st December 2024. Make sure to claim your tokens!
        </Typography>
      </Box>
    </Box>
  )
}

export default IwcAirdropDashboard
