import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Price from "./ui/Price";
import Ratings from "./ui/Ratings";

const Book = ({ book }) => {
  const [img, setImg] = useState();

  // When we switch routes dont set image to unmounted component
  const mountedRef = useRef(true);

  useEffect(() => {
    const image = new Image();
    image.src = book.cover_i;
    image.onload = () => {
      setTimeout(() => {
        if (mountedRef.current) {
          setImg(image);
        }
      }, 300);
    };
    return () => {
      // When the component unmounts 
      mountedRef.current = false;
    };
  }, [book.url]);

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
          <Link to={`/books/${book.cover_i}`}>
            <figure className="book__img--wrapper">
              <img className="book__img" src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`} alt="" />
            </figure>
          </Link>
          <div className="book_title_wrapper">
            <Link to={`/books/${book.title}`} className="book__title--link">
              <div className="book_title"> {book.title}</div>
              <div className="book_author">Author: {book.author_name}</div>
              <div className="published_year">Published year: {book.first_publish_year}</div>
            </Link>
          </div>
          {/* <Ratings rating={book.rating} />
          <Price
            originalPrice={book.originalPrice}
            salePrice={book.salePrice}
          /> */}
        </>
      )}
    </div>
  );
};

export default Book;
