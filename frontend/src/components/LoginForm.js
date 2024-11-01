import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onSwitch }) => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                const { token } = result;

                // Store token in local storage or state management
                localStorage.setItem('token', token);
                // Navigate to About page
                navigate('/dashboard'); // Redirect to dashboard after login
            } else {
                setError('email', { type: 'manual', message: result.error || 'Login failed' });
                setError('password', { type: 'manual', message: result.error || 'Login failed' });
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        }
    };

    return (
        <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl text-gray-800 font-semibold mb-4">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-gray-600">Email</label>
                    <input
                        type="email"
                        id="email"
                        className={`border rounded w-full p-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 text-gray-600">Password</label>
                    <input
                        type="password"
                        id="password"
                        className={`border rounded w-full p-2 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700 text-white rounded w-full py-2 transition duration-200"
                >
                    Login
                </button>
            </form>
            <p className="mt-4 text-gray-600">
                Don't have an account? &nbsp;
                <button onClick={onSwitch} className="text-teal-600 hover:underline">
                    Register
                </button>
            </p>
        </div>
    );
};

export default LoginForm;
