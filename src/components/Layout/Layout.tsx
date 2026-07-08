import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import Navbar from './Navbar';
import Footer from './Footer';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 120px; /* clear the transparent navbar + logo */

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding-top: 96px;
  }
`;

const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;