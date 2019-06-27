import React, { useState, useEffect, useRef } from 'react';
import './App.scss'
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]) // set results to empty array
  const [query, setQuery] = useState('react hooks');
  const searchInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // load search on componentDidMount, componentDidUpdate
  useEffect( () => {
    getResults();
  },[]);

  const getResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
      setResults(response.data.hits);
     

    } catch (error) {
        console.log(error);
        setError(true);
    }
    setLoading(false);
  }

  const searchEventHandler = e => {
    console.log("search submit");
    e.preventDefault();
    getResults();
  }

  const setQueryHandler = e => {
      setQuery(e.target.value)
  }

  const clearSearchHandler = () => {
    setQuery('');
    searchInputRef.current.focus(); // put focus back into input handler.

  }

  return (
      <div className="App">
      
          <h4> Search Top 20 Results from API: </h4>
          <form onSubmit = { searchEventHandler }>
            <input 
              type="text"
              value = { query }
              onChange = { setQueryHandler }
              ref = { searchInputRef }
            />

            <br/>
            <button type = "submit"> Search </button>
            <button onClick = { clearSearchHandler } type = "button"> Clear </button>
          </form>
         

          {
            loading ? 'I am loading...' :
            results.map(result => (
              <div key = {result.objectID}> {result.title} </div>
            ))
          }

          { error && <div> There was an error with the request </div>  }

      </div>
  
  );
}

export default App;
