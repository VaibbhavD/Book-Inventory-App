import React from 'react';

function Popup({ confirmDelete, setIsDeleteConfirmOpen }) {
  // Handle closing popup when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsDeleteConfirmOpen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
      aria-labelledby="popup-title"
      aria-describedby="popup-description"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <h3 id="popup-title" className="text-lg font-semibold mb-4 text-center">
          Are you sure you want to delete this book?
        </h3>
        <div id="popup-description" className="flex justify-center space-x-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={confirmDelete}
          >
            Yes
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setIsDeleteConfirmOpen(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
