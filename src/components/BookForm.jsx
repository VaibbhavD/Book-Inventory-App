import React, { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Memoizing book types to prevent unnecessary re-renders
const bookTypes = [
  "Fiction",
  "Non-Fiction",
  "Biography",
  "Mystery",
  "Sci-Fi",
  "Fantasy",
  "Self-Help",
];

const BookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    image: null,
    publishedDate: "",
    publisher: "",
    description: "",
    bookType: "",
    reviews: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result, // Storing base64 string directly in formData
        }));
      };
    }
  };

  const handleRating = (index) => {
    setFormData((prev) => ({
      ...prev,
      reviews: index, // Directly updating the reviews in formData
    }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
        storedBooks.push({ ...formData, id: storedBooks.length });
        localStorage.setItem("books", JSON.stringify(storedBooks));
        navigate("/");
        toast.success("Book added successfully");
      } catch (error) {
        toast.error("Failed to add book");
      }
    },
    [formData, navigate]
  );

  return (
    <div className="max-w-lg mx-auto mt-4 p-6 bg-white shadow-xl rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
        📚 Add New Book
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Book Title"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />

        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author Name"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />

        <label className="block text-gray-600 font-semibold">Upload Book Cover:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded-lg bg-gray-100"
        />
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="mt-2 w-24 h-32 object-cover rounded-lg shadow-md"
          />
        )}

        <input
          type="date"
          name="publishedDate"
          value={formData.publishedDate}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />

        <input
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          placeholder="Publisher"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Book Description"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          rows="4"
          required
        />

        <select
          name="bookType"
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

        <div className="flex items-center space-x-1">
          <span className="text-gray-600 font-semibold">Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-2xl ${formData.reviews >= star ? "text-yellow-500" : "text-gray-300"}`}
              onClick={() => handleRating(star)}
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg shadow-md transition hover:scale-105"
        >
          ➕ Add Book
        </button>
      </form>
    </div>
  );
};

export default BookForm;
