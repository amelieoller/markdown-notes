import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';
import FLoatingLabelInput from './FLoatingLabelInput';
import Icon from './Icon';
import { ICONS } from '../constants';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      searched: false,
    };
  }

  handleSearch = (e) => {
    e.preventDefault();
    const { query } = this.state;

    if (query === '') return;

    const client = algoliasearch(
      process.env.REACT_APP_ALGOLIA_ID,
      process.env.REACT_APP_ALGOLIA_SEARCH_KEY,
    );
    const index = client.initIndex('notes');

    index
      .search({
        query,
      })
      .then((responses) => {
        const noteTags = responses.hits.map(note => note.objectID);
        this.props.setSearchFilter(noteTags);
        this.setState({
          searched: true,
        });
      });
  };

  onClearSearch = (e) => {
    e.preventDefault();
    const { query } = this.state;

    if (query === '') return;

    this.props.setSearchFilter([]);
    this.setState({
      query: '',
      searched: false,
    });
  };

  render() {
    const { query, searched } = this.state;

    return (
      <FLoatingLabelInput
        placeholderLabel="Search Notes"
        value={query}
        onChange={e => this.setState({ query: e.target.value })}
        onSubmit={this.handleSearch}
        id="search-notes"
      >
        {searched ? (
          <span
            className="search-icon"
            onClick={this.onClearSearch}
            role="button"
            onKeyPress={this.onClearSearch}
            tabIndex="0"
          >
            <Icon icon={ICONS.CLEAR} color="white" size={14} />
          </span>
        ) : (
          <span
            className="search-icon"
            onClick={this.handleSearch}
            role="button"
            onKeyPress={this.handleSearch}
            tabIndex="0"
          >
            <Icon icon={ICONS.SEARCH} color="white" size={14} />
          </span>
        )}
      </FLoatingLabelInput>
    );
  }
}

export default Search;
