import { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../config/path'
import { toast } from 'react-toastify'

export const useClaimTask = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const claimTask = async userData => {
    setLoading(true)
    setError(null)

    console.log('Task Claim Data:', userData)

    try {
      // API request to claim task
      const response = await axios.post(
        `${BASE_URL}/hourlytasks/claim`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      console.log('Claim Task Response:', response)

      if (response.status === 201) {
        toast.success('IWC Airdrop successful!')
        return { success: true, data: response.data } // Return success and data
      } else {
        throw new Error(response.data?.message || 'Task claim failed.')
      }
    } catch (err) {
      const errMsg =
        err.response?.data?.message || err.message || 'Network or server error'

      setError(errMsg) // Update error state
      toast.error(errMsg)
      return { success: false, error: errMsg } // Return error
    } finally {
      setLoading(false)
    }
  }

  return { claimTask, loading, error }
}

export const useClaimbyID = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const claimTask = async userData => {
    setLoading(true)
    setError(null)

    console.log('Task Claim Data:', userData)

    try {
      // API request to claim task
      const response = await axios.post(
        `${BASE_URL}/tasks/claim/:id
`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      console.log('Claim Task Response:', response)

      // Validate the response structure
      if (response?.status === 201 && response?.data) {
        toast.success('IWC Airdrop successful!')
        return { success: true, data: response.data } // Return success and data
      } else {
        const errorMessage = response?.data?.message || 'Task claim failed.'
        throw new Error(errorMessage)
      }
    } catch (err) {
      const errMsg =
        err?.response?.data?.message || err.message || 'Network or server error'

      setError(errMsg) // Update error state
      toast.error(errMsg)
      return { success: false, error: errMsg } // Return error
    } finally {
      setLoading(false)
    }
  }

  return { claimTask, loading, error }
}
