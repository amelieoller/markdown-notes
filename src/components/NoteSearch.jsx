import React from 'react';
import PropTypes from 'prop-types';

import Input from '../atoms/Input/Input';

const NoteSearch = ({ placeholderText, searchText, setSearchText }) => {
  const handleSearch = (text) => {
    const lowerCaseText = text.toLowerCase();

    setSearchText(lowerCaseText);
  };

  const clearInput = () => {
    setSearchText('');
  };

  return (
    <Input
      label={placeholderText}
      onKeyDown={(e) => e.key === 'Enter' && handleSearch(e.target.value)}
      clearInput={clearInput}
      onChange={(e) => handleSearch(e.target.value)}
      value={searchText}
      showClearButton
    />
  );
};

NoteSearch.propTypes = {
  placeholderText: PropTypes.string,
  border: PropTypes.bool,
  small: PropTypes.bool,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
};

NoteSearch.defaultProps = {
  placeholderText: 'Search',
  border: false,
  small: false,
};

export default NoteSearch;
