import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useGoogleSignIn } from "../hooks/useGoogleSignIn"; // Import the Google Sign-In hook
import { GoogleLogin } from '@react-oauth/google'; // Import Google Login component if using a library

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, error, isLoading} = useLogin();
    const { googleSignIn, isLoading: googleLoading, error: googleError } = useGoogleSignIn(); // Use the Google Sign-In hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await login(email, password)
    };

    const handleGoogleSuccess = async (response) => {
        const { credential } = response; // Extract the credential (token ID) from the response
        await googleSignIn(credential); // Call the googleSignIn function with the token
    };

    const handleGoogleFailure = (response) => {
        console.error("Google Sign-In failed:", response);
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen" style={{ color: "black" }}>
            <section className="bg-light-gray px-6 py-20 mx-4 w-full flex flex-col md:flex-row justify-center items-center">
                <div className="md:w-1/2 mx-5 flex flex-col justify-center items-center text-center md:text-left">
                    <h1 className="text-3xl text-teal-dark md:text-4xl font-bold my-6">
                        Campusify
                    </h1>
                    <p className="text-gray-700 mb-6">
                        Transform your college journey into a rewarding adventure with
                        gamified learning, social connections, and goal tracking—all in one
                        place.
                    </p>
                    <div className="border-b-2 border-gray-300 my-4 mx-1"></div>
                    <p className="mb-4">
                        Stay on top of classes, assignments, and deadlines while earning
                        rewards, connecting with peers, and making every achievement count.
                        Dive into a vibrant community where learning meets fun!
                    </p>
                </div>
                <div className="md:w-1/2 mb-4 mx-1 md:mt-0 flex justify-center items-center mt-8 md:mt-0">
                    <div className="form-wrapper w-full max-w-sm">
                        <form className="login bg-white p-8 rounded shadow-md" onSubmit={handleSubmit}>
                            <h3 className="text-2xl text-gray-800 font-semibold mb-4">Log In</h3>
                            <label className="block mb-2 text-gray-600">Email address:</label>
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="border rounded w-full p-2 mb-4 bg-white"
                            />
                            <label className="block mb-2 text-gray-600">Password:</label>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="border rounded w-full p-2 mb-4 bg-white"
                            />
                            <button className="bg-teal-600 hover:bg-teal-700 text-white rounded w-full py-2 transition duration-200" disabled={isLoading}>
                                Log in
                            </button>
                            {error && <p className="text-red-500 mt-4">{error}</p>}
                        </form>
                        {/* Google Sign-In Button */}
                        <div className="mt-4">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess} // Ensure the prop is named correctly
                                onFailure={handleGoogleFailure} // Ensure the prop is named correctly
                                logoAlignment="left" // Align the logo to the left (optional)
                                style={{ width: '100%' }} // Make the button full width
                                disabled={googleLoading}
                            />
                            {googleError && <p className="text-red-500">{googleError}</p>}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
