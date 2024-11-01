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
        <header className="bg-gray-100 shadow-md">
            <div className="container mx-auto px-10 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-teal-600 font-bold text-lg">
                    Campusify
                </Link>

                {/* Navigation Links */}
                <nav className="hidden lg:flex">
                    <ul className="flex space-x-6 items-center">
                        {user && <li>
                            <Link to="/dashboard" className="text-gray-800 hover:text-teal-600 transition duration-200">
                                Dashboard
                            </Link>
                        </li>}
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

                        {/* Conditional Rendering for User Authentication */}
                        {user ? (
                            <li className="flex items-center space-x-4">
                                {/* User Email Display */}
                                <span className="text-gray-800">{user.email}</span>

                                {/* Logout Button */}
                                <button
                                    onClick={handleClick}
                                    className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 hover:shadow-md transition duration-200"
                                >
                                    Log out
                                </button>
                            </li>
                        ) : (
                            <li className="flex space-x-4">
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
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
