import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';

import Button from '../../atoms/Button';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import Input from '../../atoms/Input/Input';
import { createTag } from '../../actions/tagActions';

const CreateTag = () => {
  const firestore = useFirestore();
  const currentUser = useSelector((state) => state.firebase.auth);

  const [isTagEditorOpen, setIsTagEditorOpen] = useState(false);
  const [tagText, setTagText] = useState('');

  const dispatch = useDispatch();

  const createNewTag = () => {
    setIsTagEditorOpen(false);

    if (tagText === '') return;

    const tag = {
      name: tagText,
      created: firestore.Timestamp.now(),
      userId: currentUser.uid,
    };

    dispatch(createTag(tag));
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
    </InputWrapper>
  ) : (
    <Button onClick={() => setIsTagEditorOpen(true)} label="Add Tag" small faded iconOnly>
      <Plus />
    </Button>
  );
};

const InputWrapper = styled.div`
  max-width: 200px;
`;

export default CreateTag;
