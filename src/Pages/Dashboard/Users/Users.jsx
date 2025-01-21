import React, { useState } from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material'
import EditUserModal from '../../../Components/Dashboard/User/Editmodal'

const initialUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    points: 250,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    username: 'janesmith',
    points: 180,
    status: 'Inactive'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    username: 'alicej',
    points: 320,
    status: 'Active'
  },
  {
    id: 4,
    name: 'Bob Brown',
    email: 'bob@example.com',
    username: 'bobbrown',
    points: 100,
    status: 'Pending'
  }
]

const Users = () => {
  const [users, setUsers] = useState(initialUsers)
  const [openModal, setOpenModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const handleOpenModal = user => {
    setSelectedUser(user)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setSelectedUser(null)
    setOpenModal(false)
  }

  const handleUpdateUser = () => {
    if (selectedUser) {
      const updatedUsers = users.map(user =>
        user.id === selectedUser.id ? selectedUser : user
      )
      setUsers(updatedUsers)
      handleCloseModal()
    }
  }

  const handleInputChange = (field, value) => {
    setSelectedUser(prevState => ({
      ...prevState,
      [field]: value
    }))
  }

  const handleDeleteUser = userId => {
    const updatedUsers = users.filter(user => user.id !== userId)
    setUsers(updatedUsers)
  }

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        color: 'black',
        minHeight: '100vh',
        p: 3
      }}
    >
      <Typography variant='h4' color='rgb(42, 27, 8)' gutterBottom>
        Users Management
      </Typography>

      {/* Users Table */}
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.points}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell align='center'>
                  <Button
                    variant='contained'
                    size='small'
                    sx={{ backgroundColor: 'rgb(42, 27, 8)', color: '#fff' }}
                    onClick={() => handleOpenModal(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='outlined'
                    size='small'
                    color='error'
                    sx={{ ml: 1 }}
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit User Modal */}
      <EditUserModal
        open={openModal}
        onClose={handleCloseModal}
        user={selectedUser}
        onChange={handleInputChange}
        onUpdate={handleUpdateUser}
      />
    </Box>
  )
}

export default Users
