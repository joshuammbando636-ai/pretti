import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

const reveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Overlay = styled.div<{ $leaving: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f9e6ec;
  opacity: ${p => (p.$leaving ? 0 : 1)};
  visibility: ${p => (p.$leaving ? 'hidden' : 'visible')};
  transition: opacity 1s ease, visibility 1s ease;
`;

const Wordmark = styled.h1`
  font-family: ${theme.fonts.heading};
  font-weight: 800;
  font-size: clamp(3.5rem, 14vw, 9rem);
  color: ${theme.colors.primaryHover};
  letter-spacing: -2px;
  line-height: 1;
  margin-bottom: 4rem;
  opacity: 0;
  animation: ${reveal} 1.2s ease forwards 0.4s;

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-bottom: 2.5rem;
  }
`;

const Tagline = styled.p`
  font-family: ${theme.fonts.heading};
  font-style: italic;
  font-size: clamp(1rem, 2vw, 1.3rem);
  line-height: 1.6;
  color: ${theme.colors.dark};
  text-align: center;
  margin-bottom: ${theme.spacing.large};
  opacity: 0;
  animation: ${reveal} 1.2s ease forwards 1.1s;
`;

const Signature = styled.p`
  font-family: ${theme.fonts.accent};
  font-size: clamp(1.3rem, 2.6vw, 1.7rem);
  color: ${theme.colors.secondaryHover};
  opacity: 0;
  animation: ${reveal} 1.2s ease forwards 1.8s;
`;

const Preloader: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    setVisible(true);
    document.body.classList.add('site-blurred');

    const leaveTimer = setTimeout(() => {
      setLeaving(true);
      document.body.classList.remove('site-blurred');
    }, 3800);
    const cleanupTimer = setTimeout(() => setVisible(false), 4800);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(cleanupTimer);
      document.body.classList.remove('site-blurred');
    };
  }, []);

  if (!visible) return null;

  return (
    <Overlay $leaving={leaving} aria-hidden="true">
      <Wordmark>Preetie Decor</Wordmark>
      <Tagline>Every celebration, beautifully dressed.</Tagline>
      <Signature>Harpreet Kaur Dogra</Signature>
    </Overlay>
  );
};

export default Preloader;
