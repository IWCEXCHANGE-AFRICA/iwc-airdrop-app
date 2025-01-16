import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'

const ParticipantsTable = ({ participants, setParticipants }) => {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#f5f5f5' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {participants.map(participant => (
            <TableRow key={participant.id}>
              <TableCell>{participant.id}</TableCell>
              <TableCell>{participant.Name}</TableCell>
              <TableCell>{participant.email}</TableCell>
              <TableCell>{participant.Username}</TableCell>
              <TableCell>{participant.points}</TableCell>
              <TableCell>{participant.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ParticipantsTable
