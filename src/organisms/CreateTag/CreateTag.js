import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';

import Button from '../../atoms/Button';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import Input from '../../atoms/Input/Input';
import { createTag } from '../../actions/tagActions';

const CreateTag = () => {
  const firestore = useFirestore();

  const [isTagEditorOpen, setIsTagEditorOpen] = useState(false);

  const dispatch = useDispatch();

  const createNewTag = (tagContent) => {
    setIsTagEditorOpen(false);

    if (tagContent === '') return;

    const tag = {
      name: tagContent,
      created: firestore.Timestamp.now(),
    };

    dispatch(createTag(tag));
  };

  return isTagEditorOpen ? (
    <InputWrapper>
      <Input label="New Tag" onKeyDown={createNewTag} border small />
    </InputWrapper>
  ) : (
    <Button onClick={() => setIsTagEditorOpen(true)} type="button" small faded iconOnly>
      <Plus />
    </Button>
  );
};

const InputWrapper = styled.div`
  max-width: 200px;
`;

CreateTag.propTypes = {};

export default CreateTag;
