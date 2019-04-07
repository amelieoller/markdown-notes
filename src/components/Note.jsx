import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import styled from 'styled-components';
import { deleteNote } from '../actions/noteActions';
import MarkdownField from './MarkdownField';
import Button from './Button';
import Icon from './Icon';
import { ICONS } from '../constants';

const StyledNote = styled.div`
  display: inline-block;
  width: 100%;
  background: #fff;
  margin-bottom: 1em;
  position: relative;

  .clear-button {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0.5rem;
    cursor: pointer;
    filter: drop-shadow(2px 2px 1.4px rgba(0, 0, 0, 0.3));

    &:hover path {
      transition: fill 0.3s ease;
      fill: ${props => props.theme.primaryHighlight} !important;
    }
  }

  > *:first-child {
    padding: 0.73em 1.5em;
    white-space: pre-line;
    position: relative;
  }

  .footer {
    border-top: 1px solid rgba(0, 0, 0, 0.125);
    background-color: rgba(0, 0, 0, 0.03);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em 1.5em;
  }

  .footer .left button {
    margin-right: 0.25em;
  }

  .tags.right {
    display: flex;
    font-weight: 300;
    flex-wrap: wrap;

    .tag {
      margin-left: 7px;
    }
  }
`;

const Note = ({
  note, deleteNote, setEditNote, tags,
}) => (
  <StyledNote>
    <MarkdownField content={note.content} />
    <Icon
      className="clear-button"
      onClick={() => {
        const result = window.confirm(
          `Are you sure you want to delete '${note.content.substr(0, 25)}...'?`,
        );
        result && deleteNote(note.id);
      }}
      icon={ICONS.TRASH}
      color="#909598"
      size={16}
    />
    <div className="footer">
      <div className="left">
        <Button
          text="Edit"
          onClick={() => {
            setEditNote(note);
          }}
        />
      </div>
      <div className="right tags">
        {note.tagIds
          && tags
            .filter(t => note.tagIds.includes(t.id))
            .map(tag => (
              <div key={tag.id} className="tag">
                {tag.name}
              </div>
            ))}
      </div>
    </div>
  </StyledNote>
);

Note.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.string,
    created: PropTypes.object,
  }).isRequired,
  setEditNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = dispatch => ({
  deleteNote: key => dispatch(deleteNote(key)),
});

const mapStateToProps = state => ({
  tags: state.firestore.ordered.tags,
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  firestoreConnect([{ collection: 'tags' }]),
)(Note);
