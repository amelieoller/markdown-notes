import React, { useState } from 'react';
import * as firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../../atoms/Button';
import Input from '../../atoms/Input/Input';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const username = 'test';

    if (isLogin) {
      firebase
        .login({
          email,
          password,
        })
        .catch((error) => setErrors(error.message));
    } else {
      firebase
        .createUser({ email, password }, { username, email })
        .catch((error) => setErrors(error.message));
    }
  };

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: 'google',
        type: 'redirect',
      })
      .catch((error) => setErrors(error.message));
  };

  const passwordReset = () => {
    firebase.resetPassword(email);
  };

  return (
    <LoginSignupWrapper>
      <Header>
        <button className={isLogin ? 'isActive' : ''} onClick={() => setIsLogin(true)}>
          Login
        </button>
        <button className={!isLogin ? 'isActive' : ''} onClick={() => setIsLogin(false)}>
          Signup
        </button>
      </Header>

      <Error>{error}</Error>

      <FormWrapper onSubmit={(e) => handleFormSubmit(e)}>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          label="Email"
          border
        />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          label="Password"
          border
        />

        <PasswordReset>
          Forgot your password? <button onClick={passwordReset}>Reset password</button>
        </PasswordReset>

        <ButtonWrapper>
          <Button onClick={(e) => handleFormSubmit(e)}>{isLogin ? 'Login' : 'Signup'}</Button>
          or
          <GoogleButton>
            <Button onClick={() => signInWithGoogle()} className="googleBtn" type="button">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="logo"
              />
              Login with Google
            </Button>
          </GoogleButton>
        </ButtonWrapper>
      </FormWrapper>
    </LoginSignupWrapper>
  );
};

const LoginSignupWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;

  button {
    background: transparent;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 5px;
  }

  .isActive {
    font-weight: bold;
  }
`;

const Error = styled.div`
  color: ${({ theme }) => theme.danger};
  font-size: 0.9rem;
  padding: 5px 0;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: ${({ theme }) => theme.spacing};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const PasswordReset = styled.div`
  text-align: right;
  font-size: 0.8rem;

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    text-decoration: underline;
    color: ${({ theme }) => theme.primary};

    &:hover {
      color: ${({ theme }) => theme.primaryFaded};
    }
  }
`;

const GoogleButton = styled.div`
  img {
    width: 22px;
    margin-right: 10px;
  }
`;

export default withRouter(Login);
