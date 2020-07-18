import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ReactComponent as Book } from '../../assets/icons/book.svg';
import { ReactComponent as GraduationCap } from '../../assets/icons/graduation-cap.svg';
import { ReactComponent as Info } from '../../assets/icons/info.svg';
import { ReactComponent as Logout } from '../../assets/icons/log-out.svg';
import { deleteUser } from '../../actions/userActions';

const Navigation = ({ history }) => {
  const page = history.location.pathname;
  const dispatch = useDispatch();

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
      <button onClick={() => dispatch(deleteUser())}>
        <Logout />
      </button>
    </StyledNavigation>
  );
};

const StyledNavigation = styled.nav`
  position: absolute;
  right: 0;
  z-index: 1;
  padding: ${({ theme }) => theme.spacing};

  a,
  button {
    margin-left: ${({ theme }) => theme.spacing};
    background: transparent;
    border: none;
    cursor: pointer;

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
