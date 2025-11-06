import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Ratings from "../components/ui/Ratings";
import Price from "../components/ui/Price";
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
  first_publish_year,
}) => {
  const [books, setBookArray] = useState([]);
  const book = books.find((book) => +book.title === title);
  const [cart, setCart] = useState([]);
  const [image, setImage] = useState([]);

  if (!books || books.length === 0) {
  }

  useEffect(() => {
    const img = new Image();
    img.src = cover_i;
    img.onload = () => {
      setTimeout(() => {
        if (Image.current) {
          setImage(img);
        }
      }, 300);
    };
    return () => {
      // When the component unmounts
      img.current = false;
    };
  }, [books]);

  console.log(books)

  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <FontAwesomeIcon icon="arrow-left" />
              <Link to="/books" className="book__link">
                <h2 className="book__selected--title--top">Books</h2>
              </Link>
            </div>
            <div className="book__selected">
              <div className="book__selected--description">
                <figure className="book__img--wrapper">
                  <>
                    <div>
                      <img
                        className="book__img"
                        src={`https://covers.openlibrary.org/b/olid/book.${cover_edition_key}-L.jpg`}
                        alt=""
                      />
                     <div>Title:{`${title}`}</div>
                      <div>Authors name:{books.author_name}</div>
                      <div>published year:{books.first_publish_year}</div>
                      <div>Description:{books.description}</div>
                      <Price />
                    </div>
                  </>
                </figure>
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
