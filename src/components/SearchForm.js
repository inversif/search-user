import React, { useState } from 'react';
import {searchKeyword, searchGender} from '../helpers/search';

const SearchBar = (props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [genderQuery, setGenderQuery] = useState("");

    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleGenderQuery = (e) => {
        setGenderQuery(e.target.value);
        props.modifyTable(searchGender(props.content, genderQuery));
    }

    const resetSearchQuery = (e) => {
        setSearchQuery("");
    }

    const querySearch = (e) => {
        e.preventDefault();
        props.modifyTable(searchKeyword(props.content, searchQuery));
        resetSearchQuery();
    }

    const resetFilter = (e) => {
        // e.preventDefault();
        props.modifyTable(props.content);
    }

    return (
        <form className="search-query container">
          <div className="row">
            <div className="col col-md-auto form-group">
                <div>
                  <label>Search</label>
                </div>
                <div className="d-flex">
                  <input name="keyword-search" id="keyword-search" className="search-input form-control"
                          value={searchQuery}
                          onChange={handleSearchQuery}
                          type="text"></input>
                  <button onClick={querySearch} type="submit" className="btn btn-primary">
                    <i className="bi-search"></i>
                  </button>
                </div>
            </div>
            <div className="col col-2 form-group">
                <div>
                  <label>Gender</label>
                </div>
                <div>
                  <select name="gender-search" id="gender-search" className="form-select"
                          defaultValue={""}
                          onChange={handleGenderQuery}>
                      <option value="">All</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                  </select>
                </div>
            </div>
            <div className="col col-2 form-group">
                <div>
                  <label></label>
                </div>
                <div>
                <button onClick={resetFilter} type="submit" className="btn btn-primary">
                    <i className="bi-arrow-counterclockwise"></i> Reset Filter
                  </button>
                </div>
            </div>
          </div>
        </form>
    );
};

export default SearchBar