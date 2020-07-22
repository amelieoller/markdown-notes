import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { ReactComponent as Book } from '../../assets/icons/book.svg';
import { ReactComponent as GraduationCap } from '../../assets/icons/graduation-cap.svg';
import { ReactComponent as Info } from '../../assets/icons/info.svg';
import { ReactComponent as Logout } from '../../assets/icons/log-out.svg';
import * as firebase from 'firebase';
import Button from '../../atoms/Button';

const Navigation = ({ history }) => {
  const page = history.location.pathname;

  const logoutUser = () => {
    firebase.logout();
  };

  return (
    <StyledNavigation>
      <Link to="/notes">
        <Book className={page === '/notes' ? 'active' : ''} />
      </Link>
      <Link to="/lectures">
        <GraduationCap className={page === '/lectures' ? 'active' : ''} />
      </Link>
      <Link to="/info">
        <Info className={page === '/info' ? 'active' : ''} />
      </Link>
      <Button onClick={logoutUser} label="Logout" iconOnly>
        <Logout />
      </Button>
    </StyledNavigation>
  );
};

const StyledNavigation = styled.nav`
  position: absolute;
  right: 0;
  z-index: 1;
  padding: ${({ theme }) => theme.spacing};
  display: flex;
  align-items: center;

  a,
  button {
    margin-left: ${({ theme }) => theme.spacing};
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;

    svg {
      color: ${({ theme }) => theme.onBackgroundLight};
      transition: 0.2s ease;
    }

    svg.active {
      color: ${({ theme }) => theme.primary};
    }

    &:hover {
      svg {
        color: ${({ theme }) => theme.primary};
      }
    }
  }
`;

Navigation.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
};

export default withRouter(Navigation);
