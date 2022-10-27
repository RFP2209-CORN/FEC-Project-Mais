import React from 'react';

const SearchQA = ({ handleSearch }) => (
  <div>
    <input size="65" type="text" placeholder="Have a question? Search for answers..." onChange={(e) => handleSearch(e.target.value)} />
  </div>
);

export default SearchQA;