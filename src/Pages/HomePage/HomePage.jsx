const styles = {
  container: {
    padding: '16px',
    backgroundColor: '#121212',
    minHeight: '100vh',
    color: '#fff'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px'
  },
  balance: {
    color: '#D0A106',
    fontWeight: 'bold'
  },
  spinningAnimation: {
    width: '150px',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animation: 'spin 2s linear infinite', // Ensure the image spins
    margin: '0 auto', // Centers the container horizontally
    marginTop: '40px' // Adds space above the spinning container
  },
  miningDetails: {
    textAlign: 'center',
    marginTop: '32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Ensures the text is horizontally centered
    gap: '15px', // Optional: Adds spacing between elements
    animation: 'fadeIn 2s ease-in-out' // Add fade-in animation
  },
  buttonsStack: {
    marginTop: '16px',
    display: 'flex',
    justifyContent: 'center',
    gap: '16px'
  },
  boostButton: {
    backgroundColor: '#D0A106',
    color: '#000',
    borderRadius: '50px',
    fontWeight: 'bold',
    '&:hover': { backgroundColor: '#b78c07' }
  },
  claimButton: {
    backgroundColor: 'green',
    color: '#fff',
    borderRadius: '50px',
    fontWeight: 'bold',
    '&:disabled': { backgroundColor: '#333', color: '#fff' }
  },
  claimButtonDisabled: {
    backgroundColor: '#fff',
    color: '#fff',
    cursor: 'not-allowed'
  },
  claimButtonSuccess: {
    backgroundColor: 'green', // Green when claimed successfully
    color: '#fff',
    borderRadius: '50px',
    fontWeight: 'bold',
    '&:hover': { backgroundColor: '#388e3c' }
  },
  marquee: {
    marginTop: '32px',
    padding: '16px',
    borderRadius: '8px'
  }
}
import React, { useState, useEffect } from 'react'
import { Box, Button, Typography, Modal, TextField } from '@mui/material'
import { useSelector } from 'react-redux'
import CardCarousel from '../../Components/Homepage/carousel'
import { useClaimTask } from '../../Hooks/Claim'
import { toast } from 'react-toastify'

// Adding keyframes for spinning animation
const spinKeyframes = `@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`

// Adding keyframes for fade-in animation
const fadeInKeyframes = `@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}`

const HomePage = () => {
  const user = useSelector(state => state.user)
  const [balance, setBalance] = useState(120)
  const [mined, setMined] = useState(9)
  const [timer, setTimer] = useState(43200) // Timer countdown in seconds
  const [miningRate, setMiningRate] = useState(user?.mining_power)
  const [boostModalOpen, setBoostModalOpen] = useState(false)
  const [isClaimButtonDisabled, setIsClaimButtonDisabled] = useState(true) // Control Claim button state

  const { claimTask, loading, error } = useClaimTask() // Destructure from custom hook

  console.log(user)
  // Timer countdown logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0))
      }, 1000)

      return () => clearInterval(interval) // Cleanup interval
    } else {
      setIsClaimButtonDisabled(false) // Enable Claim button when timer reaches 0
    }
  }, [timer])

  // Format time function
  const formatTime = seconds => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs}hr(s) ${mins}m ${secs}s`
  }

  // Handle Boost Function
  const handleBoost = amount => {
    setBalance(balance + amount) // Add boost amount to balance
    setBoostModalOpen(false) // Close modal
  }

  // Handle Claim Function
  const handleClaim = async () => {
    if (isClaimButtonDisabled) return // Prevent clicking if disabled

    const userData = {
      balance,
      mined,
      timer,
      miningRate
    }

    // const { success, error } = await claimTask(userData)
    const success = true

    if (success) {
      toast.success('Task claimed successfully.')
      setTimer(10)
      setIsClaimButtonDisabled(true) // Disable Claim button
    } else {
      toast.error(error || 'Task claim failed.')
    }
  }

  return (
    <Box sx={styles.container}>
      {/* Inject keyframes for spinning and fade-in animations */}
      <style>{spinKeyframes}</style>
      <style>{fadeInKeyframes}</style>

      {/* Header Section */}
      <Box sx={styles.header}>
        <Typography variant='h5'>Account Balance</Typography>
        <Typography variant='h6' sx={styles.balance}>
          {balance.toLocaleString()} IWCP
        </Typography>
      </Box>

      {/* Spinning Wallet Image */}
      <Box sx={styles.spinningAnimation}>
        <img
          src='/src/Components/assets/logo.png' // Ensure logo.png is in the correct folder
          alt='Spinning Wallet'
          style={{ width: '100%', height: '100%' }}
        />
      </Box>

      {/* Mining Details */}
      <Box sx={styles.miningDetails}>
        <Typography variant='h6' fontWeight='bold'>
          IWCP Reward: {mined.toLocaleString()}
        </Typography>
        <Typography variant='subtitle1' sx={{ marginTop: 2 }}>
          Timer: {formatTime(timer)}
        </Typography>
        <Typography variant='subtitle1' sx={{ marginTop: 1 }}>
          Mining Rate: {miningRate} IWCP per hour
        </Typography>
      </Box>

      {/* Buttons */}
      <Box sx={styles.buttonsStack}>
        <Button
          variant='contained'
          sx={styles.boostButton}
          onClick={() => setBoostModalOpen(true)}
        >
          Boost
        </Button>
        <Button
          variant='contained'
          sx={styles.claimButton}
          onClick={handleClaim}
          disabled={isClaimButtonDisabled} // Disable button when timer is active
        >
          {isClaimButtonDisabled ? `Mining...` : 'Claim'}
        </Button>
      </Box>

      {/* Boost Modal */}
      <Modal open={boostModalOpen} onClose={() => setBoostModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            p: 4,
            bgcolor: '#222',
            color: '#fff',
            boxShadow: 24,
            borderRadius: '8px',
            width: '300px',
            textAlign: 'center'
          }}
        >
          <Typography variant='h6' mb={2}>
            Boost Options
          </Typography>
          <TextField
            fullWidth
            type='number'
            label='Amount (BNB or USDT)'
            sx={{ mb: 2 }}
          />
          <Button
            variant='contained'
            sx={styles.boostButton}
            fullWidth
            onClick={() => handleBoost(1000)} // Example amount
          >
            Deposit
          </Button>
        </Box>
      </Modal>

      {/* Scrolling Announcements */}
      <Box sx={styles.marquee}>
        <CardCarousel />
      </Box>
    </Box>
  )
}

export default HomePage
