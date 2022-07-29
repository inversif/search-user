// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

import SearchBar from './components/SearchForm';
import RenderTable from './components/Table';
import Paginate from './components/Pagination';
import Header from './components/Header';

// import {searchKeyword, searchGender} from './helpers/search';

const TOTAL_PER_PAGE = 10;
const NUMBER_OF_QUERIES = 30;
const url = 'https://randomuser.me/api/?results='+NUMBER_OF_QUERIES;

function App() {
  const[tables, setTables] = useState([]);
  const[loading, setLoading] = useState(true);
  const[page, setPage] = useState(1);
  // const[errorMsg, setErrorMsg] = useState(null);

  const getSearchResult = (t) => {
    setTables(t);
  }

  const paginate = (pageNum) => { 
    setPage(pageNum); 
  }

  useEffect(() => {
    fetch(url)
      .then(resp => resp.json())
      .then(respJson => {
        setTables(respJson.results);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
        <Header title="Search User"></Header>
        <hr></hr>
        <SearchBar modifyTable={getSearchResult} content={tables}></SearchBar>
        {loading 
          ? <span>Loading...</span> 
          : <RenderTable 
                // sortTable={handleSortingChange}
                content={tables.slice(page*TOTAL_PER_PAGE - TOTAL_PER_PAGE, page*TOTAL_PER_PAGE)}></RenderTable>}
        <Paginate
          perPage={TOTAL_PER_PAGE}
          totalElem={NUMBER_OF_QUERIES}
          paginate={paginate}></Paginate>
    </div>
  );
}

export default App;
//perPage, totalElem, paginate
/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */
