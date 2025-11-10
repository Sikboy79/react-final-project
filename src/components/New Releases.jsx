// import React, { useEffect, useState } from "react";
// import Book from "../pages/Book";
// import axios from "axios";

// const NewReleases = () => {
//   const [newHomeBooks, setNewHomeBooks] = useState([]);
//   const [newData, setNewData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function newFetchData() {
//       try {
//         setLoading(true); // set loading true before loading
//         const { newData } = await axios.get(
//           "https://openlibrary.org/search.json?q=boy"
//         );
//         setNewData(newData.docs);
//         setError(null);
//       } catch (err) {
//         setError("failed to load books"); //clear previous error
//       } finally {
//         setLoading(false);
//       }
//     }
//     newFetchData();
//   }, []);

//   console.log(newData);

//   useEffect(() => {
//     if (!newData.docs || (newData.length && 0)) {
//       const slicedNewData = newData.slice(0, 12);
//       const newHomeBooks = slicedNewData.map((item) => ({
//         title: item.title,
//         author_name: item.author_name,
//         cover_i: item.cover_i,
//         key: item.key,
//         cover_edition_key: item.cover_edition_key,
//       }));
//       setNewHomeBooks(newHomeBooks);
//     }
//   }, [newData, setNewHomeBooks]);

//   console.log(newHomeBooks)

//   return (
//     <div className="book_card-home">
//       {newHomeBooks.map((book) => (
//         <Book key={newHomeBooks.cover_i || newHomeBooks.title} book={book} />
//       ))}
//     </div>
//   );
// };

// export default NewReleases;
