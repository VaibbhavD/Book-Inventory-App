import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaEye, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Popup from "./Popup";

const BookTable = ({ setIsModalOpen, setSelectedBook, setBooks, book }) => {
  const [selectedBookToDelete, setSelectedBookToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = book.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(book.length / booksPerPage);

  const handleDelete = async () => {
    const data = JSON.parse(localStorage.getItem("books"));
    const updatedBooks = data.filter((b) => b.id !== selectedBookToDelete.id);
    setBooks(updatedBooks);
    if (updatedBooks.length === 0) {
      localStorage.removeItem("books");
    } else {
      localStorage.setItem("books", JSON.stringify(updatedBooks));
    }
    toast.success("Book deleted successfully");
    setSelectedBookToDelete(null);
  };

  const handleUpdate = (book) => {
    setIsModalOpen(true);
    setSelectedBook(book);
  };

  const handleOpenDeleteConfirm = (book) => {
    setSelectedBookToDelete(book);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="overflow-x-auto p-4">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-stone-100 text-primary text-center">
              {["Image", "Title", "Author", "Publisher", "Publish Date", "View", "Actions"].map((header, index) => (
                <th key={index} className="py-3 px-4 w-1/7 text-sm font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book) => (
              <tr key={book.id} className="border-b text-center">
                <td className="py-3 px-4">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded border mx-auto"
                    loading="lazy"
                  />
                </td>
                <td className="py-3 px-4 text-sm">{book.title}</td>
                <td className="py-3 px-4 text-sm">{book.author}</td>
                <td className="py-3 px-4 text-sm">{book.publisher}</td>
                <td className="py-3 px-4 text-sm">{book.publishedDate}</td>
                <td className="py-3 px-4">
                  <Link
                    to={`/book/${book.id}`}
                    className="bg-blue-500 p-2 rounded-md text-white text-xs flex items-center justify-center gap-1 hover:scale-105 transition-transform"
                  >
                    <FaEye /> View
                  </Link>
                </td>
                <td className="py-3 px-4 space-x-2 gap-3">
                  <button
                    onClick={() => handleUpdate(book)}
                    className="text-yellow-500 hover:text-yellow-700 transition-transform hover:scale-110"
                  >
                    <FaEdit className="text-lg" />
                  </button>
                  <button
                    onClick={() => handleOpenDeleteConfirm(book)}
                    className="text-red-500 hover:text-red-700 transition-transform hover:scale-110"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          <FaArrowLeft />
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded-md text-sm font-semibold ${
              currentPage === index + 1
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          <FaArrowRight />
        </button>
      </div>

      <div className="text-center mt-2 text-gray-600 font-medium">
        Page {currentPage} of {totalPages}
      </div>

      {selectedBookToDelete && (
        <Popup
          confirmDelete={handleDelete}
          setIsDeleteConfirmOpen={setSelectedBookToDelete}
          book={selectedBookToDelete}
        />
      )}
    </>
  );
};

export default BookTable;
