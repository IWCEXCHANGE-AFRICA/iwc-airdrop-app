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
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: '', color: 'white' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Wallet Address</TableCell>
            <TableCell>Tokens</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {participants.map(participant => (
            <TableRow key={participant.id}>
              <TableCell>{participant.wallet}</TableCell>
              <TableCell>{participant.tokens}</TableCell>
              <TableCell>{participant.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ParticipantsTable
