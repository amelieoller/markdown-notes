import React, { useState } from 'react';
import * as firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { createUser } from '../../actions/userActions';
import Button from '../../atoms/Button';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailSignup, setEmailSignup] = useState('');
  const [passwordSignup, setPasswordSignup] = useState('');

  const [error, setErrors] = useState('');

  const dispatch = useDispatch();

  const formatUser = (userObj) => ({
    email: userObj.email,
    id: userObj.uid,
    photo: userObj.photoURL,
    displayName: userObj.displayName,
  });

  const createUserAndRedirect = (user) => {
    if (user) {
      dispatch(createUser(formatUser(user)));
      history.push('/notes');
    }
  };

  const handleLoginForm = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((res) => {
            createUserAndRedirect(res.user);
          })
          .catch((e) => {
            setErrors(e.message);
          });
      });
  };

  const handleSignupForm = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(emailSignup, passwordSignup)
          .then((res) => {
            createUserAndRedirect(res.user);
          })
          .catch((e) => {
            setErrors(e.message);
          });
      });
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((res) => {
            if (res.user) {
              createUserAndRedirect(res.user);
            }
          })
          .catch((e) => setErrors(e.message));
      });
  };

  return (
    <Wrapper>
      <LoginWrapper>
        <h1>Login</h1>
        <form onSubmit={(e) => handleLoginForm(e)}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
            type="password"
            placeholder="password"
          />

          <Button onClick={(e) => handleLoginForm(e)} type="submit">
            Login
          </Button>

          <span>{error}</span>
        </form>
      </LoginWrapper>

      <SignupWrapper>
        <h1>Signup</h1>
        <form onSubmit={(e) => handleSignupForm(e)}>
          <input
            value={emailSignup}
            onChange={(e) => setEmailSignup(e.target.value)}
            name="email"
            type="email"
            placeholder="email"
          />
          <input
            onChange={(e) => setPasswordSignup(e.target.value)}
            name="password"
            value={passwordSignup}
            type="password"
            placeholder="password"
          />
          <Button onClick={(e) => handleSignupForm(e)} type="submit">
            Signup
          </Button>

          <span>{error}</span>
        </form>
      </SignupWrapper>

      <GoogleButton>
        <Button onClick={() => signInWithGoogle()} className="googleBtn" type="button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          Login With Google
        </Button>
      </GoogleButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${({ theme }) => theme.spacingLarge};
`;

const LoginWrapper = styled.div``;

const SignupWrapper = styled.div``;

const GoogleButton = styled.div`
  img {
    width: 22px;
    margin-right: 10px;
  }
`;

export default withRouter(Login);

// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { firebase } from '../../Firestore';
// import Input from '../../atoms/Input/Input';
// import Button from '../../atoms/Button';

// const Login = (props) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = () => {
//     console.log('handleLogin');
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then((res) => {
//         console.log(res.user);
//       })
//       .catch((e) => {
//         console.log(('error', e));
//       });
//   };

//   const handleLogin = () => {
//     firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .then((res) => {
//         console.log(res.user);

//         // if (res.user) Auth.setLoggedIn(true);
//       })
//       .catch((e) => {
//         console.log(('error', e));
//       });
//   };

//   const handleGoogleLogin = () => {
//     // Using a popup.
//     var provider = new firebase.auth.GoogleAuthProvider();
//     provider.addScope('profile');
//     provider.addScope('email');

//     firebase
//       .auth()
//       .signInWithPopup(provider)
//       .then(function (result) {
//         // This gives you a Google Access Token.
//         var token = result.credential.accessToken;
//         // The signed-in user info.
//         var user = result.user;
//         debugger;
//       })
//       .catch((e) => {
//         console.log(('error', e));
//       });

//     // firebase
//     //   .auth()
//     //   .handleGoogleLogin(email, password)
//     //   .then((res) => {
//     //     console.log(res.user);

//     //     // if (res.user) Auth.setLoggedIn(true);
//     //   })
//     //   .catch((e) => {
//     //     console.log(('error', e));
//     //   });
//   };

//   return (
//     <LoginSignupWrapper>
//       <StyledLogin>
//         <h1>Login/Signup</h1>
//         <Input handleOnBlur={(e) => setEmail(e)} label="Email" type="email" border />
//         <Input handleOnBlur={(e) => setPassword(e)} label="Password" type="password" border />
//         <Buttons>
//           <Button onClick={handleLogin}>Login</Button>
//           <Button onClick={handleSignup}>Signup</Button>
//         </Buttons>

//         <Button onClick={handleGoogleLogin}>Login with Google</Button>
//       </StyledLogin>
//     </LoginSignupWrapper>
//   );
// };

// const LoginSignupWrapper = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-gap: ${({ theme }) => theme.spacingLarge};
// `;

// const StyledLogin = styled.div`
//   & > * {
//     margin-bottom: ${({ theme }) => theme.spacing};
//   }
// `;

// const Buttons = styled.div`
//   display: flex;

//   & > * {
//     margin-right: ${({ theme }) => theme.spacing};
//   }
// `;

// Login.propTypes = {};

// export default Login;
