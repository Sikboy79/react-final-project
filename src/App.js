import React, { useEffect } from "react";
import Home from "./pages/Home";
import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "./components/Books";
import BookInfo from "./components/BookInfo";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import axios from "axios";

function App({
  title,
  author_name,
  author_key,
  cover_i,
  first_publish_year,
  key,
  cover_edition_key,
  description,
}) {
  const [cart, setCart] = useState([]);
  const [data, setData] = useState([]);
  const [mappedBooks, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    const { data } = await axios.get(
      "https://openlibrary.org/search.json?q=test" // make this dynamic
    );
    setData(data.docs);
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data?.length > 0) {
      const slicedData = data.slice(0, 12);
      const books = slicedData.map((item) => ({
        title: item.title,
        author_name: item.author_name,
        author_key: item.author_key,
        cover_i: item.cover_i,
        first_publish_year: item.first_publish_year,
        key: item.key,
        cover_edition_key: item.cover_edition_key,
        description: item.description,
      }));
      setBooks(books);
      console.log(books);
    }
  }, [data, setBooks]);

  useEffect(() => {
    setBooks({ data });
  }, []);

  function addItemToCart(book) {
    const dupeItem = cart.find((item) => item.title === book.title);
    setCart((oldCart) =>
      dupeItem
        ? [
            ...oldCart.map((item) => {
              return item.id === dupeItem.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item;
            }),
          ]
        : [...oldCart, { ...book, quantity: 1 }]
    );
  }

  function updateCart(item, newQuantity) {
    setCart((oldCart) =>
      oldCart.map((oldItem) => {
        if (oldItem.title === item.tile) {
          return {
            ...oldItem,
            quantity: newQuantity,
          };
        } else {
          return oldItem;
        }
      })
    );
  }

  function removeItem(item) {
    setCart((oldCart) =>
      oldCart.filter((cartItem) => cartItem.title !== item.title)
    );
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach((item) => {
      counter += +item.quantity;
    });
    return counter;
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach((item) => {
      counter += +item.quantity;
    });
    return counter;
  }

  function calcPrices() {
    let total = 0;
    cart.forEach((item) => {
      total += (item.salePrice || item.originalPrice) * item.quantity;
    });
    return {
      subtotal: total * 0.9,
      tax: total * 0.1,
      total,
    };
  }

  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems()} />
        <Routes>
          <Route path="/" element={<Home books={Books} />} />
          <Route
            path="books"
            element={
              <Books
                books={Books}
                title={title}
                cover_edition_key={cover_edition_key}
                author_name={author_name}
                author_key={author_key}
                cover_i={cover_i}
                first_publish_year={first_publish_year}
                key={key}
                cover_edition_key_img={cover_edition_key}
                description={description}
              />
            }
          />
          <Route
            path="/bookInfo"
            element={
              <BookInfo
                books={Books}
                title={title}
                cover_edition_key={cover_edition_key}
                author_name={author_name}
                author_key={author_key}
                cover_i={cover_i}
                first_publish_year={first_publish_year}
                key={key}
                cover_edition_key_img={cover_edition_key}
                description={description}
              />
            }
            addItemToCart={addItemToCart}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                updateCart={updateCart}
                removeItem={removeItem}
                totals={calcPrices()}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
