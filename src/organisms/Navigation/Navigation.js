import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ReactComponent as Award } from '../../assets/icons/award.svg';
import { ReactComponent as Droplet } from '../../assets/icons/droplet.svg';

const Navigation = () => {
  return (
    <StyledNavigation>
      <Link to="/notes">
        <Award />
      </Link>
      <Link to="/lectures">
        <Droplet />
      </Link>
    </StyledNavigation>
  );
};

const StyledNavigation = styled.nav`
  position: absolute;
  right: 0;
  z-index: 1;
  padding: ${({ theme }) => theme.spacingLarge};

  a {
    margin-left: 20px;

    &:hover {
      svg {
        color: ${({ theme }) => theme.primary};
      }
    }

    svg {
      color: ${({ theme }) => theme.onBackgroundLight};
      transition: 0.2s ease;
    }
  }
`;

Navigation.propTypes = {};

export default Navigation;
