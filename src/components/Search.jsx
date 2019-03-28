import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';
import styled from 'styled-components';
import Icon from './Icon';
import { ICONS } from '../constants';

const StyledSearch = styled.div`
  .search-input {
    border: 1px solid rgb(45, 45, 45);
    border-radius: 5px 0 0 5px;
    display: block;
    float: left;
    height: 30px;
    margin: 0;
    padding: 0 10px;
    width: 200px;
  }

  .input-group-btn {
    position: relative;
    font-size: 0;
    white-space: nowrap;
    width: 1%;
    vertical-align: middle;
    display: table-cell;
  }

  .search-button {
    background: linear-gradient(#333, rgb(45, 45, 45));
    box-sizing: border-box;
    border: 1px solid #444;
    border-left-color: rgb(45, 45, 45);
    border-radius: 0 5px 5px 0;
    box-shadow: 0 2px 0 rgb(45, 45, 45);
    display: block;
    float: left;
    height: 30px;
    line-height: 30px;
    margin: 0;
    padding: 0;
    position: relative;
    width: 50px;
    cursor: pointer;
    outline: none;
  }
`;

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

    this.props.setSearchFilter([]);
    this.setState({
      query: '',
      searched: false,
    });
  };

  render() {
    const { query, searched } = this.state;

    return (
      <StyledSearch>
        <input
          type="text"
          className="search-input"
          placeholder="Search Notes"
          onChange={e => this.setState({ query: e.target.value })}
          value={query}
          onKeyPress={e => e.key === 'Enter' && this.handleSearch(e)}
        />
        {searched ? (
          <button type="submit" className="search-button" onClick={e => this.onClearSearch(e)}>
            <Icon icon={ICONS.CLEAR} color="white" />
          </button>
        ) : (
          <button type="submit" className="search-button" onClick={e => this.handleSearch(e)}>
            <Icon icon={ICONS.SEARCH} color="white" />
          </button>
        )}
      </StyledSearch>
    );
  }
}

export default Search;
