import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { deleteTag } from '../../actions/tagActions';
import Button from '../../atoms/Button';
import { ReactComponent as X } from '../../assets/icons/x.svg';

const InfoPage = () => {
  const dispatch = useDispatch();

  const tags = useSelector((state) => state.firestore.ordered.tags);

  const onDeleteTag = (tagId) => dispatch(deleteTag(tagId));

  return (
    <StyledInfoPage>
      <h1>Tags</h1>
      {tags &&
        tags.map((tag) => (
          <Tag key={tag.id}>
            {tag.name}
            <Button
              onClick={() => {
                const result = window.confirm(`Are you sure you want to delete '${tag.name}...'?`);
                result && onDeleteTag(tag.id);
              }}
              small
            >
              <X />
            </Button>
          </Tag>
        ))}

      <h1>Keyboard Shortcuts</h1>
      <table>
        <thead>
          <tr>
            <th colSpan="2">Formatting</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Bold</strong>
            </td>
            <td className="right">
              <code>⌘</code>+<code>b</code> or <code>**bold**</code>
            </td>
          </tr>

          <tr>
            <td>
              <em>Italic</em>
            </td>
            <td className="right">
              <code>⌘</code>+<code>i</code> or <code>_italic_</code> or <code>*italic*</code>
            </td>
          </tr>

          <tr>
            <td>Underline</td>
            <td className="right">
              <code>⌘</code>+<code>u</code>
            </td>
          </tr>

          <tr>
            <td>
              <h1>Large Header</h1>
            </td>
            <td className="right">
              <code>#</code> <code>Space</code>
            </td>
          </tr>

          <tr>
            <td>
              <h2>Medium Header</h2>
            </td>
            <td className="right">
              <code>##</code> <code>Space</code>
            </td>
          </tr>

          <tr>
            <td>
              <h2>Small Header</h2>
            </td>
            <td className="right">
              <code>###</code> <code>Space</code>
            </td>
          </tr>

          <tr>
            <td>
              <ul>
                <li>Bullet List</li>
              </ul>
            </td>
            <td className="right">
              <code>*</code> <code>Space</code> or <code>-</code> <code>Space</code>
            </td>
          </tr>

          <tr>
            <td>
              <ol>
                <li>Numbered List</li>
              </ol>
            </td>
            <td className="right">
              <code>1.</code> <code>Space</code>
            </td>
          </tr>

          <tr>
            <td>
              <blockquote>Blockquote</blockquote>
            </td>
            <td className="right">
              <code>{'>'}</code> <code>Space</code>
            </td>
          </tr>

          <tr>
            <td>
              <code>Code</code>
            </td>
            <td className="right">
              <code>`code`</code>
            </td>
          </tr>

          <tr>
            <td>
              <pre>
                <code>Code Block</code>
              </pre>
            </td>
            <td className="right">
              <code>```</code>
            </td>
          </tr>

          <tr>
            <td>Divider</td>
            <td className="right">
              <code>---</code>
            </td>
          </tr>
        </tbody>
      </table>
    </StyledInfoPage>
  );
};

const Tag = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-bottom: 5px;
  }

  button {
    margin-left: 5px;
  }
`;

const StyledInfoPage = styled.div`
  padding: 60px;
  max-width: 1000px;
  margin: 0 auto;

  .right {
    text-align: right;
  }
`;

export default InfoPage;
