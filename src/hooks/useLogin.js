import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { getProxyURL } from '../helpers/proxy'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  // Function to handle navigation to the Home page
  const goToHome = () => {
    window.location.href = "/";
  }

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(getProxyURL() + '/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password})
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
        goToHome()
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}