import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import styled from 'styled-components';
import CreateTag from './CreateTag';
import { deleteTag } from '../actions/tagActions';

const StyledTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: white;

  .tag {
    margin: 0.2em 0.3em;
    font-size: 0.9em;
    font-weight: 300;
    cursor: pointer;
    text-decoration: underline;
  }

  .greyTag {
    margin: 0.2em 0.3em;
    font-size: 0.9em;
    font-weight: 300;
    cursor: pointer;
  }
`;

const Tags = ({
  tags, setTagFilter, filteredTags, deleteTag,
}) => (
  <StyledTags>
    {tags
      && tags.map(tag => (
        <div key={tag.id} className={filteredTags.includes(tag.id) ? 'tag' : 'greyTag'}>
          <span key={tag.id} onClick={() => setTagFilter(tag.id)}>
            {tag.name}
          </span>
          <span
            onClick={() => {
              const result = window.confirm('Want to delete?');
              result && deleteTag(tag.id);
            }}
          >
            {' '}
            x
          </span>
        </div>
      ))}
    <CreateTag />
  </StyledTags>
);

const mapStateToProps = state => ({
  tags: state.firestore.ordered.tags,
});

const mapDispatchToProps = dispatch => ({
  deleteTag: key => dispatch(deleteTag(key)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  firestoreConnect([{ collection: 'tags' }]),
)(Tags);
