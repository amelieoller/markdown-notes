import React from 'react';
import styled from 'styled-components';

import Login from '../../organisms/Login';

const LoginPage = () => {
  return (
    <StyledLoginPage>
      <Login />
    </StyledLoginPage>
  );
};

const StyledLoginPage = styled.div`
  padding: 60px;

  @media ${({ theme }) => theme.phone} {
    padding: 40px 20px;
  }
`;

export default LoginPage;
