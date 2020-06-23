import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import PropTypes from 'prop-types';

import { mockResults } from './mockSearchResults';
import Input from '../atoms/Input/Input';

const Search = ({ setSearchResultNotes, placeholderText, clearSearch, border }) => {
  const [searched, setSearched] = useState(false);

  const handleSearch = (value) => {
    if (value === '') return;

    // setSearchResultNotes(mockResults);
    // setSearched(true);

    const client = algoliasearch(
      process.env.REACT_APP_ALGOLIA_ID,
      process.env.REACT_APP_ALGOLIA_SEARCH_KEY,
    );
    const index = client.initIndex('notes');

    index.search(value).then(({ hits }) => {
      const hitsWithIds = hits.map((hit) => ({ ...hit, id: hit.objectID }));

      setSearchResultNotes(hitsWithIds);
      setSearched(true);
    });
  };

  const clearInput = (e) => {
    clearSearch();
    setSearched(false);
  };

  return (
    <Input
      label={placeholderText}
      onKeyDown={handleSearch}
      clearInput={clearInput}
      showX={searched}
      border={border}
    />
  );
};

Search.propTypes = {
  setSearchResultNotes: PropTypes.func.isRequired,
  placeholderText: PropTypes.string,
};

Search.defaultProps = {
  placeholderText: 'Search',
};

export default Search;
