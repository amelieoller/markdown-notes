import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import * as firebase from 'firebase/app';

import Button from '../../atoms/Button';
import { sortByString } from '../../components/utils';
import Tag from './Tag';

const InfoPage = () => {
  const tags = useSelector((state) => state.firestore.ordered.tags);
  const currentUser = useSelector((state) => state.firebase.auth);

  useFirestoreConnect([
    {
      collection: 'tags',
      where: [['userId', '==', currentUser.uid]],
    },
  ]);

  const handleDeleteAccount = () => {
    const user = firebase.auth().currentUser;

    user
      .delete()
      .then(() => {
        // User deleted.
      })
      .catch((error) => {
        console.log('Error', error);
        // An error happened.
      });

    // TODO: delete all notes associated with that user (functions)
  };

  return (
    <StyledInfoPage>
      <h1>Delete Tags</h1>
      <table>
        <thead>
          <tr>
            <th colSpan="2">Tags</th>
          </tr>
        </thead>
        <tbody>
          {tags && sortByString(tags, 'name').map((tag) => <Tag tag={tag} key={tag.id} />)}
        </tbody>
      </table>

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

      <h1>Danger Zone</h1>
      <Button
        onClick={() => {
          const result = window.confirm(
            'Are you sure you want to delete your account? All notes will be lost.',
          );
          result && handleDeleteAccount();
        }}
        label="Delete Account"
        danger
      >
        Delete Account
      </Button>
    </StyledInfoPage>
  );
};

const StyledInfoPage = styled.div`
  padding: 60px;
  max-width: 880px;
  margin: 0 auto;

  .right {
    text-align: right;

    button {
      margin-left: auto;
    }
  }

  tr:hover,
  tr:focus {
    background: ${({ theme }) => theme.onSurfaceThree};
  }

  @media ${({ theme }) => theme.tablet} {
    padding: 40px 20px;
  }
`;

export default InfoPage;
