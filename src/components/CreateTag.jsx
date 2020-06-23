import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';

import { createTag } from '../actions/tagActions';
import FloatingLabelInput from './FloatingLabelInput';
import Icon from './Icon';
import { ICONS } from '../constants';

const CreateTag = () => {
  const [tagContent, setTagContent] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const firestore = useFirestore();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (tagContent === '') return;

    const tag = {
      name: tagContent,
      created: firestore.Timestamp.now(),
    };

    dispatch(createTag(tag));

    setTagContent('');
    setIsFormOpen(false);
  };

  return (
    <StyledCreateTag>
      {!isFormOpen ? (
        <StyledPlus onClick={() => setIsFormOpen(true)}>+</StyledPlus>
      ) : (
        <FloatingLabelInput
          placeholderLabel="New Tag"
          id="new-tag"
          value={tagContent}
          onChange={(e) => setTagContent(e.target.value)}
          onSubmit={(e) => handleSubmit(e)}
        >
          {isFormOpen && (
            <span
              className="search-icon"
              role="button"
              tabIndex="0"
              onClick={() => setIsFormOpen(false)}
              onKeyPress={() => setIsFormOpen(false)}
            >
              <Icon icon={ICONS.CLEAR} color="white" size={14} />
            </span>
          )}
        </FloatingLabelInput>
      )}
    </StyledCreateTag>
  );
};

const StyledCreateTag = styled.span`
  margin-left: 1rem;
`;

const StyledPlus = styled.span`
  display: inline-block;
  padding: 0.2em 0;
  cursor: pointer;
`;

export default CreateTag;
