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

function App() {
  const [cart, setCart] = useState([]);
  const [data, setData] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(()=> {
  async function fetchBooks() {
    try {
      setLoading(true); // set loading true before loading
      const { data } = await axios.get(
        "https://openlibrary.org/search.json?q=woman" // make this dynamic
      );
      // const data = await res.json();
      setBooks(data.docs || []);
      } catch (err) {
        setError("failed to load books"); //clear previous error
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);
  console.log(data)


  function addItemToCart(book) {
    console.log("adding to cart:".book);
    const dupeItem = cart.find((item) => item.key && book.key);
    setCart((oldCart) =>
      dupeItem
        ? [
            ...oldCart.map((item) => {
              return item.key === dupeItem.key
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
            path="/book/:id"
            element={<BookInfo books={books}/>}
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
