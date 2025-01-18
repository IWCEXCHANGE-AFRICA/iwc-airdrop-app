import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Stack,
  IconButton,
  Divider
} from '@mui/material'
import { ContentCopy as CopyIcon } from '@mui/icons-material'
import { useSelector } from 'react-redux'

const FriendsReward = () => {
  const [friends, setFriends] = useState([
    { name: 'Alice', reward: 500 },
    { name: 'Bob', reward: 300 }
  ]) // Sample friends data

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode)
    alert('Referral code copied to clipboard!')
  }

  const userState = useSelector(state => state)
  const user = userState?.user
  const [referralCode, setReferralCode] = useState(user?.username) // Example code

  return (
    <Box
      sx={{
        backgroundColor: '#000',
        color: '#fff',
        padding: 3
      }}
    >
      {/* Header Section */}
      <Typography variant='h5' textAlign='center' mb={2}>
        Invite friends to get more <span style={{ color: '#D0A106' }}>IWCP</span>
      </Typography>
      <Typography variant='body2' textAlign='center' color='#888' mb={3}>
        Use your referral code to invite and earn rewards
      </Typography>

      {/* Referral Code Section */}
      <Box
        sx={{
          backgroundColor: '#1a1a1a',
          borderRadius: '12px',
          padding: 3,
          textAlign: 'center'
        }}
      >
        <Typography variant='subtitle1' mb={2}>
          Your Referral Code
        </Typography>
        <Stack
          direction='row'
          spacing={2}
          alignItems='center'
          justifyContent='center'
        >
          <TextField
            value={referralCode}
            InputProps={{
              readOnly: true,
              sx: {
                backgroundColor: '#333',
                color: '#fff',
                borderRadius: '5px',
                overflow: 'hidden'
              }
            }}
            size='small'
            sx={{ width: '60%' }} // Adjust width for better responsiveness
          />
          <IconButton
            onClick={handleCopyCode}
            sx={{
              color: '#D0A106',
              justifyContent: 'center'
            }}
          >
            <CopyIcon />
          </IconButton>
        </Stack>
        <Typography variant='body2' color='#888' mt={2}>
          Share this code with your friends to earn rewards!
        </Typography>
      </Box>

      {/* Friends List Section */}
      <Box mt={4}>
        {friends.length === 0 ? (
          <Typography variant='body2' color='#888' textAlign='center'>
            No friends invited yet
          </Typography>
        ) : (
          <Box>
            <Typography variant='subtitle1' mb={1}>
              Invited Friends
            </Typography>
            <Divider sx={{ backgroundColor: '#555', mb: 2 }} />
            {friends.map((friend, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 2,
                  backgroundColor: '#1a1a1a',
                  borderRadius: '10px',
                  marginBottom: 1
                }}
              >
                <Typography variant='body1'>{friend.name}</Typography>
                <Typography variant='body2' color='#D0A106'>
                  +{friend.reward} IWCP
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default FriendsReward
