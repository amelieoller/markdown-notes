import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InfoPage = (props) => {
  return (
    <StyledInfoPage>
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

const StyledInfoPage = styled.div`
  padding: 60px;

  .right {
    text-align: right;
  }
`;

InfoPage.propTypes = {};

export default InfoPage;
