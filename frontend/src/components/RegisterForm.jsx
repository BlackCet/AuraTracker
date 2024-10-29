import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const RegisterForm = ({ onSwitch }) => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();

  const onSubmit = async (data) => {
    try {
        const response = await axios.post("http://localhost:4001/api/user/signup", data);
        console.log('Registration successful:', response.data);
        alert('Registration successful!');
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            const errorMessage = error.response.data.error;
            alert(errorMessage); // Display backend error message in an alert
            if (errorMessage.includes('Email already in use')) {
                setError('email', { type: 'manual', message: errorMessage });
            } else if (errorMessage.includes('Username already in use')) {
                setError('username', { type: 'manual', message: errorMessage });
            }
        } else {
            console.error('Registration error:', error.message);
            alert('Registration error: ' + error.message);
        }
    }
};


  return (
    <div className="bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl text-custom-gray font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">Username</label>
          <input 
            type="text" 
            id="username" 
            className={`border rounded w-full p-2 text-white ${errors.username ? 'border-red-500' : 'border-gray-300'}`} 
            {...register('username', { required: 'Username is required' })} 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            className={`border rounded w-full p-2 text-white ${errors.email ? 'border-red-500' : 'border-gray-300'}`} 
            {...register('email', { required: 'Email is required' })} 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input 
            type="password" 
            id="password" 
            className={`border rounded w-full p-2 text-white ${errors.password ? 'border-red-500' : 'border-gray-300'}`} 
            {...register('password', { required: 'Password is required' })} 
          />
        </div>
        <button 
          type="submit" 
          className="bg-teal-dark hover:bg-teal-light text-white rounded w-full py-2"
        >
          Register
        </button>
      </form>
      <p className="mt-4">
        Already have an account? &nbsp;
        <button onClick={onSwitch} className="text-teal-dark">
          Login
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
