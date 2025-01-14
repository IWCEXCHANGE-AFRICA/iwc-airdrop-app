import React, { useState, useEffect } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'

const BASE_URL = 'https://iwc-airdrop-backend-1.onrender.com/V1/tasks'

const TaskManager = ({ taskId, isEditMode = false }) => {
  const [taskData, setTaskData] = useState({
    category: '',
    task_title: '',
    task_link: '',
    task_code: '',
    task_description: '',
    task_point: '',
    status: ''
  })

  const [loading, setLoading] = useState(false)

  // Fetch task data if in edit mode
  useEffect(() => {
    if (isEditMode && taskId) {
      fetchTaskById()
    }
  }, [isEditMode, taskId])

  const fetchTaskById = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}/getTask/${taskId}`)
      const { success, data } = response.data
      if (success) {
        setTaskData(data)
      } else {
        toast.error('Failed to fetch task data')
      }
    } catch (error) {
      toast.error('An error occurred while fetching task data')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setTaskData({ ...taskData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const endpoint = isEditMode ? `/update/${taskId}` : '/add'
    const method = isEditMode ? 'put' : 'post'

    try {
      setLoading(true)
      const response = await axios[method](`${BASE_URL}${endpoint}`, taskData)
      const { success, message } = response.data
      if (success) {
        toast.success(message)
        if (!isEditMode) {
          setTaskData({
            category: '',
            task_title: '',
            task_link: '',
            task_code: '',
            task_description: '',
            task_point: '',
            status: ''
          })
        }
      } else {
        toast.error('Failed to save task')
      }
    } catch (error) {
      toast.error('An error occurred while saving task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 600,
        mx: 'auto',
        backgroundColor: '#f9f9f9',
        borderRadius: 4
      }}
    >
      <Typography variant='h5' mb={2}>
        {isEditMode ? 'Update Task' : 'Add Task'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label='Category'
          name='category'
          value={taskData.category}
          onChange={handleInputChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label='Task Title'
          name='task_title'
          value={taskData.task_title}
          onChange={handleInputChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label='Task Link (Optional)'
          name='task_link'
          value={taskData.task_link}
          onChange={handleInputChange}
          type='url'
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label='Task Code (Optional)'
          name='task_code'
          value={taskData.task_code}
          onChange={handleInputChange}
          type='number'
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label='Task Description (Optional)'
          name='task_description'
          value={taskData.task_description}
          onChange={handleInputChange}
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label='Task Points'
          name='task_point'
          value={taskData.task_point}
          onChange={handleInputChange}
          type='number'
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label='Status (Optional)'
          name='status'
          value={taskData.status}
          onChange={handleInputChange}
          type='number'
          sx={{ mb: 2 }}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={loading}
          fullWidth
        >
          {loading ? 'Saving...' : isEditMode ? 'Update Task' : 'Add Task'}
        </Button>
      </form>
    </Box>
  )
}

export default TaskManager
