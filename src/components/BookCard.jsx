import { Link, useLocation } from "react-router-dom";

const COVER_URL = "https://covers.openlibrary.org/b/id/";

const BookCard = ({ sortedBook }) => {
  const location = useLocation();
  const bookId = sortedBook.key.split("/").pop();
  const bookCover = `${COVER_URL}${sortedBook.cover_i}-M.jpg`;
  const authorName = sortedBook.author_name?.join(", ") || "Unknown author";
  return (
    <div>
      <h1>Book Card</h1>
      <img src={bookCover} alt={sortedBook.title} />
      <p>Title: {sortedBook.title}</p>
      <p>Author: {authorName}</p>
      <p>First publish year: {sortedBook.first_publish_year}</p>
      <Link to={`/books/${bookId}`} state={{ from: location }}>
        {sortedBook.title}
      </Link>
    </div>
  );
};
export default BookCard;
