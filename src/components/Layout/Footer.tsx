import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Facebook, Instagram, Music2 } from 'lucide-react';
import { theme } from '../../styles/theme';

const FooterContainer = styled.footer`
  position: relative;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-family: ${theme.fonts.body};
  width: 100%;
  border-radius: 40px 40px 0 0;
  overflow: hidden;
  margin-top: ${theme.spacing.xlarge};

  @media (max-width: ${theme.breakpoints.tablet}) {
    border-radius: 28px 28px 0 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

/* Dark monogram panel on the left */
const Monogram = styled.div`
  position: relative;
  background: ${theme.colors.dark};
  min-height: 320px;
  overflow: hidden;

  span {
    position: absolute;
    left: -10px;
    bottom: -60px;
    font-family: ${theme.fonts.heading};
    font-size: 22rem;
    font-weight: 700;
    line-height: 1;
    color: ${theme.colors.primary};
    user-select: none;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-height: 140px;

    span {
      font-size: 11rem;
      bottom: -30px;
      left: 10px;
    }
  }
`;

/* Right content area */
const Content = styled.div`
  padding: ${theme.spacing.xlarge};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.large} ${theme.spacing.medium};
  }
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.large};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.large};
  }
`;

const Column = styled.div`
  h4 {
    font-family: ${theme.fonts.heading};
    font-size: 1.15rem;
    font-weight: 600;
    margin-bottom: ${theme.spacing.medium};
    color: ${theme.colors.white};
  }

  p,
  a {
    display: block;
    font-size: 0.95rem;
    line-height: 1.9;
    color: rgba(255, 255, 255, 0.82);
    text-decoration: none;
  }

  a:hover {
    color: ${theme.colors.white};
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin: ${theme.spacing.xlarge} 0 ${theme.spacing.large};
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${theme.spacing.large};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.large};
  }
`;

const PageLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;

  a {
    font-family: ${theme.fonts.heading};
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    width: fit-content;
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
      color: ${theme.colors.white};
      transform: translateX(4px);
    }
  }
`;

const Inquiries = styled.div`
  text-align: right;

  h4 {
    font-family: ${theme.fonts.heading};
    font-size: 1.15rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: ${theme.colors.white};
  }

  a {
    color: rgba(255, 255, 255, 0.82);
    text-decoration: none;
    font-size: 0.95rem;

    &:hover {
      color: ${theme.colors.white};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    text-align: left;
  }
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing.medium};
  padding: ${theme.spacing.medium} ${theme.spacing.xlarge};
  border-top: 1px solid rgba(255, 255, 255, 0.15);

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.medium};
    padding: ${theme.spacing.medium};
    text-align: center;
  }
`;

const Socials = styled.div`
  display: flex;
  gap: 12px;

  a {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    color: ${theme.colors.white};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease, transform 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: translateY(-3px);
    }

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const Copyright = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

const PinterestIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
    <path d="M18 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
    <path d="M12 22c2-4 2-6 2-8" />
    <path d="M12 22c-2-4-2-6-2-8" />
    <path d="M8 12.5c.5 2 1.5 4 4 4s3.5-2 4-4" />
  </svg>
);

const pageLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/events', label: 'Events' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
];

const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <FooterContainer>
      <Grid>
        <Monogram aria-hidden="true">
          <span>P</span>
        </Monogram>

        <Content>
          <Columns>
            <Column>
              <h4>Get in Touch</h4>
              <p>Msasani, Dar es Salaam</p>
              <p>Tanzania</p>
              <a href="tel:+255672715657">+255 672 715 657</a>
              <a href="mailto:info@preetiedecor.com">info@preetiedecor.com</a>
            </Column>

            <Column>
              <h4>What We Do</h4>
              <p>Weddings</p>
              <p>Birthdays &amp; Parties</p>
              <p>Bridal &amp; Baby Showers</p>
              <p>Corporate Events</p>
            </Column>

            <Column>
              <h4>Recognition</h4>
              <p>Award-winning since 2022</p>
              <p>Africa Interior Design Award</p>
              <p>Certified Floral Styling</p>
            </Column>
          </Columns>

          <Divider />

          <BottomRow>
            <PageLinks>
              {pageLinks.map(link => (
                <Link key={link.path} to={link.path}>
                  {link.label}
                </Link>
              ))}
            </PageLinks>

            <Inquiries>
              <h4>Inquiries</h4>
              <a href="mailto:info@preetiedecor.com">info@preetiedecor.com</a>
            </Inquiries>
          </BottomRow>
        </Content>
      </Grid>

      <BottomBar>
        <Socials>
          <a href="https://www.facebook.com/share/1JDpZgeqee/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook />
          </a>
          <a href="https://www.instagram.com/preetiee_decor?igsh=dzdlYjRsNmx0bXRh" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram />
          </a>
          <a href="http://www.tiktok.com/@preetie_decor" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <Music2 />
          </a>
          <a href="https://pin.it/wNN6Lb5bI" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
            <PinterestIcon />
          </a>
        </Socials>

        <Copyright>&copy; {currentYear} Prettiee Decor. All rights reserved.</Copyright>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;
