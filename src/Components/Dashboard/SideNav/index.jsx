import { Link } from 'react-router-dom'
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SettingsIcon from '@mui/icons-material/Settings'
import PeopleIcon from '@mui/icons-material/People'
import TaskIcon from '@mui/icons-material/Task'

const SideNav = () => {
  return (
    <Box
      sx={{
        width: 240,
        position: 'relative',
        height: '130vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingTop: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Box>
        <List>
          {/* Dashboard Button */}
          <ListItem
            button
            component={Link}
            to='/dashboard'
            sx={{
              border: '2px solid transparent',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgb(86, 55, 15)',
                border: '2px solid #ffffff',
                transform: 'scale(1.05)',
                transition: 'all 0.3s ease-in-out'
              },
              marginBottom: 1
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='Dashboard' sx={{ color: 'white' }} />
          </ListItem>

          {/* Users Button */}
          <ListItem
            button
            component={Link}
            to='/users'
            sx={{
              border: '2px solid transparent',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgb(86, 55, 15)',
                border: '2px solid #ffffff',
                transform: 'scale(1.05)',
                transition: 'all 0.3s ease-in-out'
              },
              marginBottom: 1
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary='Users' sx={{ color: 'white' }} />
          </ListItem>

          <ListItem
            button
            component={Link}
            to='/tasks'
            sx={{
              border: '2px solid transparent',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgb(86, 55, 15)',
                border: '2px solid #ffffff',
                transform: 'scale(1.05)',
                transition: 'all 0.3s ease-in-out'
              },
              marginBottom: 1
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <TaskIcon />
            </ListItemIcon>
            <ListItemText primary='Tasks' sx={{ color: 'white' }} />
          </ListItem>

          {/* Settings Button */}
          <ListItem
            button
            component={Link}
            to='/settings'
            sx={{
              border: '2px solid transparent',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgb(86, 55, 15)',
                border: '2px solid #ffffff',
                transform: 'scale(1.05)',
                transition: 'all 0.3s ease-in-out'
              },
              marginBottom: 1
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary='Settings' sx={{ color: 'white' }} />
          </ListItem>
        </List>
      </Box>
      <Box></Box>
    </Box>
  )
}

export default SideNav
