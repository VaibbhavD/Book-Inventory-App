import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

const bookTypes = ["Fiction", "Non-Fiction", "Biography", "Mystery", "Sci-Fi", "Fantasy", "Self-Help"];

const BookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    image: null,
    reviews: 0,
    bookType: "",
    totalAvailable: "",
    description: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [rating, setRating] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRating = (index) => {
    setRating(index);
    setFormData({ ...formData, reviews: index });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("Book added successfully");
    console.log(formData)
  };

  return (
    <div className="max-w-lg mx-auto mt-4 p-6 bg-white shadow-xl rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">📚 Add New Book</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Book Title"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />

        {/* Author Input */}
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author Name"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />

        {/* Image Upload */}
        <label className="block text-gray-600 font-semibold">Upload Book Cover:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded-lg bg-gray-100"
        />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="mt-2 w-24 h-32 object-cover rounded-lg shadow-md" />
        )}

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Book Description"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          rows="4"
          required
        />

        {/* Book Type Dropdown */}
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

        {/* Total Available Input */}
        <input
          type="number"
          name="totalAvailable"
          min={0}
          value={formData.totalAvailable}
          onChange={handleChange}
          placeholder="Total Available Copies"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />

        {/* Star Rating */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg shadow-md transition"
        >
          ➕ Add Book
        </button>
      </form>
    </div>
  );
};

export default BookForm;
