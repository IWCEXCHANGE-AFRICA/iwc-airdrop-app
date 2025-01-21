import { useState } from 'react'
import { Box, Button, Typography, Stack, Tab, Tabs } from '@mui/material'
import logoImage from "../../../../src/assets/logo.png"
import Carousel from '../../../Components/Homepage/carousel'
import { useClaimbyID } from '../../../Hooks/Claim'

const DailyTasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      category: 'Basic Task',
      title: 'Daily Check-in',
      reward: '+1M',
      description: 'Log in daily to claim your reward.',
      claimed: false
    },
    {
      id: 2,
      category: 'Social Media Task',
      title: 'Tap Tap Tripps',
      reward: '+50K',
      description: 'Play Tap Tap Tripps to earn coins.',
      claimed: false
    },
    {
      id: 3,
      category: 'Social Media Task',
      title: 'Like the tweet',
      reward: '+10K',
      description: 'Like and retweet the provided tweet.',
      claimed: false
    },
    {
      id: 4,
      category: 'Social Media Task',
      title: 'Comment tweet',
      reward: '+20K',
      description: 'Retweet and comment on the tweet.',
      claimed: false
    },
    {
      id: 5,
      category: 'YouTube Task',
      title: 'Share a Post',
      reward: '+10K',
      description: 'Share and react to the social media post.',
      claimed: false
    }
  ])

  const [selectedTab, setSelectedTab] = useState(0)
  const { claimTask } = useClaimbyID()

  const handleClaim = async taskId => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, claimed: 'pending' } // Mark as pending while waiting
          : task
      )
    )

    try {
      const userData = { taskId } // Replace with actual user data
      const { success } = await claimTask(userData)

      if (success) {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === taskId
              ? { ...task, claimed: true } // Mark as successfully claimed
              : task
          )
        )
      }
    } catch (error) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId
            ? { ...task, claimed: false } // Reset the task if an error occurs
            : task
        )
      )
      console.error('Error claiming task:', error)
    }
  }

  const filteredTasks = tasks.filter(
    task =>
      task.category ===
      ['Basic Task', 'Social Media Task', 'YouTube Task'][selectedTab]
  )

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url(${logoImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        minHeight: '100vh',
        padding: 2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Adjust transparency of the black overlay
        backgroundBlendMode: 'darken' // Blend the image and black overlay
      }}
    >
      {/* Overlay to darken background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fully black background
          zIndex: 1 // Ensure overlay is above background but below content
        }}
      ></Box>

      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Carousel />
      </Box>

      {/* Tabs Section */}
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Tabs
          value={selectedTab}
          onChange={(event, newValue) => setSelectedTab(newValue)}
          indicatorColor='#FFC107'
          textColor='black'
          color='black'
          variant='fullWidth'
          aria-label='task categories'
          sx={{
            marginBottom: 1,
            '& .MuiTabs-indicator': {
              backgroundColor: 'yellow'
            }
          }}
        >
          <Tab label='Basic Task' />
          <Tab label='Social Media Task' />
          <Tab label='YouTube Task' />
        </Tabs>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          zIndex: 2 // Ensure tasks are above overlay and other background elements
        }}
      >
        {filteredTasks.map(task => (
          <Box
            key={task.id}
            sx={{
              backgroundColor: '#1a1a1a',
              borderRadius: 2,
              padding: 1.5,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column', // Set the flex direction to column for content stacking
              alignItems: 'center',
              height: 'auto',
              overflow: 'hidden',
              textAlign: 'center',
              zIndex: 2 // Ensure tasks are above the background overlay
            }}
          >
            <Stack
              direction='row' // Align title and reward in a row
              display='flex'
              justifyContent='space-between' // Space between title and reward
              alignItems='center'
              sx={{
                gap: 1,
                width: '100%' // Ensure stack takes full width
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='body1' sx={{ fontSize: '0.7rem' }}>
                  {task.title}
                </Typography>
                <Typography
                  variant='body2'
                  color='gold'
                  sx={{
                    fontSize: '0.5rem',
                    marginLeft: 0.5
                  }} // Add a small margin between title and reward
                >
                  {task.reward}
                </Typography>
              </Box>

              <Button
                variant='contained'
                sx={{
                  borderRadius: 100,
                  backgroundColor:
                    task.claimed === 'pending'
                      ? '#FFD700'
                      : task.claimed
                      ? '#4CAF50'
                      : '#FFC107', // Green when successfully claimed, yellow when pending
                  fontSize: '0.6rem',
                  '&:hover': {
                    backgroundColor:
                      task.claimed === 'pending'
                        ? '#FFC107'
                        : task.claimed
                        ? '#388E3C'
                        : '#FFC107'
                  }
                }}
                onClick={() => handleClaim(task.id)}
                disabled={task.claimed === 'pending' || task.claimed}
              >
                {task.claimed === 'pending'
                  ? 'Claiming...'
                  : task.claimed
                  ? 'Claimed'
                  : 'Start'}
              </Button>
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default DailyTasks
