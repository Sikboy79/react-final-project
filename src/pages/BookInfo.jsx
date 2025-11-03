import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Ratings from "../components/ui/Ratings";
import Price from "../components/ui/Price";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Book from "../components/Book";


const BookInfo = ({ addItemToCart }) => {
  
  const [books, setBookArray] = useState([]);
  

  const { title } = useParams();
  const book = books.find((book) => +book.title === title);

  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <Link to="/books" className="book__link"></Link>
                <FontAwesomeIcon icon="arrow-left" />
              <Link to="/book" className="book__link">
                <h2 className="book__selected--title--top">Book</h2>
              </Link>
            </div>
            <div className="book__selected">
              <figure className="book__selected--figure">
                <img className="book__img" src={"/book"} alt="" />
              </figure>
              
              <div className="book__selected--description">
                <h2 className="book__selected--title">{book}</h2>
                {/* <Ratings rating={book.rating} /> */}
                <div className="book__selected--price">
                  {/* <Price
                    originalPrice={book.originalPrice}
                    salePrice={book.salePrice}
                  /> */}
                </div>
                <div className="book__summary">
                  <h3 className="book__summary--title">Summary</h3>
                  <p className="book__summary--para">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veniam, repellendus modi odio porro, consequuntur,
                    asperiores minima sint voluptatem at reiciendis ducimus
                    neque provident alias iure nihil explicabo nobis id
                    voluptas.
                  </p>
                  <p className="book__summary--para">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veniam, repellendus modi odio porro, consequuntur,
                    asperiores minima sint voluptatem at reiciendis ducimus
                    neque provident alias iure nihil explicabo nobis id
                    voluptas.
                  </p>
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
