import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CreateTag from './CreateTag';
import { deleteTag } from '../actions/tagActions';

const StyledTag = styled.span`
  color: white;
  margin: 0em 0.5em 1em 0em;
  font-size: 0.8em;
  font-weight: 300;
  cursor: pointer;
  border: 1px solid grey;
  padding: 4px 12px;
  border-radius: 15px;
  border-color: ${props => props.theme.lightPrimaryHighlight};
  background: ${props => (props.isHighlighted ? props.theme.lightPrimaryHighlight : 'transparent')};

  &:hover {
    transition: background-color 0.2s ease;
    background-color: ${props => props.theme.lightPrimaryHighlight};
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
        <StyledTag key={tag.id} {...tag} isHighlighted={filteredTags.includes(tag.id)}>
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

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object),
  setTagFilter: PropTypes.func.isRequired,
  filteredTags: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteTag: PropTypes.func.isRequired,
};

Tags.defaultProps = { tags: [] };

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  firestoreConnect([{ collection: 'tags' }]),
)(Tags);
