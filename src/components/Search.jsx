import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
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
      });
  };

  render() {
    const { query } = this.state;
    return (
      <>
        <form className="search" onSubmit={this.handleSearch}>
          <input
            type="text"
            placeholder="Search"
            onChange={e => this.setState({ query: e.target.value })}
            value={query}
          />
        </form>
        <span onClick={() => this.props.setSearchFilter([])}>Clear Search</span>
      </>
    );
  }
}

export default Search;
