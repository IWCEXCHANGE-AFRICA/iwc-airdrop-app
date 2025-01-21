import { useState } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import SummaryCards from '../../Components/Dashboard/SummaryCards'
import ParticipantsTable from '../../Components/Dashboard/ParticipantsTable'

const initialParticipants = [
  {
    id: 1,
    Name: 'john john',
    email: 'hghjhjjjkj@gmail.com',
    Username: '@john1234',
    points: 150,
    status: 'Eligible'
  },
  {
    id: 2,
    Name: 'jane doe',
    email: 'janedoe@gmail.com',
    Username: '@jane5678',
    points: 120,
    status: 'Eligible'
  },
  {
    id: 3,
    Name: 'alice smith',
    email: 'alicesmith@gmail.com',
    Username: '@alice3456',
    points: 180,
    status: 'Ineligible'
  },
  {
    id: 4,
    Name: 'bob brown',
    email: 'bobbrown@gmail.com',
    Username: '@bob7890',
    points: 200,
    status: 'Eligible'
  }
]

const IwcAirdropDashboard = () => {
  const [participants, setParticipants] = useState(initialParticipants)

  return (
    <Box
      sx={{
        backgroundColor: '#E6E6FA', // Improved contrast
        color: 'black', // Changed to black for better readability
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
            title='Total Points'
            value={participants.reduce(
              (acc, participant) => acc + participant.points,
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
