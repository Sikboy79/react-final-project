import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true); // set loading true before loading
        const { data } = await axios.get(
          "https://openlibrary.org/search.json?q=features" // make this dynamic
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

  console.log (data)

  return (
    <>
      <div className="body">
        <div className="search-cards">
          <div className="search-card"></div>
          <div className="search-card"></div>
          <div className="search-card"></div>
          <div className="search-card"></div>
          <div className="search-card"></div>
          <div className="search-card"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
