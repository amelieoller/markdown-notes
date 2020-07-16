import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { ReactComponent as Book } from '../../assets/icons/book.svg';
import { ReactComponent as GraduationCap } from '../../assets/icons/graduation-cap.svg';
import { ReactComponent as Info } from '../../assets/icons/info.svg';

const Navigation = ({ history }) => {
  const page = history.location.pathname;

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
    </StyledNavigation>
  );
};

const StyledNavigation = styled.nav`
  position: absolute;
  right: 0;
  z-index: 1;
  padding: ${({ theme }) => theme.spacing};

  a {
    margin-left: ${({ theme }) => theme.spacing};

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
