import React, { useState, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Input from '../atoms/Input/Input';

const Search = ({ setSearchResultNotes, placeholderText, clearSearch, border, small }) => {
  const [searchText, setSearchText] = useState('');
  const [hasBeenSearched, setHasBeenSearched] = useState(false);

  const notes = useSelector((state) => state.firestore.ordered.notes);

  useEffect(() => {
    if (!searchText && hasBeenSearched) {
      setHasBeenSearched(false);
      clearSearch();
    }
  }, [searchText]);

  const handleSearch = (text) => {
    setSearchText(text);

    if (text === '') return;
    const lowerCaseText = text.toLowerCase();

    setHasBeenSearched(true);

    // In-App search (only for edittitles)
    const filteredNotes = notes.filter((n) => {
      if (n.textContent) {
        return lowerCaseText.split(' ').every((word) => n.textContent.toLowerCase().includes(word));
      } else {
        return lowerCaseText.split(' ').every((word) => n.title.toLowerCase().includes(word));
      }
    });

    setSearchResultNotes(filteredNotes);
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
      onChange={(e) => handleSearch(e.target.value)}
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
