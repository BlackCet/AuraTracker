import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async ( email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    
    else {
      // Combine token with user data
      const userWithToken = {
        ...json.user,
        token: json.token || json.user.token, // Assuming your server sends token in json.token or json.user.token
      };

      // Save the combined user object to local storage
      localStorage.setItem('user', JSON.stringify(userWithToken)); // Store combined user data

      // Dispatch action to update auth context
      dispatch({ type: 'LOGIN', payload: userWithToken });
      setIsLoading(false);
    }
  }

  return { login, isLoading, error }
}