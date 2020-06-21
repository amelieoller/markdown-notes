import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CheckSquare from '_assets/icons/check-square.svg';
import Square from '_assets/icons/square.svg';

const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.medium('onSurface')};

  svg {
    color: ${({ theme, isChecked }) => isChecked && theme.colors.secondary};
    margin-right: 6px;
  }

  &:hover svg {
    color: ${({ theme, isChecked }) =>
      isChecked ? theme.colors.darker(1, 'secondary') : theme.colors.secondary};
  }

  label {
    cursor: pointer;
  }
`;

const Checkbox = ({ label, onChange, checked }) => {
  const [isChecked, setIsChecked] = useState(checked ? 1 : 0);

  const handleCheck = () => {
    onChange();
    setIsChecked((state) => (state + 1) % 2);
  };

  return (
    <StyledCheckbox
      onClick={handleCheck}
      onKeyDown={(e) => e.keyCode === 13 && handleCheck()}
      tabIndex={0}
      isChecked={isChecked}
    >
      {isChecked ? <CheckSquare /> : <Square />}

      <label htmlFor="checkbox">{label}</label>
    </StyledCheckbox>
  );
};

Checkbox.defaultProps = {
  checked: false,
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
};

export default Checkbox;
