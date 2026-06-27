import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import Logo from './Logo';

const NavbarContainer = styled.nav`
  width: 100%;
  background-color: ${theme.colors.primary};
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 70px;
  display: flex;
  align-items: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 65px;
  }
`;

const NavContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 ${theme.spacing.large};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  height: 100%;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.medium};
  }
`;

const MenuToggle = styled.button<{ isOpen: boolean }>`
  display: none;
  background: none;
  border: none;
  font-size: 28px;
  color: white;
  cursor: pointer;
  padding: 8px;
  z-index: ${props => props.isOpen ? '999' : '1002'};
  position: relative;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0.3);
  tap-highlight-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;

  &:focus {
    outline: none;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: flex;
    position: fixed;
    top: 10px;
    right: 10px;
    bottom: 10px;
    width: 280px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    flex-direction: column;
    justify-content: center;
    padding: 2rem 0;
    z-index: 1001;
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(120%)'};
    transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.2) inset;
    border-radius: 28px;
    border: none;
    pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
    max-height: calc(100vh - 20px);
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1.2rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem 0;
    width: 100%;
  }
`;

const NavItem = styled.li`
  /* No changes needed */
`;

const StyledNavLink = styled(Link)<{ $isActive?: boolean }>`
  color: ${props => props.$isActive ? theme.colors.secondary : 'white'};
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  display: inline-block;
  transition: color 0.2s ease;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0.3);
  tap-highlight-color: rgba(255, 255, 255, 0.3);
  border-radius: 40px;

  &:focus {
    outline: none;
  }

  &::after {
    content: '';
    position: absolute;
    left: 1.2rem;
    right: 1.2rem;
    bottom: 0;
    height: 2px;
    background-color: ${theme.colors.secondary};
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  &:hover {
    color: ${theme.colors.secondary};
  }

  &:hover::after {
    transform: scaleX(1);
  }

  ${props => props.$isActive && `
    &::after {
      transform: scaleX(1);
    }
  `}

  /* Mobile styles - SIMPLE BLACK TEXT, NO SHADOWS */
  @media (max-width: ${theme.breakpoints.tablet}) {
    color: #716d6d;
    font-size: 1.3rem;
    padding: 1rem 2.5rem;
    width: auto;
    min-width: 180px;
    display: inline-block;
    text-align: center;
    font-weight: 500;
    text-shadow: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
    tap-highlight-color: rgba(0, 0, 0, 0.1);
    border-radius: 60px;

    &:focus {
      outline: none;
    }

    &::after {
      display: none;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      color: #000000;
      transform: scale(1.05);
    }

    &:active {
      background: rgba(255, 255, 255, 0.5);
      transition: background 0.1s ease;
    }

    ${props => props.$isActive && `
      background: rgba(255, 255, 255, 0.35);
      color: #000000;
      font-weight: 600;
    `}
  }
`;

const GlassDecoration = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  height: 4px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 2px;
  display: none;

  &:focus {
    outline: none;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
  }
`;

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/events', label: 'Events' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact Us' },
  { path: '/blog', label: 'Blog' }
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && 
          menuRef.current && 
          !menuRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        document.body.style.overflow = 'unset';
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
  };

  return (
    <NavbarContainer>
      <NavContent>
        <Logo />
        
        <MenuToggle onClick={toggleMenu} ref={buttonRef} isOpen={isOpen}>
          ☰
        </MenuToggle>

        <NavLinks isOpen={isOpen} ref={menuRef}>
          <GlassDecoration />
          <NavList>
            {navItems.map((item) => (
              <NavItem key={item.path}>
                <StyledNavLink 
                  to={item.path}
                  onClick={handleLinkClick}
                  $isActive={location.pathname === item.path}
                >
                  {item.label}
                </StyledNavLink>
              </NavItem>
            ))}
          </NavList>
        </NavLinks>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;