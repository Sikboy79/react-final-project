import React, { useState, useEffect } from "react";
import Book from "./Book";
import Price from "../components/ui/Price";
import axios from "axios";

function Books({ }) {
  const [data, setData] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  // const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchValue(query);
    filterResults(query)
  };

  const handleSearchClick = () => {
    filterResults(searchValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchClick(searchValue);
    }
  };

  const filterResults = (query) => {
    async function fetchBooks() {
        if (`${searchValue}`) {
          try {
            setLoading(true); // set loading true before loading
            const { data } = await axios.get(
              `https://openlibrary.org/search.json?q=${searchValue}`
            );
            setBooks(data.docs || []);
          } catch (err) {
            setError("failed to load books"); //clear previous error
          } finally {
            setLoading(false);
          }
        }
      }
    fetchBooks(query);
  };

    console.log(books)


  // if (!Array.isArray({ books })) {
  //   if (!Array.isArray(books) || books.length === 0) {
  //     return <p>Loading books..</p>;
  //   }

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
                    value={`${searchValue}`}
                    onChange={handleInputChange}
                    setSearch={handleKeyPress}
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
// }

export default Books;
