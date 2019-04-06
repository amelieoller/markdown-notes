import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import styled from 'styled-components';
import CreateTag from './CreateTag';
import { deleteTag } from '../actions/tagActions';

const StyledTag = styled.span`
  color: white;

  .tag {
    margin: 0em 0.5em 0.5em 0em;
    font-size: 0.8em;
    font-weight: 300;
    cursor: pointer;
    border: 1px solid grey;
    padding: 4px 12px;
    border-radius: 15px;
    border-color: ${props => props.theme.lightPrimaryHighlight};

    &:hover {
      transition: background-color 0.2s ease;
      background-color: ${props => props.theme.lightPrimaryHighlight};
    }
  }

  .highlighted {
    background: ${props => props.theme.lightPrimaryHighlight};
  }

  .delete {
    color: ${props => props.theme.lightPrimaryHighlight};
    margin-left: 8px;

    &:hover {
      transition: color 0.2s ease;
      color: white;
    }
  }
`;

const Tags = ({
  tags, setTagFilter, filteredTags, deleteTag,
}) => (
  <>
    {tags
      && tags.map(tag => (
        <StyledTag>
          <div key={tag.id} className={filteredTags.includes(tag.id) ? 'tag highlighted' : 'tag'}>
            <span key={tag.id} onClick={() => setTagFilter(tag.id)}>
              {tag.name}
            </span>
            <span
              onClick={() => {
                const result = window.confirm('Want to delete?');
                result && deleteTag(tag.id);
              }}
              className="delete"
            >
              x
            </span>
          </div>
        </StyledTag>
      ))}
    <CreateTag />
  </>
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
