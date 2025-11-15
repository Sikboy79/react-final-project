import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
// import { Link, useParams } from "react-router-dom";
import Price from "../components/ui/Price";
import Book from "./Book";
import Skeleton from "../components/Skeleton";
import NewRelease from "./NewRelease";

function Home({ cover_i }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [homeBooks, setHomeBooks] = useState([]);
  const [img, setImg] = useState([]);
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(true);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://openlibrary.org/search.json?q=random"
        );
        setData(data.docs);
        setError(null);
      } catch (err) {
        setError("failed to load books");
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
    const walk = x - startX; 
    scrollRef.current.scrollLeft = scrollLeft - walk; 
  };

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="home-book">
      <>
        <h2>Recomended Books:</h2>
        <div
          className="book_card-home fade-in-element"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {homeBooks.map((book) => (
            <Book
              key={
                book.key || book.cover_edition_key || book.cover_i || book.title
              }
              book={book}
            />
          ))}
        </div>
        < NewRelease/>
      </>
    </div>
  );
}

export default Home;
