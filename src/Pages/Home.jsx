import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import BookTable from '../components/BookTable';

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
      setLoading(false); 
    } else {
      fetchBooks();
    }
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=javascript"
      );
      const fetchedBooks = response.data.items.map((item, index) => ({
        id: index,
        title: item.volumeInfo.title,
        image: item.volumeInfo.imageLinks?.smallThumbnail || "https://via.placeholder.com/150",
        author: item.volumeInfo.authors?.join(", ") || "Unknown",
        publishedDate: item.volumeInfo.publishedDate || "N/A",
        publisher: item.volumeInfo.publisher || "Unknown",
        description: item.volumeInfo.description || "N/A",
        reviews: Math.floor(Math.random() * 5),
        bookType:item.volumeInfo.categories[0] || "N/A",
      }));
  console.log(response.data.items[0].volumeInfo)
      setBooks(fetchedBooks);
      localStorage.setItem("books", JSON.stringify(fetchedBooks));
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false); 
    }
  };

  return (
    <div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <BookTable book={books} />
      )}
    </div>
  );
}

export default Home;
