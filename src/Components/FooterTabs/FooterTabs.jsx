import React from 'react'
import { Box, Tabs, Tab } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import { Link } from 'react-router-dom'

const FooterTabs = ({ iconSize = 16 }) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        backgroundColor: '#D0A106',
        padding: '4px 0',
        borderTop: '1px solid #ccc',
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{
          style: { display: 'none' },
          color: '#fff' // Optional: hide the indicator
        }}
        sx={{
          minHeight: 0
        }}
      >
        <Tab
          icon={<HomeIcon sx={{ fontSize: `${iconSize}px` }} />}
          label='Home'
          component={Link}
          to='/homepage'
          sx={{
            fontSize: '10px',
            minHeight: 0,
            padding: 0,
            textTransform: 'none'
          }}
        />
        <Tab
          icon={<MonetizationOnIcon sx={{ fontSize: `${iconSize}px` }} />}
          label='Task'
          component={Link}
          to='/task'
          sx={{
            fontSize: '10px',
            minHeight: 0,
            padding: 0,
            textTransform: 'none'
          }}
        />
        <Tab
          icon={<GroupAddIcon sx={{ fontSize: `${iconSize}px` }} />}
          label='Referral'
          component={Link}
          to='/friends-reward'
          sx={{
            fontSize: '10px',
            minHeight: 0,
            padding: 0,
            textTransform: 'none'
          }}
        />
      </Tabs>
    </Box>
  )
}

export default FooterTabs
