import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Ratings from "../components/ui/Ratings";
import Price from "../components/ui/Price";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Cart from "./Cart";

function BookInfo({ books }) {
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const [image, setImage] = useState([]);
  const book = books.find(
    (b) =>
      b.cover_edition_key === id ||
      b.cover_i?.toString() === id ||
      encodeURIComponent(b.title) === id
  );

  useEffect(() => {
    const img = new Image();
    img.src = id;
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

  if (!book) {
    return <p>Book not found or loading...</p>;
  }

  function addItemToCart(b) {
    console.log("adding to cart:");
    const dupeItem = cart.find((book) => b.title && id.title );
    setCart((oldCart) =>
      dupeItem
        ? [
            ...oldCart.map((cart) => {
              return book.title === dupeItem.book.title
                ? {
                    ...id,
                    quantity: book.title.quantity + 1,
                  }
                : id;
            }),
          ]
        : [...oldCart, { ...book, quantity: 1 }]
    );
  }
  
  console.log(cart)
  console.log(book)

  function updateCart(id, newQuantity) {
    setCart((oldCart) =>
      oldCart.map((oldId) => {
        if (oldId.title === id.tile) {
          return {
            ...oldId,
            quantity: newQuantity,
          };
        } else {
          return oldId;
        }
      })
    );
  }

  function removeItem(id) {
    setCart((oldCart) =>
      oldCart.filter((cartId) => cartId.title !== id.title)
    );
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach((id) => {
      counter += +id.quantity;
    });
    return counter;
  }

  function calcPrices() {
    let total = 0;
    cart.forEach((id) => {
      total += (id.salePrice || id.originalPrice) * id.quantity;
    });
    return {
      subtotal: total * 0.9,
      tax: total * 0.1,
      total,
    };
  }


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
                  <div className="book_info">
                    <img
                      className="img"
                      src={
                        book.cover_i
                          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                          : "fallback.jpg"
                      }
                      alt={book.title}
                    />
                    <div className="book_description">
                      <h2>{book.title}</h2>
                      <p className="book_author">
                        {" "}
                        <span className="black">Author:  </span>
                        {Array.isArray(book.author_name)
                          ? book.author_name[0]
                          : book.author_name}
                      </p>
                      <p className="published">
                        {" "}
                        <span className="black">First published:  </span>
                        {Array.isArray(book.first_publish_year)
                          ? book.first_publish_year[0]
                          : book.first_publish_year}
                      </p>
                      <div className="book_description-text">
                        <p>
                          {" "}
                          <span className="black">Book Description:  </span>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Fugit in dolor incidunt labore, voluptate
                          aliquid illum facere, pariatur repellendus ab sit
                          fugiat eligendi hic ad qui aperiam cumque? Animi,
                          odit.
                        </p>
                        <button className="btn" onClick={() => addItemToCart(id)}>
                      Add to Cart
                    </button>
                    {/* <Cart /> */}
                      </div>
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </div>
        <div className="books__container">
          <div className="row">
            {/* <div className="book__selected--top">
              <h2 className="book__selected--title--top">Recommended Books</h2>
            </div> */}
            {/* <BestBooks id={title} /> */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default BookInfo;
