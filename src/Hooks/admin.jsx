// import { useState } from 'react'
// import axios from 'axios'
// import { BASE_URL } from '../config/path'
// import { toast } from 'react-toastify'

// // Axios instance configuration
// const api = axios.create({
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })

// // Hook for adding a task
// export const useAddTask = () => {
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   const addTask = async newTask => {
//     setLoading(true)
//     setError(null)

//     try {
//       const response = await api.post(`${BASE_URL}tasks/add`, newTask) // Fixed the URL here

//       if (response.status === 201) {
//         toast.success('Task added successfully!')
//         return { success: true, data: response.data }
//       } else {
//         throw new Error(response.data?.message || 'Task addition failed.')
//       }
//     } catch (err) {
//       const errMsg =
//         err.response?.data?.message || err.message || 'Network or server error'
//       setError(errMsg)
//       toast.error(errMsg)
//       return { success: false, error: errMsg }
//     } finally {
//       setLoading(false)
//     }
//   }

//   return { addTask, loading, error }
// }

// // // Hook for updating a task
// // export const useUpdateTask = () => {
// //   const [loading, setLoading] = useState(false)
// //   const [error, setError] = useState(null)

// //   const updateTask = async ({ id, updatedTask }) => {
// //     setLoading(true)
// //     setError(null)

// //     try {
// //       const response = await api.put(`/tasks/update/${id}`, updatedTask)

// //       if (response.status === 200) {
// //         toast.success('Task updated successfully!')
// //         return { success: true, data: response.data }
// //       } else {
// //         throw new Error(response.data?.message || 'Task update failed.')
// //       }
// //     } catch (err) {
// //       const errMsg =
// //         err.response?.data?.message || err.message || 'Network or server error'
// //       setError(errMsg)
// //       toast.error(errMsg)
// //       return { success: false, error: errMsg }
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return { updateTask, loading, error }
// // }

// // // Hook for getting all tasks
// // export const useGetAllTasks = () => {
// //   const [loading, setLoading] = useState(false)
// //   const [error, setError] = useState(null)
// //   const [tasks, setTasks] = useState([])

// //   const getAllTasks = async () => {
// //     setLoading(true)
// //     setError(null)

// //     try {
// //       const response = await api.get('/tasks/getAlladd')

// //       if (response.status === 200) {
// //         setTasks(response.data)
// //         return { success: true, data: response.data }
// //       } else {
// //         throw new Error('Failed to fetch tasks.')
// //       }
// //     } catch (err) {
// //       const errMsg =
// //         err.response?.data?.message || err.message || 'Network or server error'
// //       setError(errMsg)
// //       toast.error(errMsg)
// //       return { success: false, error: errMsg }
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return { tasks, getAllTasks, loading, error }
// // }

// // // Hook for getting a task by ID
// // export const useGetTaskById = id => {
// //   const [loading, setLoading] = useState(false)
// //   const [error, setError] = useState(null)
// //   const [task, setTask] = useState(null)

// //   const getTaskById = async () => {
// //     setLoading(true)
// //     setError(null)

// //     try {
// //       const response = await api.get(`/tasks/getTask/${id}`)

// //       if (response.status === 200) {
// //         setTask(response.data)
// //         return { success: true, data: response.data }
// //       } else {
// //         throw new Error('Failed to fetch task.')
// //       }
// //     } catch (err) {
// //       const errMsg =
// //         err.response?.data?.message || err.message || 'Network or server error'
// //       setError(errMsg)
// //       toast.error(errMsg)
// //       return { success: false, error: errMsg }
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return { task, getTaskById, loading, error }
// // }

// // // Hook for deleting a task
// // export const useDeleteTask = () => {
// //   const [loading, setLoading] = useState(false)
// //   const [error, setError] = useState(null)

// //   const deleteTask = async id => {
// //     setLoading(true)
// //     setError(null)

// //     try {
// //       const response = await api.delete(`/tasks/delete/${id}`)

// //       if (response.status === 200) {
// //         toast.success('Task deleted successfully!')
// //         return { success: true, data: response.data }
// //       } else {
// //         throw new Error('Failed to delete task.')
// //       }
// //     } catch (err) {
// //       const errMsg =
// //         err.response?.data?.message || err.message || 'Network or server error'
// //       setError(errMsg)
// //       toast.error(errMsg)
// //       return { success: false, error: errMsg }
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return { deleteTask, loading, error }
// // }
