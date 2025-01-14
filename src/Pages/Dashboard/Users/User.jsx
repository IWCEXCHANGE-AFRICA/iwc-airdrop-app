import React, { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material'

const initialUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'Inactive'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Moderator',
    status: 'Active'
  },
  {
    id: 4,
    name: 'Bob Brown',
    email: 'bob@example.com',
    role: 'User',
    status: 'Pending'
  }
]

const Users = () => {
  const [users, setUsers] = useState(initialUsers)

  const handleAction = userId => {
    // Example function to perform actions like updating status or roles
    console.log(`Performing action for user ID: ${userId}`)
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
              <TableCell>Role</TableCell>
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
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell align='center'>
                  <Button
                    variant='contained'
                    size='small'
                    sx={{ backgroundColor: 'rgb(42, 27, 8)' }}
                    onClick={() => handleAction(user.id)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant='outlined'
                    size='small'
                    color='rgb(42, 27, 8)'
                    onClick={() => handleAction(user.id)}
                    sx={{ ml: 1 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Users
