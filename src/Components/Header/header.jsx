import React from 'react'
import { Toolbar, IconButton, AppBar, Typography } from '@mui/material'
import { Close, MoreVert, Logout } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../../stores/slices/userSlice'

const Header = () => {
  const navigate = useNavigate()
  const _dispatch = useDispatch()

  function logout () {
    _dispatch(clearUser())
    navigate('/')
  }

  const user = useSelector(state => state.user)

  return (
    <AppBar position='static' sx={{ backgroundColor: '#D0A106', height: 50 }}>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          {user?.name}
        </Typography>
        <IconButton onClick={logout}>
          <Logout />
        </IconButton>
        <Close />
      </Toolbar>
    </AppBar>
  )
}

export default Header
