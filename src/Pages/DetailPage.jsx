import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit, FaTrash,FaArrowLeft } from "react-icons/fa";
import UpdateBookModal from "../components/UpdateFormModal"; // Ensure this component exists

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getBook = () => {
      try {
        const bookData = JSON.parse(localStorage.getItem("books")) || [];
        const selectedBook = bookData.find(
          (bookItem) =>
            console.log(bookItem.id, id) || bookItem.id === Number(id)
        );

        if (!selectedBook) {
          toast.error("Book not found");
          return;
        }
        setBook(selectedBook);
      } catch (error) {
        toast.error("Failed to fetch book details");
      }
    };

    getBook();
  }, [id]);

  const handleDelete = () => {
    try {
      const bookData = JSON.parse(localStorage.getItem("books")) || [];
      const updatedBooks = bookData.filter((bookItem) => bookItem.id !== id);
      localStorage.setItem("books", JSON.stringify(updatedBooks));

      toast.success("Book deleted successfully");
      navigate("/"); // Redirect to home after deletion
    } catch (error) {
      toast.error("Failed to delete book");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      {book ? (
        <div>
          <div className="flex space-x-4 my-2 justify-between">
            <div>
            <button
                onClick={() => navigate(-1)}
                className="text-primary rounded-full bg-gray-100 px-2 py-2 flex items-center space-x-2"
              >
                <FaArrowLeft />
              </button>
            </div>
            <div className="flex space-x-2">
              {" "}
              <button
                onClick={() => setIsModalOpen(true)}
                className="border-2 border-yellow-500 text-yellow-500 px-4 py-2 rounded flex items-center space-x-2"
              >
                <FaEdit />
              </button>
              <button
                onClick={handleDelete}
                className="border-2 border-red-500 text-red-500 px-4 py-2 rounded flex items-center space-x-2"
              >
                <FaTrash />
              </button>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <p className="text-gray-700 mb-2">
            <strong>Author:</strong> {book.author}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Book Type:</strong> {book.bookType}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Total Available:</strong> {book.totalAvailable}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Reviews:</strong> {book.reviews}
          </p>
          <p className="text-gray-700">
            <strong>Description:</strong> {book.description}
          </p>

          {isModalOpen && (
            <UpdateBookModal
              book={book}
              closeModal={() => setIsModalOpen(false)}
              refreshBooks={(updatedBook) => setBook(updatedBook)}
            />
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading book details...</p>
      )}
    </div>
  );
};

export default BookDetail;
