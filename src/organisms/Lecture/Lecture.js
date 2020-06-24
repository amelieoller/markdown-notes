import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import MarkdownFormattedText from '../../components/MarkdownFormattedText';

const Lecture = ({ lecture, notes }) => {
  return (
    <StyledLecture>
      <h1 className="lecture-title">{lecture.title}</h1>

      {notes.map((note) => (
        <MarkdownFormattedText key={note.id} content={note.content} />
      ))}
    </StyledLecture>
  );
};

const StyledLecture = styled.div`
  h1 {
    font-size: 1.5em;
    margin-top: 0.83em;
    margin-bottom: 0.83em;
  }

  h2 {
    font-size: 1.17em;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  h3 {
    margin-top: 1.33em;
    margin-bottom: 1.33em;
  }

  h4 {
    font-size: 0.83em;
    margin-top: 1.67em;
    margin-bottom: 1.67em;
  }

  h5 {
    font-size: 0.67em;
    margin-top: 2.33em;
    margin-bottom: 2.33em;
  }

  h6 {
    font-size: 0.67em;
    margin-top: 2.33em;
    margin-bottom: 2.33em;
  }

  .lecture-title {
    font-size: 2em;
    margin-top: 0;
    margin-bottom: 0.67em;
  }

  & > div {
    margin-bottom: 45px;
  }
`;

Lecture.propTypes = {
  lecture: PropTypes.shape({
    title: PropTypes.string,
  }),
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      content: PropTypes.string,
    }),
  ),
};

export default Lecture;
