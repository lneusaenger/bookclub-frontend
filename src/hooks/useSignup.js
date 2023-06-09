import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { getProxyURL } from '../helpers/proxy';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  // Function to handle navigation to the Home page
  const goToHome = () => {
    window.location.href = "/";
  }

  const signup = async (email, password, name) => {
    setIsLoading(true)
    setError(null)

    const res = await fetch(getProxyURL() + '/api/email/' + email)
    const data = await res.json();
    if(res.ok){
      const response = await fetch(getProxyURL() + '/api/user/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password, name})
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
    else if(!res.ok){
      setIsLoading(false)
      setError(data.error)
    }
  }

  return { signup, isLoading, error }
}