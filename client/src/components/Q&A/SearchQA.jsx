import React from 'react';

const SearchQA = ({ handleSearch }) => {

  return (
    <div className="search-question">
      <input size="50" type="text" placeholder="Have a question? Search for answers..." onChange={(e) => handleSearch(e.target.value)}/>
    </div>
  );
};

export default SearchQA;