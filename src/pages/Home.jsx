import React, { useEffect } from 'react'

const Home = () => {

// useEffect(()=> {
//   async function fetchData() {
//     try {
//       setLoading(true); // set loading true before loading
//       const { data } = await axios.get(
//         "https://openlibrary.org/search.json?q=woman" // make this dynamic
//       );
//       setData(data.docs);
//       setError(null);
//     } catch (err) {
//       setError("failed to load books"); //clear previous error
//     } finally {
//       setLoading(false);
//     }
//   }
//     fetchData();
//   }, []);
  
  return (
    <>
      <div className='body'>
        <div className='search-cards'>
          <div className='search-card'></div>
          <div className='search-card'></div>
          <div className='search-card'></div>
          <div className='search-card'></div>
          <div className='search-card'></div>
          <div className='search-card'></div>
        </div>
      </div>
    </>
  )
}


export default Home