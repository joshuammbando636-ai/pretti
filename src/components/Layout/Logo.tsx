import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const LogoContainer = styled.div`
  position: absolute;
  left: 5px;
  top: 75%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  z-index: 1001;

  @media (max-width: ${theme.breakpoints.tablet}) {
    left: 15px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    left: 10px;
  }
`;

const LogoImage = styled.img`
  height: 230px;
  width: auto;
  max-width: 220px;
  object-fit: contain;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 180px;  /* Increased from 70px to 180px */
    max-width: 180px; /* Increased from 190px to 180px */
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 150px;  /* Increased from 60px to 150px */
    max-width: 150px; /* Increased from 160px to 150px */
  }

  /* Even smaller phones */
  @media (max-width: 480px) {
    height: 120px;
    max-width: 120px;
  }

  /* Very small phones */
  @media (max-width: 360px) {
    height: 100px;
    max-width: 100px;
  }
`;

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <LogoContainer className={className}>
      <LogoImage 
        src="/images/Pr.png" 
        alt="Prettiee Decor"
      />
    </LogoContainer>
  );
};

export default Logo;