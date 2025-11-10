import React, { useState, useEffect } from "react";
import Book from "./Book";
import Price from "../components/ui/Price";


function Books({ books }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(books.title);
  const onChange = (event) => {
    setSearch(event.target.value);
  };

  if (!Array.isArray({ books })) {
    if (!Array.isArray(books) || books.length === 0) { 
    return <p>Loading books...</p>;
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
                  className="search_info_input"
                  placeholder="Book title"
                  onChange="setSearch(event)"
                ></input>
              </div>
              <div className="books-list">
                {books.map((book) => (
                  <Book 
                  key={book.cover_edition_key || book.cover_i || book.title}
                  book={book} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}}

export default Books;
