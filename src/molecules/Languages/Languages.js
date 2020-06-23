import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { ReactComponent as JavaScript } from '../../assets/icons/javascript.svg';
import { ReactComponent as Ruby } from '../../assets/icons/ruby.svg';
import { ReactComponent as ReactIcon } from '../../assets/icons/react.svg';
import { ReactComponent as Css } from '../../assets/icons/css3.svg';
import { ReactComponent as Html } from '../../assets/icons/html5.svg';
import { ReactComponent as Python } from '../../assets/icons/python.svg';
import { ReactComponent as Code } from '../../assets/icons/code.svg';
import { ReactComponent as Git } from '../../assets/icons/git.svg';
import { ReactComponent as Sass } from '../../assets/icons/sass.svg';
import { ReactComponent as Yarn } from '../../assets/icons/yarn.svg';
import { ReactComponent as Terminal } from '../../assets/icons/terminal.svg';

const Languages = ({ handleChange, language }) => {
  return (
    <StyledLanguages>
      <Code
        onClick={() => handleChange({ language: 'code' })}
        className={language === 'code' ? 'no-fill active' : 'no-fill'}
      />
      <Terminal
        onClick={() => handleChange({ language: 'terminal' })}
        className={language === 'terminal' ? 'no-fill active' : 'no-fill'}
      />
      <JavaScript
        onClick={() => handleChange({ language: 'javascript' })}
        className={language === 'javascript' ? 'active' : ''}
      />
      <Ruby
        onClick={() => handleChange({ language: 'ruby' })}
        className={language === 'ruby' ? 'active' : ''}
      />
      <ReactIcon
        onClick={() => handleChange({ language: 'react' })}
        className={language === 'react' ? 'active' : ''}
      />
      <Css
        onClick={() => handleChange({ language: 'css' })}
        className={language === 'css' ? 'active' : ''}
      />
      <Html
        onClick={() => handleChange({ language: 'html' })}
        className={language === 'html' ? 'active' : ''}
      />
      <Python
        onClick={() => handleChange({ language: 'python' })}
        className={language === 'python' ? 'active' : ''}
      />
      <Git
        onClick={() => handleChange({ language: 'git' })}
        className={language === 'git' ? 'active' : ''}
      />
      <Sass
        onClick={() => handleChange({ language: 'sass' })}
        className={language === 'sass' ? 'active' : ''}
      />
      <Yarn
        onClick={() => handleChange({ language: 'yarn' })}
        className={language === 'yarn' ? 'active' : ''}
      />
    </StyledLanguages>
  );
};

const StyledLanguages = styled.div`
  svg {
    fill: ${({ theme }) => theme.onBackgroundLight};
    cursor: pointer;
    margin-right: ${({ theme }) => theme.spacing};

    &.active,
    &:hover {
      fill: ${({ theme }) => theme.primary};
    }

    &.no-fill {
      fill: none;
      color: ${({ theme }) => theme.onBackgroundLight};

      &.active,
      &:hover {
        color: ${({ theme }) => theme.primary};
      }
    }
  }
`;

Languages.propTypes = {
  handleChange: PropTypes.func,
  language: PropTypes.string,
};

export default Languages;
