import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import PropTypes from 'prop-types';

import { mockResults } from './mockSearchResults';
import Input from '../atoms/Input/Input';

const Search = ({ setSearchResultNotes, placeholderText, clearSearch, border, small }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText === '') return;

    // setSearchResultNotes(mockResults);
    // setSearched(true);

    const client = algoliasearch(
      process.env.REACT_APP_ALGOLIA_ID,
      process.env.REACT_APP_ALGOLIA_SEARCH_KEY,
    );
    const index = client.initIndex('notes');

    index.search(searchText).then(({ hits }) => {
      const hitsWithIds = hits.map((hit) => ({ ...hit, id: hit.objectID }));

      setSearchResultNotes(hitsWithIds);
    });
  };

  const clearInput = () => {
    clearSearch();
    setSearchText('');
  };

  return (
    <Input
      label={placeholderText}
      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      clearInput={clearInput}
      onChange={(e) => setSearchText(e.target.value)}
      value={searchText}
      border={border}
      small={small}
      showClearButton
    />
  );
};

Search.propTypes = {
  setSearchResultNotes: PropTypes.func.isRequired,
  placeholderText: PropTypes.string,
  clearSearch: PropTypes.func,
  border: PropTypes.bool,
  small: PropTypes.bool,
};

Search.defaultProps = {
  placeholderText: 'Search',
  border: false,
  small: false,
};

export default Search;
