import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import PropTypes from 'prop-types';

import FloatingLabelInput from './FloatingLabelInput';
import Icon from './Icon';
import { ICONS } from '../constants';
import { mockResults } from './mockSearchResults';
import Input from '../atoms/Input/Input';

const Search = ({ setSearchResultNotes, placeholderText }) => {
  const [query, setQuery] = useState('');
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

  const onClearSearch = (e) => {
    // e.preventDefault();

    if (query === '') return;

    setQuery('');
    setSearchResultNotes([]);
    setSearched(false);
  };

  return (
    <Input label={placeholderText} handleOnBlur={handleSearch} defaultValue={query} />
    // <FloatingLabelInput
    //   placeholderLabel="Search Notes"
    //   value={query}
    //   onChange={(e) => setQuery(e.target.value)}
    //   onSubmit={handleSearch}
    //   id="search-notes"
    // >
    //   {searched ? (
    //     <span
    //       className="search-icon"
    //       onClick={onClearSearch}
    //       role="button"
    //       onKeyPress={onClearSearch}
    //       tabIndex="0"
    //     >
    //       <Icon icon={ICONS.CLEAR} color="white" size={14} />
    //     </span>
    //   ) : (
    //     <span
    //       className="search-icon"
    //       onClick={handleSearch}
    //       role="button"
    //       onKeyPress={handleSearch}
    //       tabIndex="0"
    //     >
    //       <Icon icon={ICONS.SEARCH} color="white" size={14} />
    //     </span>
    //   )}
    // </FloatingLabelInput>
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
