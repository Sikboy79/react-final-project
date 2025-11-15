import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Price from "../components/ui/Price";
import Skeleton from "../components/Skeleton";

function Book({ book, books }) {
  const id =
    book.cover_edition_key || book.cover_i || encodeURIComponent(book.title);
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <div className="book">
      <div className="book_card">
          <Link to={`/book/${id}`} state={{ booksArray: books }}>
            <img
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                  : "../assets/fallback-book.jpg"
              }
              alt={book.title}
            />
            <h3>{book.title}</h3>
            <p>
              {Array.isArray(book.author_name)
                ? book.author_name[0]
                : book.author_name}{" "}
            </p>
            <Price />
          </Link>
      </div>
    </div>
  );
}

export default Book;
