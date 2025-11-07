import React, { useEffect } from "react";
import Home from "./pages/Home";
import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import BookInfo from "./pages/BookInfo";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import axios from "axios";

function App({}) {
  const [cart, setCart] = useState([]);
  const [data, setData] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      setLoading(true); // set loading true before loading
      const { data } = await axios.get(
        "https://openlibrary.org/search.json?q=man" // make this dynamic
      );
      setData(data.docs);
      setError(null);
    } catch (err) {
      setError(err); //clear previous error
      setData([]); //clear error data
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!data.docs || data.docs.length === 0) {
      // checks if data exists
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
    }
    if (!books || books.length === 0) {
    }
  }, [setBooks, data]);
  useEffect(() => {
    setBooks({ data });
  }, []);

  function addItemToCart(book) {
    console.log("adding to cart:".book);
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
          <Route path="/books" element={<Books books={books} />} />
          <Route
            path="/bookInfo"
            element={<BookInfo books={books} addItemToCart={addItemToCart} />}
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
