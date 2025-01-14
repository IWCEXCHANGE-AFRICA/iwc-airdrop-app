import React from 'react'
import { Box } from '@mui/material'
import Header from '../Components/Header/header'
import Footer from '../Components/Footer/footer'
import { useLocation } from 'react-router-dom'

const Layout = ({ children }) => {
  const location = useLocation()

  const isAuthPage = ['/', '/sign-up'].includes(location.pathname.toLowerCase())

  return (
    <Box>
      {!isAuthPage && <Header />}
      <Box>{children}</Box>
      {!isAuthPage && <Footer />}
    </Box>
  )
}

export default Layout
