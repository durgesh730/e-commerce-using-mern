import React from 'react'
import '../style/search.css'

const Search = ({ placeholder, handleSearch, setcityName }) => {
  return (
    <>
      <div className="searchbar">
        <div className="search-input">
          <input type="text" name='search' className="form-control" placeholder={placeholder}
            onChange={(e) => { setcityName((prev) => ({ ...prev, driverName: e.target.value })) }}
          />
          <button onClick={handleSearch} className="btn">Search</button>
        </div>
      </div>
    </>
  )
}

export default Search
