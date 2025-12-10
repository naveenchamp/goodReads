import "./index.css";

const BookCard = ({book}) => {
  const shortDesc = book.description ? String(book.description).slice(0, 120) : "";
  return (
    <div className="book-card" data-id={book.book_id}>
      <h3 className="book-title">{book.title}</h3>
      <p className="book-rating">⭐ {book.rating}</p>
      <p className="book-description">{shortDesc}{book.description && book.description.length > 120 ? '...' : ''}</p>
    </div>
  )
}

export default BookCard;
