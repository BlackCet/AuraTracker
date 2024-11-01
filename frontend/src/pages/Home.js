import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Home = () => {
    const [isLogin, setIsLogin] = useState(true);
    const toggleForm = () => {
        setIsLogin((prev) => !prev);
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center" style={{ color: 'black' }}>
            <section className="bg-light-gray px-6 py-20 mx-4 w-full flex flex-col md:flex-row justify-center items-center">
                <div className="md:w-1/2 mx-5 flex flex-col justify-center items-center text-center md:text-left">
                    <h1 className="text-3xl text-teal-dark md:text-4xl font-bold my-6">Campusify</h1>
                    <p className="text-gray-700 mb-6">
                        Transform your college journey into a rewarding adventure with gamified learning, social connections, and goal tracking—all in one place.
                    </p>
                    <div className="border-b-2 border-gray-300 my-4 mx-1"></div>
                    <p className="mb-4">
                        Stay on top of classes, assignments, and deadlines while earning rewards, connecting with peers, and making every achievement count. Dive into a vibrant community where learning meets fun!
                    </p>
                </div>
                <div className="md:w-1/2 mb-4 mx-1 md:mt-0 flex justify-center items-center mt-8 md:mt-0">
                    <div className="form-wrapper w-full max-w-sm">
                        {isLogin ? (
                            <LoginForm onSwitch={toggleForm} />
                        ) : (
                            <RegisterForm onSwitch={toggleForm} />
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
