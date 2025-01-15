import React, { useState } from 'react'
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Typography,
  Container,
  FormHelperText
} from '@mui/material'

const TaskForm = ({ onSubmit, initialData }) => {
  const [category, setCategory] = useState(initialData?.category || '')
  const [taskTitle, setTaskTitle] = useState(initialData?.task_title || '')
  const [taskLink, setTaskLink] = useState(initialData?.task_link || '')
  const [taskCode, setTaskCode] = useState(initialData?.task_code || '')
  const [taskDescription, setTaskDescription] = useState(
    initialData?.task_description || ''
  )
  const [taskPoint, setTaskPoint] = useState(initialData?.task_point || '')
  const [status, setStatus] = useState(initialData?.status || 0)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!category) newErrors.category = 'Category is required'
    if (!taskTitle) newErrors.taskTitle = 'Task Title is required'
    if (!taskPoint) newErrors.taskPoint = 'Task Points are required'
    return newErrors
  }

  const handleSubmit = () => {
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    onSubmit({
      category,
      task_title: taskTitle,
      task_link: taskLink,
      task_code: taskCode,
      task_description: taskDescription,
      task_point: taskPoint,
      status
    })
  }

  const fieldStyles = {
    width: '100%', // All fields take full width of the form container
    height: '40px' // Reduced height for compact fields
  }

  return (
    <Container
      maxWidth='sm'
      sx={{
        width: '100%', // Ensure it adapts to smaller screens
        maxWidth: '500px', // Set the maximum width for the form
        padding: '20px', // Add some padding
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Add a subtle shadow for a polished look
        borderRadius: '8px', // Slightly rounded corners
        backgroundColor: '#fff' // Optional: background color for the form
      }}
    >
      <Typography variant='h5' gutterBottom>
        {initialData ? 'Update Task' : 'Add New Task'}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label='Category'
            fullWidth
            sx={fieldStyles}
            value={category}
            onChange={e => setCategory(e.target.value)}
            error={!!errors.category}
            helperText={errors.category}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label='Task Title'
            fullWidth
            sx={fieldStyles}
            value={taskTitle}
            onChange={e => setTaskTitle(e.target.value)}
            error={!!errors.taskTitle}
            helperText={errors.taskTitle}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label='Task Link (Optional)'
            fullWidth
            sx={fieldStyles}
            value={taskLink}
            onChange={e => setTaskLink(e.target.value)}
            error={!!errors.taskLink}
            helperText={errors.taskLink}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label='Task Code (Optional)'
            fullWidth
            type='number'
            sx={fieldStyles}
            value={taskCode}
            onChange={e => setTaskCode(e.target.value)}
            error={!!errors.taskCode}
            helperText={errors.taskCode}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label='Task Description (Optional)'
            fullWidth
            multiline
            rows={3}
            sx={{ ...fieldStyles, height: 'auto' }}
            value={taskDescription}
            onChange={e => setTaskDescription(e.target.value)}
            error={!!errors.taskDescription}
            helperText={errors.taskDescription}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label='Task Points'
            fullWidth
            type='number'
            sx={fieldStyles}
            value={taskPoint}
            onChange={e => setTaskPoint(e.target.value)}
            error={!!errors.taskPoint}
            helperText={errors.taskPoint}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.status} sx={fieldStyles}>
            <InputLabel>Status (Optional)</InputLabel>
            <Select
              value={status}
              onChange={e => setStatus(e.target.value)}
              sx={{ height: '40px' }}
            >
              <MenuItem value={0}>Select Status</MenuItem>
              <MenuItem value={1}>Active</MenuItem>
              <MenuItem value={2}>Inactive</MenuItem>
            </Select>
            {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            sx={{ height: '40px' }}
            onClick={handleSubmit}
          >
            {initialData ? 'Update Task' : 'Add Task'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TaskForm
