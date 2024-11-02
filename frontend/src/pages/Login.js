import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic validation
        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            await login(email, password);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen" style={{ color: "black" }}>
            <section className="bg-light-gray px-6 py-20 mx-4 w-full flex flex-col md:flex-row justify-center items-center">
                <div className="md:w-1/2 mx-5 flex flex-col justify-center items-center text-center md:text-left">
                    <h1 className="text-3xl text-teal-dark md:text-4xl font-bold my-6">Campusify</h1>
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
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
