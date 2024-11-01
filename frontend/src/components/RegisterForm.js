import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ onSwitch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Registration successful:", result);
        alert("Registration successful!");

        // Store token in local storage or state management if needed
        // const { token } = result;
        // localStorage.setItem('token', token);

        // Navigate to the Dashboard page
        navigate("/dashboard"); // Redirect to dashboard after registration
      } else {
        const errorMessage = result.error || "Registration failed";
        alert(errorMessage); // Display backend error message in an alert

        if (errorMessage.includes("Email already in use")) {
          setError("email", { type: "manual", message: errorMessage });
        } else if (errorMessage.includes("Username already in use")) {
          setError("username", { type: "manual", message: errorMessage });
        }
      }
    } catch (error) {
      console.error("Registration error:", error.message);
      alert("Registration error: " + error.message);
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl text-gray-800 font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="username"
            className={`border rounded w-full p-2 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`border rounded w-full p-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`border rounded w-full p-2 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white rounded w-full py-2 transition duration-200"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-gray-600">
        Already have an account? &nbsp;
        <button onClick={onSwitch} className="text-teal-600 hover:underline">
          Login
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
