import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Price from "../components/ui/Price";
import Ratings from "../components/ui/Ratings";
import BookInfo from "./BookInfo";

function Book({
  books,
  title,
  author_name,
  description,
  cover_edition_key,
  cover_i,
  first_publish_year,
}) {
  const [img, setImg] = useState();
  if (!books || books.length === 0) {
  }
   // When routes switch dont set image to unmounted component
    const mountedRef = useRef(true);
    useEffect(() => {
      const img = new Image();
      img.src = "https://covers.openlibrary.org/b/olid/book.cover_edition_key-L.jpg";
      img.onload = () => {
        setTimeout(() => {
          if (mountedRef.current) {
            setImg(img);
          }
        }, 300);
      };
      return () => {
        // When the component unmounts
        mountedRef.current = false;
      };
    }, [books]);

  return (
    <div className="book">
      {img ? (
        <>
          <div className="book__img--skeleton"></div>
          <div className="skeleton book__title--skeleton"></div>
          <div className="skeleton book__rating--skeleton"></div>
          <div className="skeleton book__price--skeleton"></div>
        </>
      ) : (
        <>
          <Link to={`/bookinfo`}>
            <figure className="book__img--wrapper">
              <>
                {books.map((books) => (
                  <div className= "book_cards"
                  key={books.key}>
                    <img
                      className="book__img"
                      src={`https://covers.openlibrary.org/b/olid/book.${cover_edition_key}-L.jpg`}
                      alt=""
                    />
                    Title:{books.title}
                    Authors name:{books.author_name}
                    {books.first_publish_year}
                    Description:{books.description}
                    <Price />
                  </div>
                ))}
              </>
            </figure>
          </Link>
          {/* <Ratings rating={rating} /> */}
        </>
      )}
    </div>
  );
}

export default Book;
