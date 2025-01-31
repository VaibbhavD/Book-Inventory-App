import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Popup from "./Popup";

const BookTable = ({ setIsModalOpen, setSelectedBook, setBooks, book }) => {
  const [selectedBookToDelete, setSelectedBookToDelete] = useState(null);

  const handleDelete = async () => {
    const data = JSON.parse(localStorage.getItem("books"));
    const updatedBooks = data.filter(
      (book) => book.id !== selectedBookToDelete.id
    );
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

  return (
    <>
      <div className="overflow-x-auto p-6">
        <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-stone-100 text-primary">
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Author</th>
              <th className="py-2 px-4 text-left">Publisher</th>
              <th className="py-2 px-4 text-left">Publish Date</th>
              <th className="py-2 px-4 text-left"></th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {book.map((book) => (
              <tr key={book.id} className="text-sm border-b">
                <td className="py-2 px-4">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-16 h-16 md:w-24 md:h-24 object-cover rounded border"
                  />
                </td>
                <td className="py-2 px-4 text-left">{book.title}</td>
                <td className="py-2 px-4 text-left">{book.author}</td>
                <td className="py-2 px-4 text-left">{book.publisher}</td>
                <td className="py-2 px-4 text-left">{book.publishedDate}</td>
                <td className="py-2 px-4 text-left">
                  <Link
                    to={`/book/${book.id}`}
                    className="bg-blue-500 p-2 flex font-bold rounded-lg text-white items-center text-sm hover:scale-110"
                  >
                   <FaEye/> View
                  </Link>
                </td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleUpdate(book)}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    <FaEdit className="text-xl hover:scale-110" />
                  </button>
                  <button
                    onClick={() => handleOpenDeleteConfirm(book)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash className="text-lg hover:scale-110" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
