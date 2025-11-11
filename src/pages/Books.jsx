import React, { useState, useEffect } from "react";
import Book from "./Book";
import Price from "../components/ui/Price";
import { text } from "@fortawesome/fontawesome-svg-core";

function Books({ books, onSearch }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState([""]);
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(search);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchClick(search);
    }
  };

  if (!Array.isArray({ books })) {
    if (!Array.isArray(books) || books.length === 0) {
      return <p>Loading books..</p>;
    }

    return (
      <div id="books__body">
        <main id="books__main">
          <section>
            <div className="books__container">
              <div className="row">
                <div className="books__header">
                  <h2 className="section__title books__header--title">
                    All Books
                  </h2>
                  <input
                    type="text"
                    id="searchInput"
                    placeholder="  Your next adventure! "
                    value={search}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                  />
                  <button id="search_btn" onClick={handleSearchClick}>
                    {" "} Start search {" "}
                  </button>
                  <script src="app.js">result</script>
                </div>
                <div className="books-list">
                  {books.map((book) => (
                    <Book
                      key={
                        book.key ||
                        book.cover_edition_key ||
                        book.cover_i ||
                        book.title
                      }
                      book={book}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default Books;
