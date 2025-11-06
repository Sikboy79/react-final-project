import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Ratings from "./ui/Ratings";
import Price from "./ui/Price";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const BookInfo = ({
  addItemToCart,
  title,
  author_name,
  description,
  cover_edition_key,
  cover_i,
  originalPrice,
  salePrice,
}) => {
  const [books, setBookArray] = useState([]);
  const book = books.find((book) => +book.title === title);
  const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   const image = new Image();
  //   image.src = cover_i;
  //   image.onload = () => {
  //     setTimeout(() => {
  //       if (mountedRef.current) {
  //         setImg(img);
  //       }
  //     }, 300);
  //   };
  //   return () => {
  //     // When the component unmounts
  //     mountedRef.current = false;
  //   };
  // }, [book]);

  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <FontAwesomeIcon icon="arrow-left" />
              <Link to="bookinfo" className="book__link">
                <h2 className="book__selected--title--top">Books</h2>
              </Link>
            </div>
            <div className="book__selected">
              <figure className="book__selected--figure">
                <img
                  className="book__img"
                  src={`https://covers.openlibrary.org/b/olid/${cover_edition_key}-L.jpg`}
                  alt=""
                />
              </figure>

              <div className="book__selected--description">
                <h2 className="book__selected--title">{`${title}`}</h2>
                {/* <Ratings rating={book.rating} /> */}
                <div className="book__selected--price">
                  <Price originalPrice={originalPrice} salePrice={salePrice} />
                </div>
                <div className="book__summary">
                  <div className="book_title"> {`${title}`}</div>
                  <div className="book_author">Author: {`${author_name}`}</div>
                  {/* <div className="published_year">
                    Published year: {`${first_publish_year}`}
                  </div> */}
                  <div className="book_title"> {`${description}`}</div>
                </div>
                <button className="btn" onClick={() => addItemToCart(book)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <h2 className="book__selected--title--top">Recommended Books</h2>
            </div>
            {/* <BestBooks id={title} /> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookInfo;
