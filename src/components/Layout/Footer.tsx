import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Facebook, Instagram, Music2 } from 'lucide-react';
import { theme } from '../../styles/theme';

const FooterSection = styled.div`
  background: ${theme.colors.light};
  padding: 0 ${theme.spacing.large} ${theme.spacing.large};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.medium} ${theme.spacing.medium};
  }
`;

const FooterContainer = styled.footer`
  max-width: 1200px;
  margin: 0 auto;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.large};
  box-shadow: ${theme.shadows.card};
  font-family: ${theme.fonts.body};
  padding: ${theme.spacing.xxlarge};

  @media (max-width: ${theme.breakpoints.tablet}) {
    border-radius: ${theme.borderRadius.medium};
    padding: ${theme.spacing.xlarge} ${theme.spacing.large};
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${theme.spacing.xlarge};
  padding-bottom: ${theme.spacing.xlarge};

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${theme.spacing.large};
  }
`;

const Brand = styled.div`
  max-width: 320px;
`;

const Mark = styled.img`
  height: 48px;
  width: auto;
  object-fit: contain;
  margin-bottom: ${theme.spacing.small};
`;

const Wordmark = styled.p`
  font-family: ${theme.fonts.heading};
  font-size: 1.6rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.small};
`;

const Tagline = styled.p`
  font-size: 0.9rem;
  line-height: 1.7;
  color: ${theme.colors.textLight};
`;

const Columns = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xlarge};

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing.large};
  }
`;

const Column = styled.div`
  h4 {
    font-family: ${theme.fonts.heading};
    font-size: 0.9rem;
    font-weight: 700;
    color: ${theme.colors.dark};
    margin-bottom: ${theme.spacing.medium};
  }

  p,
  a {
    display: block;
    font-size: 0.88rem;
    line-height: 2;
    color: ${theme.colors.textLight};
    text-decoration: none;
  }

  a:hover {
    color: ${theme.colors.primary};
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.grayLight};
  margin: 0 0 ${theme.spacing.large};
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.medium};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.div`
  font-size: 0.82rem;
  color: ${theme.colors.textLight};
`;

const Socials = styled.div`
  display: flex;
  gap: ${theme.spacing.medium};

  a {
    color: ${theme.colors.textLight};
    display: inline-flex;
    transition: color 0.2s ease;

    &:hover {
      color: ${theme.colors.primary};
    }

    svg {
      width: 18px;
      height: 18px;
    }
  }
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

const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <FooterSection>
      <FooterContainer>
        <TopRow>
          <Brand>
            <Mark src="/images/Pr.png" alt="Preetie Decor" />
            <Wordmark>Preetie Decor</Wordmark>
            <Tagline>
              Event decoration and styling in Dar es Salaam, Tanzania.
              <br />
              Every celebration, beautifully dressed.
            </Tagline>
          </Brand>

          <Columns>
            <Column>
              <h4>Company</h4>
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/events">Events</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/blog">Blog</Link>
            </Column>

            <Column>
              <h4>Services</h4>
              <p>Weddings</p>
              <p>Birthdays &amp; Parties</p>
              <p>Bridal &amp; Baby Showers</p>
              <p>Corporate Events</p>
            </Column>

            <Column>
              <h4>Contact</h4>
              <p>Msasani, Dar es Salaam</p>
              <a href="tel:+255672715657">+255 672 715 657</a>
              <a href="mailto:info@preetiedecor.com">info@preetiedecor.com</a>
            </Column>
          </Columns>
        </TopRow>

        <Divider />

        <BottomBar>
          <Copyright>&copy; {currentYear} Preetie Decor. All rights reserved.</Copyright>

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
        </BottomBar>
      </FooterContainer>
    </FooterSection>
  );
};

export default Footer;
