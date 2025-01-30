import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateBookModal from "./UpdateFormModal";
import axios from "axios";

const BookTable = ({ book, setIsModalOpen, setSelectedBook }) => {
  const [books, setBooks] = useState(book);

  console.log(books);
  console.log(book);
  const handleDelete = async (id) => {
    toast.success("Book deleted successfully");
    console.log(id);
  };
  const handleUpdate = (book) => {
    setIsModalOpen(true);
    setSelectedBook(book);
  };

  return (
    <div className="overflow-x-auto p-6">
      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-stone-100 text-primary">
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Author</th>
            <th className="py-2 px-4">Publish Date</th>
            <th className="py-2 px-4"></th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="text-sm border-b text-center">
              <td className="py-2 px-4  flex items-center gap-4">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-20 h-20 rounded border"
                />
                {book.title}
              </td>
              <td className="py-2 px-4">{book.author}</td>
              <td className="py-2 px-4">{book.publishedDate}</td>
              <td className="py-2 px-4">
                <Link
                  to={`/book/${book.id}`}
                  className="bg-blue-500 p-2 rounded-lg text-white text-sm hover:underline"
                >
                  View
                </Link>
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleUpdate(book)}
                  className="text-yellow-500 hover:text-yellow-700 mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
