import { useState } from 'react'

const useTaskManager = () => {
  const [taskData, setTaskData] = useState({
    category: '',
    task_title: '',
    task_link: '',
    task_code: '',
    task_description: '',
    task_point: '',
    status: ''
  })

  // Handle input changes
  const handleInputChange = e => {
    const { name, value } = e.target
    setTaskData(prevData => ({
      ...prevData,
      [name]: value
    }))
    console.log('Input changed:', { name, value })
  }

  return {
    taskData,
    setTaskData,
    handleInputChange
  }
}

export default useTaskManager
