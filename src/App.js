import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import BookInfo from "./pages/BookInfo";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import { readCart } from "../src/Cart";

function App() {
  const [books, setBooks] = useState([]);

  const [cartCount, setCartCount] = useState(() =>
    readCart().reduce((sum, it) => sum + Number(it.quantity || 1), 0)
  );

  useEffect(() => {
    const initial = readCart().reduce(
      (sum, it) => sum + Number(it.quantity || 1),

      0
    );

    setCartCount(initial);

    const handler = (e) => {
      const next = (e.detail?.cart || []).reduce(
        (sum, it) => sum + Number(it.quantity || 1),

        0
      );

      setCartCount(next);
    };

    window.addEventListener("cart:updated", handler);

    return () => window.removeEventListener("cart:updated", handler);
  }, []);

  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={cartCount} />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/books" element={<Books books={books} />} />

          <Route path="/book/:id" element={<BookInfo />} />

          <Route path="/cart" element={<Cart />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
