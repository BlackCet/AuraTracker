import React from 'react';

function Navbar({ toggleForm, isLogin }) { // Accept isLogin as a prop
    return (
        <div className="bg-gray-100" style={{ color: 'black' }}>
            <div className="navbar px-10 py-4 shadow-md">
                <div className="navbar-start flex items-center">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow" style={{ color: 'white' }}>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Dashboard</a></li>
                            <li><a href="#">Team</a></li>
                        </ul>
                    </div>
                    <a className="text-teal-dark font-bold ml-4">
                        Campusify
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal space-x-6">
                        <li>
                            <a
                                href="/home"
                                className="text-gray-800 transform hover:text-teal-dark hover:scale-110 transition duration-200"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="/about"
                                className="text-gray-800 transform hover:text-teal-dark hover:scale-110 transition duration-200"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-gray-800 transform hover:text-teal-dark hover:scale-110 transition duration-200"
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a
                                href="/team"
                                className="text-gray-800 transform hover:text-teal-dark hover:scale-110 transition duration-200"
                            >
                                Team
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <button
                        onClick={toggleForm} // Call toggleForm on button click
                        className="bg-teal-dark text-white px-6 py-2 rounded-full hidden md:inline-block mr-4 hover:bg-custom-gray hover:shadow-lg transform hover:scale-105 transition duration-200">
                        {isLogin ? 'Register' : 'Login'} {/* Change button text based on isLogin */}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
