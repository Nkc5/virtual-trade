import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex flex-wrap justify-between items-center"> {/* Responsive navbar */}
      <div className="text-white font-bold text-xl"> {/* Brand/Logo */}
        <Link to="/" className="no-underline">Virtual Trade</Link> {/* Added no-underline class */}
      </div>
      <div className="flex space-x-4"> {/* Navigation links */}
        <Link to="/" className="text-gray-300 hover:text-white no-underline">
          Home
        </Link>
        <Link to="/login" className="text-gray-300 hover:text-white no-underline">
          Login
        </Link>
        <Link to="/register" className="text-gray-300 hover:text-white no-underline">
          Register
        </Link>
        <Link to="/dashboard" className="text-gray-300 hover:text-white no-underline">
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;