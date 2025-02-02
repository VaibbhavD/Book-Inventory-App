import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBook } from 'react-icons/fa';
import img from "../../public/image.png"

const Header = () => {
  return (
    <header className="bg-primary text-white p-4">
      <div className="max-w-8xl mx-auto md:mx-10 flex justify-between items-center">
        <h1 className="text-xl font-semibold flex gap-2"><img src={img} width={30} loading='lazy'/>Bookventory</h1>
        <nav className="flex items-center space-x-2 sm:space-x-4 md:space-x-8">
          <Link
            to="/"
            aria-label="Go to Home"
            className="flex items-center space-x-1 text-white hover:text-gray-200"
          >
            <FaHome /> <span>Home</span>
          </Link>
          <Link
            to="/add-book"
            aria-label="Go to Add Book"
            className="flex items-center space-x-1 text-white hover:text-gray-200"
          >
            <FaBook /> <span>Add Book</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
