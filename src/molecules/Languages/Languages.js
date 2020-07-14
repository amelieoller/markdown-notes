import React, { useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);

  const iconComponents = {
    javascript: JavaScript,
    ruby: Ruby,
    react: ReactIcon,
    css: Css,
    html: Html,
    python: Python,
    code: Code,
    git: Git,
    sass: Sass,
    yarn: Yarn,
    terminal: Terminal,
  };

  const CurrentIcon = iconComponents[language || 'code'];

  return (
    <StyledLanguages>
      <CurrentIcon onClick={() => setIsOpen((prevOpen) => !prevOpen)} className=" active" />

      {isOpen && (
        <OtherIcons>
          {Object.keys(iconComponents).map((comp) => {
            const LanguageIcon = iconComponents[comp];

            return (
              <LanguageIcon
                key={comp}
                onClick={() => {
                  handleChange({ language: comp });
                  setIsOpen((prevOpen) => !prevOpen);
                }}
                className={language === comp ? 'active' : ''}
              />
            );
          })}
        </OtherIcons>
      )}
    </StyledLanguages>
  );
};

const StyledLanguages = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  svg {
    fill: ${({ theme }) => theme.onBackgroundLight};
    cursor: pointer;
    margin-right: ${({ theme }) => theme.spacing};
    height: 30px;
    width: 30px;

    &.active,
    &:hover {
      fill: ${({ theme }) => theme.primary};
    }
  }
`;

const OtherIcons = styled.div`
  position: absolute;
  width: 260px;
  left: -230px;
  background: #363740;
  border-radius: 3px;
  padding: 10px;
`;

Languages.propTypes = {
  handleChange: PropTypes.func,
  language: PropTypes.string,
};

export default Languages;
