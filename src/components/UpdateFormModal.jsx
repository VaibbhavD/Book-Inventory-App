import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

const bookTypes = [
  "Fiction",
  "Non-Fiction",
  "Biography",
  "Mystery",
  "Sci-Fi",
  "Fantasy",
  "Self-Help",
  "Computers",
];

const UpdateBookModal = ({ book, closeModal, setBooks }) => {
  const [formData, setFormData] = useState({
    id: book.id,
    title: book.title,
    author: book.author,
    image: book.image,
    publishedDate: book.publishedDate,
    publisher: book.publisher,
    description: book.description,
    reviews: book.reviews,
    bookType: book.bookType,
  });

  const [imagePreview, setImagePreview] = useState(book.image);
  const [rating, setRating] = useState(book.reviews);

  useEffect(() => {
    document.body.classList.add("overflow-hidden"); // Prevent background scrolling when modal is open
    return () => {
      document.body.classList.remove("overflow-hidden"); // Restore scrolling when modal is closed
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const render= new FileReader();
      render.readAsDataURL(file);
      render.onloadend = () => {
        setFormData({ ...formData, image: render.result });
        setImagePreview(render.result);
    }
  }
  };

  const handleRating = (index) => {
    setRating(index);
    setFormData({ ...formData, reviews: index });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const booksData = JSON.parse(localStorage.getItem("books")) || [];

    const updatedBooks = booksData.map((item) =>
      item.id === formData.id ? { ...item, ...formData } : item
    );

    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    toast.success("Book updated successfully");
    closeModal()
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center overflow-auto bg-black bg-opacity-50">
      <div className="bg-white mt-96 rounded-lg p-6 max-w-xl w-full shadow-lg pt-10 sm:p-4">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          📘 Update Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-gray-600 font-semibold"
            >
              Book Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Book Title"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-gray-600 font-semibold"
            >
              Author Name
            </label>
            <input
              type="text"
              name="author"
              id="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author Name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-gray-600 font-semibold"
            >
              Update Book Cover
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              id="image"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-lg bg-gray-100"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-24 h-32 object-cover rounded-lg shadow-md"
              />
            )}
          </div>

          <div>
            <label
              htmlFor="publishedDate"
              className="block text-gray-600 font-semibold"
            >
              Published Date
            </label>
            <input
              type="text"
              name="publishedDate"
              id="publishedDate"
              value={formData.publishedDate}
              onChange={handleChange}
              placeholder="Published Date"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="publisher"
              className="block text-gray-600 font-semibold"
            >
              Publisher
            </label>
            <input
              type="text"
              name="publisher"
              id="publisher"
              value={formData.publisher}
              onChange={handleChange}
              placeholder="Publisher"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-gray-600 font-semibold"
            >
              Book Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Book Description"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              rows="4"
              required
            />
          </div>

          <div>
            <label
              htmlFor="bookType"
              className="block text-gray-600 font-semibold"
            >
              Book Type
            </label>
            <select
              name="bookType"
              id="bookType"
              value={formData.bookType}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            >
              <option value="">Select Book Type</option>
              {bookTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-1">
            <span className="text-gray-600 font-semibold">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-2xl ${
                  rating >= star ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => handleRating(star)}
              />
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition w-full"
            >
              ✅ Update Book
            </button>
          </div>
        </form>

        <button
          onClick={closeModal}
          className="mt-4 text-red-500 w-full text-center block hover:underline"
        >
          ❌ Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateBookModal;
