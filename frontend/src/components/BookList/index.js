import { useEffect, useState } from "react";
import BookCard from "../BookCard";
import "./index.css";

const API_BASE_URL = "http://localhost:3001";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState("LOADING");

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/books/`);
      const data = await res.json();
      setBooks(data);
      setStatus("SUCCESS");
    } catch (err) {
      console.error(err);
      setStatus("ERROR");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (status === "LOADING") return <p className="info-text">Loading...</p>;
  if (status === "ERROR") return <p className="info-text error">Failed to load books.</p>;

  return (
    <div className="book-list">
      {books.map(book => (
        <BookCard key={book.book_id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
