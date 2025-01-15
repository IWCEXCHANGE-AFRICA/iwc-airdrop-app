import { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../config/path'
import { toast } from 'react-toastify'

const useTaskApi = () => {
  const [loading, setLoading] = useState(false)

  // Fetch task by ID
  const fetchTaskById = async (taskId, setTaskData) => {
    setLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/api/tasks/${taskId}`)
      setTaskData(response.data)
    } catch (error) {
      console.error('Error fetching task:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Submit task (either create or update)
  // Submit task (either create or update)
  const submitTask = async (taskData, taskId, isEditMode, setTaskData) => {
    setLoading(true)
    try {
      const response = isEditMode
        ? await axios.put(`/api/tasks/${taskId}`, taskData) // PUT for update
        : await axios.post('/api/tasks', taskData) // POST for creating new task
      setTaskData(response.data) // Update task data state
    } catch (error) {
      console.error('Error submitting task:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { fetchTaskById, submitTask, loading }
}

export default useTaskApi
