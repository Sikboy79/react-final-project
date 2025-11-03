import React, { useState, useEffect } from "react";
import Book from "../components/Book";



const Books = () => {
  const [apiData, setData] = useState();
  const [books, setBookArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://openlibrary.org/search.json?q=woman",
          
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const apiData = await response.json();
        setData(apiData.docs);
        console.log(apiData);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
        useEffect(() => {
        if (apiData?.length > 0) {
          const slicedData = apiData.slice(0, 12); 
          const books = slicedData.map(item => ({
            title: item.title,
            author_name: item.author_name,
            author_key: item.author_key,
            cover_i: item.cover_i,
            first_publish_year: item.first_publish_year,
            key: item.key,
            cover_edition_key: item.cover_edition_key,
            description: item.description
          }));
          setBookArray(books);
          console.log(books)
        }
      }, [apiData]);

  // useEffect(() => {
  //   setBooks(apiData);
  // }, []);

  // function filterBooks(filter) {
  //   switch (filter) {
  //     case "LOW_TO_HIGH":
  //       return setBooks(
  //         books
  //           .slice()
  //           .sort(
  //             (a, b) =>
  //               (a.salePrice || a.originalPrice) -
  //               (b.salePrice || b.originalPrice)
  //           )
  //       );
  //     case "HIGH_TO_LOW":
  //       return setBooks(
  //         books
  //           .slice()
  //           .sort(
  //             (a, b) =>
  //               (b.salePrice || b.originalPrice) -
  //               (a.salePrice || a.originalPrice)
  //           )
  //       );
  //     case "RATING":
  //       return setBooks(books.slice().sort((a, b) => b.rating - a.rating));
  //     default:
  //       break;
  //   }
  // }

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
                <select
                  id="filter"
                  // onChange={(event) => filterBooks(event.target.value)}
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
                {books &&
                  books.map((book) => {
                    return <Book book={book} key={book.title} />;
                  })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Books;
