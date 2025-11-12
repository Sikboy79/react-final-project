import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Price from "../components/ui/Price";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Cart from "./Cart";
// import Books from "./Books";

function BookInfo({ addItemToCart }) {
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const [image, setImage] = useState([]);
  const [books, setBooks] = useState([]);
  const book = books.find (
    (book) =>
      book.cover_edition_key === id ||
      book.cover_i?.toString() === id ||
      encodeURIComponent(book.title) === id, 
  ); 
  console.log(books)
      
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
  }, [ ]);

  console.log(id, book)

  if (!book) {
    return <p> loading...</p>;
  }

  function addItemToCart(book) {
    console.log("adding to cart:");
    const dupeItem = cart.find((book) => book.id && book);
    setCart((oldCart) =>
      dupeItem
        ? oldCart.map((cartItem) => {
          return cartItem.id === dupeItem.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem;
        })
      : 
        [...oldCart, { ...book, quantity: 1 }]
    );
  }

  console.log(cart);

  // function updateCart(id, newQuantity, price) {
  //   setCart((oldCart) =>
  //     oldCart.map((oldId) => {
  //       if (oldId.book === id.book) {
  //         return {
  //           ...oldId.book.price,
  //           quantity: newQuantity,
  //         };
  //       } else {
  //         return oldId;
  //       }
  //     }, [cart])
  //   );
  // }

  // function removeItem(id) {
  //   setCart((oldCart) => oldCart.filter((cartId) => cartId.title !== id.title));
  // }

  // function numberOfItems() {
  //   let counter = 0;
  //   cart.forEach((id) => {
  //     counter += +id.quantity;
  //   });
  //   return counter;
  // }

  // function calcPrices() {
  //   let total = 0;
  //   cart.forEach((id) => {
  //     total += (id.salePrice || id.originalPrice) * id.quantity;
  //   });
  //   return {
  //     subtotal: total * 0.9,
  //     tax: total * 0.1,
  //     total,
  //   };
  // }

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
                        <span className="black">Author: </span>
                        {Array.isArray(book.author_name)
                          ? book.author_name[0]
                          : book.author_name}
                      </p>
                      <p className="published">
                        {" "}
                        <span className="black">First published: </span>
                        {Array.isArray(book.first_publish_year)
                          ? book.first_publish_year[0]
                          : book.first_publish_year}
                      </p>
                      <div className="book_description-text">
                        <p>
                          {" "}
                          <span className="black">Book Description: </span>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Fugit in dolor incidunt labore, voluptate
                          aliquid illum facere, pariatur repellendus ab sit
                          fugiat eligendi hic ad qui aperiam cumque? Animi,
                          odit.
                        </p>
                        <Price />
                        <Link to="/cart" >
                          <button
                            className="btn"
                            onClick={() => addItemToCart(book)}
                          >
                            Add to Cart
                          </button>
                        </Link>
                        <div className="cart__BookInfo--link">
                        <Cart cart={cart} title={book.title} price={book.price}/>
                        </div>
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
