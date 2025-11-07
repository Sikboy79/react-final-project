import React, { useState, useEffect } from "react";
import Book from "./Book";


function Books({ books, title }) {
  const [booksRatings, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(`${title}`);
  const onChange = (event) => {
    setSearch(event.target.value);
  };

  console.log(books);

  function filterBooks(filter) {
    switch (filter) {
      case "LOW_TO_HIGH":
        return setBooks(
          books
            .slice()
            .sort(
              (a, b) =>
                (a.salePrice || a.originalPrice) -
                (b.salePrice || b.originalPrice)
            )
        );
      case "HIGH_TO_LOW":
        return setBooks(
          books
            .slice()
            .sort(
              (a, b) =>
                (b.salePrice || b.originalPrice) -
                (a.salePrice || a.originalPrice)
            )
        );
      case "RATING":
        return setBooks(
          booksRatings.slice().sort((a, b) => b.rating - a.rating)
        );
      default:
        break;
    }
  }

  if (!books || books.length === 0) {
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
                <select
                  id="filter"
                  onChange={(event) => filterBooks(event.target.value)}
                  defaultValue={"DEFAULT"}
                >
                  <option value="DEFAULT" disabled>
                    Sort
                  </option>
                  <option value="LOW_TO_HIGH">Price, Low to High</option>
                  <option value="HIGH_TO_LOW">Price, High to Low</option>
                  <option value="RATING">Rating</option>
                </select>
              </div>
              <div className="books">
                <Book  books={books} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Books;
