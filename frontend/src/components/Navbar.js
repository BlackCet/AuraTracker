import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };

    return (
        <header className="bg-[#E2F1E7] shadow-md">
            <div className="container mx-auto px-10 py-4 flex justify-between items-center">
                {/* Logo as a ghost button */}
                <Link to="/" className="btn btn-ghost text-teal-600 font-bold text-lg">
                    Campusify
                </Link>

                {/* Navigation Links */}
                <nav className="hidden lg:flex flex-grow justify-center">
                    <ul className="flex space-x-6 items-center">
                        <li>
                            <Link to="/about" className="text-gray-800 hover:text-teal-600 transition duration-200">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/team" className="text-gray-800 hover:text-teal-600 transition duration-200">
                                Team
                            </Link>
                        </li>
                        {user && (
                            <li>
                                <Link to="/dashboard" className="text-gray-800 hover:text-teal-600 transition duration-200">
                                    Dashboard
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>

                {/* User Authentication Links and Email */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            {/* User Email Display */}
                            <span className="text-gray-800">Username: {user.username}</span>

                            {/* Logout Button */}
                            <button
                                onClick={handleClick}
                                className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 hover:shadow-md transition duration-200"
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Login and Signup Links */}
                            <Link
                                to="/login"
                                className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 hover:shadow-md transition duration-200"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 hover:shadow-md transition duration-200"
                            >
                                Signup
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="navbar-start lg:hidden">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/team">Team</Link></li>
                            {user && <li><Link to="/dashboard">Dashboard</Link></li>}
                            <li>
                                {user ? (
                                    <button onClick={handleClick}>Log out</button>
                                ) : (
                                    <>
                                        <Link to="/login">Login</Link>
                                        <Link to="/signup">Signup</Link>
                                    </>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
