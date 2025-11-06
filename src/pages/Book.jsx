import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Price from "../components/ui/Price";
import Ratings from "../components/ui/Ratings";
import BookInfo from "./BookInfo";

const Book = ({
  book,
  title,
  author_name,
  description,
  cover_edition_key,
  cover_i,
  first_publish_year
}) => {
  const [img, setImg] = useState();
  console.log(title)

  // When routes switch dont set image to unmounted component
  const mountedRef = useRef(true);

  useEffect(() => {
    const image = new Image();
    image.src = `${cover_i}`;
    image.onload = () => {
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
  }, [book]);

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
              <img
                className="book__img"
                src={`https://covers.openlibrary.org/b/olid/book.${cover_edition_key}-L.jpg`}
                alt=""
              />
            </figure>
          </Link>
          <div className="book_title_wrapper">
            <Link to={"/bookinfo"} className="book__title--link">
              <div className="book_title"> {`${title}`}</div>
              <div className="book_author">Author: {`${author_name}`}</div>
              <div className="published_year">
                Published year: {`${first_publish_year}`}
              </div>
              <div className="book_title"> {`${description}`}</div>
              <Price />
            </Link>
          </div>
          {/* <Ratings rating={rating} /> */}
        </>
      )}
    </div>
  );
};

export default Book;
