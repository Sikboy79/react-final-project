import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Price from "../components/ui/Price";
import Book from "./Book";

function Home({ cover_i, title, authors_name, cover_edition_key, id }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [homeBooks, setHomeBooks] = useState([]);
  const [img, setImg] = useState([]);
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true); // set loading true before loading
        const { data } = await axios.get(
          "https://openlibrary.org/search.json?q=random"
        );
        setData(data.docs);
        setError(null);
      } catch (err) {
        setError("failed to load books"); //clear previous error
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!data.docs || (data.length && 0)) {
      const slicedData = data.slice(0, 15);
      const homeBooks = slicedData.map((item) => ({
        title: item.title,
        author_name: item.author_name,
        cover_i: item.cover_i,
        key: item.key,
        cover_edition_key: item.cover_edition_key,
      }));
      setHomeBooks(homeBooks);
    }
  }, [data, setHomeBooks]);

  const book = homeBooks.find (
    (book) =>
      book.cover_edition_key === id ||
      book.cover_i?.toString() === id ||
      encodeURIComponent(book.title) === id, 
  );

// console.log(book)

  // When routes switch dont set image to unmounted component
  const mountedRef = useRef(true);
  if (!homeBooks || homeBooks.length === 0) {
    <p>Loading book...</p>;
  }

  useEffect(() => {
    const img = new Image();
    img.src = `https://covers.openlibrary.org/b/olid/${cover_i}-L.jpg`;
    img.onload = () => {
      setTimeout(() => {
        if (mountedRef.current) {
          setImg(img);
        }
      }, 300);
    };
    return () => {
      // When the component unmounts
      mountedRef.current = false;
    };
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    scrollRef.current.style.cursor = "grab";
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    scrollRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX; // The distance the mouse has moved
    scrollRef.current.scrollLeft = scrollLeft - walk; // Adjust scroll position
  };

  return (
    <div className="home-book">
      {!img ? (
        <>
          <div className="book__img--skeleton"></div>
          <div className="skeleton book__title--skeleton"></div>
          <div className="skeleton book__rating--skeleton"></div>
          <div className="skeleton book__price--skeleton"></div>
        </>
      ) : (
        <>
          <h2>Recomended Books:</h2>
          <div
            className="book_card-home"
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {homeBooks.map((book) => (
              <Book key={book.key || book.cover_edition_key || book.cover_i || book.title} book={book} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
