import React from "react";

const Api = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("YOUR_API_ENDPOINT"); // Replace with your API URL
        const result = await response.json();
        setData(result); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once
  return <div></div>;
};

export default Api;
