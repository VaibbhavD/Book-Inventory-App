import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

const BookTable = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: { stringValue: "Book 1" },
      author: { stringValue: "Author 1" },
      stock: { integerValue: 10 },
      image: { stringValue: "https://via.placeholder.com/50" },
    },
    {
      id: 2,
      title: { stringValue: "Book 2" },
      author: { stringValue: "Author 2" },
      stock: { integerValue: 10 },
      image: { stringValue: "https://via.placeholder.com/50" },
    },
  ]);

  const handleDelete = async (id) => {
    toast.success("Book deleted successfully");
    console.log(id);
  };

  const handleUpdate = (book) => {
    toast.success("Book Updated successfully");
    console.log(book);
  };

  return (
    <div className="overflow-x-auto p-6">
      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-stone-100 text-primary">
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Author</th>
            <th className="py-2 px-4">Available</th>
            <th className="py-2 px-4"></th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="text-sm border-b text-center">
              <td className="py-2 px-4  flex items-center gap-2">
                <img
                  src="https://tse1.mm.bing.net/th?id=OIP.VUur7KSOIcdFCTvmXKluSQHaHa&pid=Api&P=0&h=180"
                  alt={book.title.stringValue}
                  className="w-10 h-10 rounded"
                />
                {book.title.stringValue}
              </td>
              <td className="py-2 px-4">{book.author.stringValue}</td>
              <td className="py-2 px-4">{book.stock.integerValue}</td>
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
