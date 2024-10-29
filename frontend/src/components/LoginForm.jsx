import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onSwitch }) => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
        const response = await axios.post(`http://localhost:4001/api/user/login`, data);
        const { token } = response.data;
        
        // Store token in local storage or state management
        localStorage.setItem('token', token);

        // Navigate to About page
        navigate('/about');
    } catch (error) {
        if (error.response) {
            setError('email', { type: 'manual', message: error.response.data.error || 'Login failed' });
            setError('password', { type: 'manual', message: error.response.data.error || 'Login failed' });
        } else {
            alert(error.message);
        }
    }
};

  return (
    <div className="bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl text-custom-gray font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            className={`border rounded w-full p-2 text-white ${errors.email ? 'border-red-500' : 'border-gray-300'}`} 
            {...register('email', { required: 'Email is required' })} 
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input 
            type="password" 
            id="password" 
            className={`border rounded w-full p-2 text-white ${errors.password ? 'border-red-500' : 'border-gray-300'}`} 
            {...register('password', { required: 'Password is required' })} 
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button 
          type="submit" 
          className="bg-teal-dark hover:bg-teal-light text-white rounded w-full py-2"
        >
          Login
        </button>
      </form>
      <p className="mt-4">
        Don't have an account? &nbsp;
        <button onClick={onSwitch} className="text-teal-dark">
          Register
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
