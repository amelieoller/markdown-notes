import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Login from '../../organisms/Login';

const LoginPage = (props) => {
  return (
    <StyledLoginPage>
      <Login />
    </StyledLoginPage>
  );
};

const StyledLoginPage = styled.div`
  padding: 60px;
`;

LoginPage.propTypes = {};

export default LoginPage;
