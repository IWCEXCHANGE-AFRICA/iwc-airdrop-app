import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Typography
} from '@mui/material'
import {
  Search as SearchIcon,
  AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material'

const AdminHeader = () => {
  return (
    <AppBar position='sticky' sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
      <Toolbar>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>

        {/* Search Field */}
        <div
          style={{
            position: 'relative',
            borderRadius: '4px',
            backgroundColor: '#fff',
            marginRight: '16px',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '8px'
          }}
        >
          <SearchIcon />
          <InputBase
            placeholder='Search…'
            inputProps={{ 'aria-label': 'search' }}
            sx={{ ml: 1, flex: 1 }}
          />
        </div>

        {/* Notifications Icon */}
        <IconButton color='inherit'>
          <Badge badgeContent={4} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* User Icon */}
        <IconButton color='inherit'>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default AdminHeader
