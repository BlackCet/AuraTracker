import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useGoogleSignIn = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const googleSignIn = async (tokenId) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/google/callback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: tokenId }), // Sending token to the backend
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message || 'Login failed');
      return;
    } else {
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
  };

  return { googleSignIn, isLoading, error };
};