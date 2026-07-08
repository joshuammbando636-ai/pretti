import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';
import Logo from './Logo';

/* ── Fixed frosted strip: blurs page content as it scrolls up under the navbar ── */
const TopBlur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 130px;
  z-index: 999;
  pointer-events: none;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 55%, transparent 100%);

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 112px;
  }
`;

/* ── Top bar: kept only to hold the logo and reserve layout space ───────────── */
const NavbarContainer = styled.nav`
  width: 100%;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 88px;
  display: flex;
  align-items: center;
  pointer-events: none;

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 112px;
  }
`;

const NavContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 ${theme.spacing.large};
  position: relative;
  height: 100%;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.medium};
  }
`;

/* ── Floating bubble button (fixed top-right, sits above the panel) ─────────── */
const Bubble = styled.button<{ $open: boolean; $reduce: boolean; $isDesktop: boolean }>`
  position: fixed;
  top: 18px;
  right: 24px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: none;
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2200;
  transition: ${p => (p.$reduce ? 'none' : 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease')};

  &:hover {
    transform: ${p => (p.$reduce ? 'none' : 'scale(1.08)')};
    box-shadow: ${theme.shadows.hover};
  }

  &:focus-visible {
    outline: 3px solid ${theme.colors.accent};
    outline-offset: 3px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    top: 20px;
    width: 80px;
    height: 80px;
    background: ${p => (p.$open && !p.$isDesktop ? theme.colors.dark : theme.colors.white)};
  }
`;

const Bars = styled.span`
  position: relative;
  display: block;
  width: 22px;
  height: 16px;
`;

const Bar = styled.span<{ $open: boolean; $pos: 'top' | 'mid' | 'bot'; $reduce: boolean; $isDesktop: boolean }>`
  position: absolute;
  left: 0;
  width: 100%;
  height: 2.5px;
  border-radius: 2px;
  background: ${theme.colors.primary};
  transition: ${p =>
    p.$reduce ? 'none' : 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease, background 0.3s ease'};

  @media (max-width: ${theme.breakpoints.tablet}) {
    background: ${p => (p.$open && !p.$isDesktop ? theme.colors.white : theme.colors.primary)};
  }

  ${p =>
    p.$pos === 'top' &&
    css`
      top: 0;
      ${p.$open && css`transform: translateY(6.75px) rotate(45deg);`}
    `}
  ${p =>
    p.$pos === 'mid' &&
    css`
      top: 6.75px;
      ${p.$open && css`opacity: 0; transform: scaleX(0);`}
    `}
  ${p =>
    p.$pos === 'bot' &&
    css`
      bottom: 0;
      ${p.$open && css`transform: translateY(-6.75px) rotate(-45deg);`}
    `}
`;

/* ── Shared blurred backdrop ────────────────────────────────────────────────── */
const Backdrop = styled.div<{ $open: boolean; $reduce: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(20, 20, 20, 0.65);
  z-index: 2000;
  opacity: ${p => (p.$open ? 1 : 0)};
  visibility: ${p => (p.$open ? 'visible' : 'hidden')};
  pointer-events: ${p => (p.$open ? 'auto' : 'none')};
  transition: ${p =>
    p.$reduce ? 'none' : 'opacity 0.35s ease, visibility 0.35s ease'};
`;

/* ── Desktop panel: full-height slide-in from the right ─────────────────────── */
const DesktopPanel = styled.nav<{ $open: boolean; $reduce: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(440px, 88vw);
  background: ${theme.colors.light};
  z-index: 2100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${theme.spacing.xxlarge} ${theme.spacing.xlarge};
  box-shadow: -20px 0 60px rgba(0, 0, 0, 0.25);
  transform: ${p => (p.$open ? 'translateX(0)' : 'translateX(100%)')};
  pointer-events: ${p => (p.$open ? 'auto' : 'none')};
  transition: ${p => (p.$reduce ? 'none' : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)')};
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const DesktopItem = styled.li<{ $open: boolean; $reduce: boolean; $i: number }>`
  opacity: ${p => (p.$open ? 1 : 0)};
  transform: ${p => (p.$open ? 'translateX(0)' : 'translateX(40px)')};
  transition: ${p =>
    p.$reduce
      ? 'none'
      : 'opacity 0.4s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'};
  transition-delay: ${p => (p.$reduce || !p.$open ? '0s' : `${0.1 + p.$i * 0.07}s`)};
`;

const DesktopLink = styled(Link)<{ $active: boolean; $reduce: boolean }>`
  display: inline-flex;
  padding: 0.4rem 0;
  perspective: 700px;
  font-family: ${theme.fonts.heading};
  font-size: clamp(1.7rem, 3vw, 2.5rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  color: ${p => (p.$active ? theme.colors.primary : theme.colors.dark)};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
  }

  &:focus-visible {
    outline: 3px solid ${theme.colors.accent};
    outline-offset: 4px;
    border-radius: 6px;
  }
`;

const Char = styled.span`
  display: inline-block;
`;

/* ── Mobile panel: full-screen takeover with large nav words ─────────────────── */
const MobilePanel = styled.nav<{ $open: boolean; $reduce: boolean }>`
  position: fixed;
  inset: 0;
  background: ${theme.colors.light};
  z-index: 2100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${theme.spacing.xxlarge} ${theme.spacing.xlarge};
  transform: ${p => (p.$open ? 'translateY(0)' : 'translateY(-100%)')};
  opacity: ${p => (p.$open ? 1 : 0)};
  pointer-events: ${p => (p.$open ? 'auto' : 'none')};
  transition: ${p =>
    p.$reduce
      ? 'none'
      : 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease'};
`;

const MobileItem = styled.li<{ $open: boolean; $reduce: boolean; $i: number }>`
  opacity: ${p => (p.$open ? 1 : 0)};
  transform: ${p => (p.$open ? 'translateY(0)' : 'translateY(-14px)')};
  transition: ${p =>
    p.$reduce ? 'none' : 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'};
  transition-delay: ${p => (p.$reduce || !p.$open ? '0s' : `${0.08 + p.$i * 0.05}s`)};
`;

const MobileLink = styled(Link)<{ $active: boolean }>`
  display: block;
  text-align: left;
  font-family: ${theme.fonts.heading};
  font-size: clamp(1.8rem, 9vw, 2.6rem);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.15;
  padding: 0.35rem 0;
  text-decoration: none;
  color: ${p => (p.$active ? theme.colors.primary : theme.colors.dark)};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
  }

  &:focus-visible {
    outline: 3px solid ${theme.colors.accent};
    outline-offset: 2px;
  }
`;

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/events', label: 'Events' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact Us' },
  { path: '/blog', label: 'Blog' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reduce, setReduce] = useState(false);
  const location = useLocation();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Track viewport + reduced-motion preference
  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 769px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncDesktop = () => setIsDesktop(desktopQuery.matches);
    const syncMotion = () => setReduce(motionQuery.matches);
    syncDesktop();
    syncMotion();
    desktopQuery.addEventListener('change', syncDesktop);
    motionQuery.addEventListener('change', syncMotion);
    return () => {
      desktopQuery.removeEventListener('change', syncDesktop);
      motionQuery.removeEventListener('change', syncMotion);
    };
  }, []);

  // Lock body scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape closes and returns focus to the trigger
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prev => !prev);

  return (
    <>
      <TopBlur />
      <NavbarContainer>
        <NavContent>
          <Logo />
        </NavContent>
      </NavbarContainer>

      <Bubble
        ref={buttonRef}
        onClick={toggle}
        $open={isOpen}
        $reduce={reduce}
        $isDesktop={isDesktop}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="primary-nav"
      >
        <Bars aria-hidden="true">
          <Bar $open={isOpen} $pos="top" $reduce={reduce} $isDesktop={isDesktop} />
          <Bar $open={isOpen} $pos="mid" $reduce={reduce} $isDesktop={isDesktop} />
          <Bar $open={isOpen} $pos="bot" $reduce={reduce} $isDesktop={isDesktop} />
        </Bars>
      </Bubble>

      <Backdrop $open={isOpen} $reduce={reduce} onClick={close} aria-hidden="true" />

      {isDesktop ? (
        <DesktopPanel id="primary-nav" $open={isOpen} $reduce={reduce} aria-hidden={!isOpen}>
          <List>
            {navItems.map((item, idx) => (
              <DesktopItem key={item.path} $open={isOpen} $reduce={reduce} $i={idx}>
                <DesktopLink
                  to={item.path}
                  onClick={close}
                  $active={location.pathname === item.path}
                  $reduce={reduce}
                  tabIndex={isOpen ? 0 : -1}
                >
                  {item.label.split('').map((ch, i) => (
                    <Char key={i}>
                      {ch === ' ' ? ' ' : ch}
                    </Char>
                  ))}
                </DesktopLink>
              </DesktopItem>
            ))}
          </List>
        </DesktopPanel>
      ) : (
        <MobilePanel id="primary-nav" $open={isOpen} $reduce={reduce} aria-hidden={!isOpen}>
          <List>
            {navItems.map((item, idx) => (
              <MobileItem key={item.path} $open={isOpen} $reduce={reduce} $i={idx}>
                <MobileLink
                  to={item.path}
                  onClick={close}
                  $active={location.pathname === item.path}
                  tabIndex={isOpen ? 0 : -1}
                >
                  {item.label}
                </MobileLink>
              </MobileItem>
            ))}
          </List>
        </MobilePanel>
      )}
    </>
  );
};

export default Navbar;
