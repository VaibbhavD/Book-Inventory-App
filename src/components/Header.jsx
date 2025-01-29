import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBook } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-primary text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Book Inventory</h1>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-1 text-white hover:text-gray-200">
            <FaHome /> <span>Home</span>
          </Link>
          <Link to="/add-book" className="flex items-center space-x-1 text-white hover:text-gray-200">
            <FaBook /> <span>Add Book</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
