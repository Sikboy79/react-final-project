import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Price from "../components/ui/Price";
import BookInfo from "./BookInfo";

function Book({ book, books }) {
  const id = book.cover_edition_key || book.cover_i || encodeURIComponent(book.title);
  const [img, setImg] = useState([]);

   // When routes switch dont set image to unmounted component
    const mountedRef = useRef(true);
  if (!book.id || book.id.length === 0) {
    <p>Loading book...</p>;
  }

    useEffect(() => {
      const img = new Image();
      img.src = `https://covers.openlibrary.org/b/olid/${id}-L.jpg`;
      img.onload = () => {
        setTimeout(() => {
          if (mountedRef.current) {
            setImg(img);
          }
        }, 300);
      };
      return () => {
        // When the component unmounts
        mountedRef.current = true;
      };
    }, [book]);
    

  return (
    <div className="book">
      {!img ? (
        <>
          <div className="book__img--skeleton"></div>
          <div className="skeleton book__title--skeleton"></div>
          <div className="skeleton book__rating--skeleton"></div>
          <div className="skeleton book__price--skeleton"></div>
        </>
      ) : (
        <div className="book_card">
          <Link to= {`/book/${id}`} state={{ booksArray: books }}>
            <img
            src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`: "../assets/fallback-book.jpg"} 
            alt={book.title}
            />
            <h3>{book.title}</h3>
            <p>{Array.isArray(book.author_name) ? book.author_name[0] : book.author_name} </p>
            <Price/>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Book;
