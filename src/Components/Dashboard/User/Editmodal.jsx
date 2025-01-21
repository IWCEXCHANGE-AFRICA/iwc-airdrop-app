import React from 'react'
import { Box, Typography, Grid, TextField, Button, Modal } from '@mui/material'
import useStyles from './styles'

const EditUserModal = ({ open, onClose, user, onChange, onUpdate }) => {
  const classes = useStyles()

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={classes.modal}>
        <Typography variant='h6' className={classes.title}>
          Edit User
        </Typography>
        {user && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                label='Name'
                value={user.name}
                onChange={e => onChange('name', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                label='Email'
                value={user.email}
                onChange={e => onChange('email', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                label='Username'
                value={user.username}
                onChange={e => onChange('username', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                label='Points'
                type='number'
                value={user.points}
                onChange={e => onChange('points', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='contained'
                fullWidth
                onClick={onUpdate}
                className={classes.updateButton}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>
    </Modal>
  )
}

export default EditUserModal
