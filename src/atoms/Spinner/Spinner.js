import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const ldsSpinner = keyframes`
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
`;

const Spinner = ({ paddingTop, small }) => {
  return (
    <Container paddingTop={paddingTop} small={small}>
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${({ paddingTop }) => `${paddingTop}vh`};

  .lds-spinner {
    color: red;
    display: inline-block;
    position: relative;
    width: ${({ small }) => (small ? '60px' : '80px')};
    height: ${({ small }) => (small ? '60px' : '80px')};
  }

  .lds-spinner div {
    transform-origin: ${({ small }) => (small ? '30px 30px' : '40px 40px')};
    animation: ${ldsSpinner} 1.2s linear infinite;
  }

  .lds-spinner div:after {
    content: ' ';
    display: block;
    position: absolute;
    top: ${({ small }) => (small ? '2px' : '3px')};
    left: ${({ small }) => (small ? '28px' : '37px')};
    width: ${({ small }) => (small ? '5px' : '6px')};
    height: ${({ small }) => (small ? '14px' : '18px')};
    border-radius: 20%;
    background: ${({ theme }) => theme.primary};
  }

  .lds-spinner div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }

  .lds-spinner div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }

  .lds-spinner div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }

  .lds-spinner div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }

  .lds-spinner div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }

  .lds-spinner div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }

  .lds-spinner div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }

  .lds-spinner div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }

  .lds-spinner div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }

  .lds-spinner div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }

  .lds-spinner div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }

  .lds-spinner div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
`;

Spinner.propTypes = {
  paddingTop: PropTypes.number,
  small: PropTypes.bool,
};

Spinner.defaultProps = {
  paddingTop: 25,
  small: false,
};

export default Spinner;
