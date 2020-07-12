import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const SidebarsMainTemplate = ({ children }) => {
  return (
    <StyledSidebarsMainTemplate>
      <SidebarWrapper>{children[0]}</SidebarWrapper>
      <SidebarWrapper>{children[1]}</SidebarWrapper>
      <MainView>{children[2]}</MainView>
    </StyledSidebarsMainTemplate>
  );
};

const StyledSidebarsMainTemplate = styled.main`
  transition: 1s ease;
  position: fixed;
  overflow: hidden;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;

  & > * {
    height: 100%;
    overflow: hidden;
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
  }
`;

const SidebarWrapper = styled.div`
  flex: 0 0 auto;
  position: relative;

  & > * {
    & > *:last-child {
      height: 100%;
      overflow-y: scroll;
      padding-bottom: 120px;
    }
  }
`;

const MainView = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacingLarge} 60px;
  overflow-y: scroll;
  height: 100%;
  width: 100%;

  & > * {
    max-width: 1000px;
    margin: 0 auto;

    & > *:first-child {
      margin-top: 0;
    }
  }
`;

SidebarsMainTemplate.propTypes = {};

export default SidebarsMainTemplate;
