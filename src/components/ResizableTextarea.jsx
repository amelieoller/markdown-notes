import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';

const ResizableTextarea = ({ mdChange, value }) => (
  <TextareaAutosize
    className="resizable-textarea"
    onChange={mdChange}
    value={value}
    placeholder="New Note"
  />
);

export default ResizableTextarea;
