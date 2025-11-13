import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Price from "../components/ui/Price";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import axios from "axios";

function BookInfo({ addItemToCart }) {
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const [img, setImage] = useState([]);
  const [book, setBook] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true); // set loading true before loading
        const { data } = await axios.get(
          `https://openlibrary.org/search.json?q=${id}`
        );
        setData(data.docs);
        setError(null);
      } catch (err) {
        setError("failed to load books"); //clear previous error
      } finally {
        setLoading(false);
      }
    }
    fetchBook(data);
  }, []);

  useEffect(() => {
      if (!data.docs || (data.length > 0)) {
        const slicedData = data.slice(0, 1);
        const book = slicedData.map((item) => ({
          title: item.title,
          author_name: item.author_name,
          cover_i: item.cover_i,
          key: item.key,
          cover_edition_key: item.cover_edition_key,
          first_publish_year: item.first_publish_year
        }));
        setBook(book);
      }
    }, [data]);

    if (!book || book.length === 0) {
    <p>Loading book...</p>;
  }


  //   console.log(data)
  // console.log(book[0].title)

  useEffect(() => {
    const img = new Image();
    img.src = book;
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
  }, []);

  if (!book[0]) {
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
        : [...oldCart, { ...book, quantity: 1 }]
    );
  }

  // console.log(cart);

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
                        book[0].cover_i
                          ? `https://covers.openlibrary.org/b/id/${book[0].cover_i}-L.jpg`
                          : "fallback.jpg"
                      }
                      alt={book.title}
                    />
                    <div className="book_description">
                      <p className="book_title">
                        {" "}
                        <span className="black">Title: </span>
                        {Array.isArray(book[0].title)
                          ? book[0].title
                          : book[0].title}
                      </p>
                      <p className="book_author">
                        {" "}
                        <span className="black">Author: </span>
                        {Array.isArray(book[0].author_name)
                          ? book[0].author_name
                          : book[0].author_name}
                      </p>
                      <p className="published">
                        {" "}
                        <span className="black">First published: </span>
                        {Array.isArray(book[0].first_publish_year)
                          ? book[0].first_publish_year
                          : book[0].first_publish_year}
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
                        <Link to="/cart">
                          <button
                            className="btn"
                            onClick={() => addItemToCart(id)}
                          >
                            Add to Cart
                          </button>
                        </Link>
                        <div className="cart__BookInfo--link">
                          <Cart cart={cart} title={book[0].title} price={book[0].price} />
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
