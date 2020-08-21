import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';

import Button from '../../atoms/Button';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import Input from '../../atoms/Input/Input';
import { createTag } from '../../actions/tagActions';
import { toCamelCase } from '../../components/utils';

const CreateTag = () => {
  const firestore = useFirestore();
  const currentUser = useSelector((state) => state.firebase.auth);
  const tags = useSelector((state) => state.firestore.ordered.tags);

  const [isTagEditorOpen, setIsTagEditorOpen] = useState(false);
  const [tagText, setTagText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const createNewTag = () => {
    // If tagText is empty
    if (tagText === '') {
      setErrorMessage('Tag name cannot be empty');
      return;
    }

    const name = toCamelCase(tagText);

    // If tag already exists
    if (tags.some((t) => t.name === name)) {
      setErrorMessage('Tag name already exists');
      return;
    }

    // Otherwise success, create tag, and reset state
    const tag = {
      name,
      created: firestore.Timestamp.now(),
      userId: currentUser.uid,
    };

    dispatch(createTag(tag));

    setIsTagEditorOpen(false);
    setTagText('');
    setErrorMessage('');
  };

  return isTagEditorOpen ? (
    <InputWrapper>
      <Input
        label="New Tag"
        onChange={(e) => setTagText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && createNewTag()}
        value={tagText}
        border
        small
        autoFocus
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </InputWrapper>
  ) : (
    <Button onClick={() => setIsTagEditorOpen(true)} label="Add Tag" small faded iconOnly>
      <Plus />
    </Button>
  );
};

const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  & *:first-child {
    width: 200px;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.danger};
  font-size: 14px;
  margin-left: 5px;
`;

export default CreateTag;
