import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // ADD THIS
import styled from 'styled-components';
import { Facebook, Instagram, Music2, MapPin } from 'lucide-react';
import { theme } from '../../styles/theme';

const FooterContainer = styled.footer`
  background-color: ${theme.colors.primary};
  color: white;
  padding: ${theme.spacing.large} 0;
  font-family: ${theme.fonts.body};
  width: 100%;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.large};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.medium};
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 50px;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const SectionTitle = styled.h4`
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 20px;
  font-family: ${theme.fonts.heading};
  position: relative;
  width: 100%;
  text-align: left;
  
  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 2px;
    background: ${theme.colors.secondary};
    margin-top: 8px;
    margin-left: 0;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  
  a {
    color: white;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);

    &:hover {
      color: ${theme.colors.secondary};
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-3px);
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const QuickLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;

  li a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 1rem;
    display: inline-block;
    text-align: left;
    
    &:hover {
      color: ${theme.colors.secondary};
      transform: translateX(5px);
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 25px;
  width: 100%;

  .contact-item {
    display: flex;
    align-items: center;
    gap: 15px;
    color: rgba(255, 255, 255, 0.9);
    font-size: 1rem;
    width: 100%;
    justify-content: flex-start;

    svg {
      width: 20px;
      height: 20px;
      color: white;
      flex-shrink: 0;
    }

    a {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      transition: color 0.3s ease;
      word-break: break-all;

      &:hover {
        color: ${theme.colors.secondary};
      }
    }
  }
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 0 0 20px 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  width: 100%;
  justify-content: flex-start;
  
  svg {
    width: 20px;
    height: 20px;
    color: white;
    flex-shrink: 0;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  max-width: 280px;
  height: 130px;
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
  margin-top: 5px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: ${theme.spacing.xlarge};
  padding-top: ${theme.spacing.large};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
`;

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-10 7L2 7"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/events', label: 'Events' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
    { path: '/blog', label: 'Blog' }
  ];

  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterSection>
            <SectionTitle>Follow Us</SectionTitle>
            <SocialLinks>
              <a href="https://www.facebook.com/share/1JDpZgeqee/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                <Facebook />
              </a>
              <a href="http://www.tiktok.com/@preetie_decor" target="_blank" rel="noopener noreferrer">
                <Music2 />
              </a>
              <a href="https://www.instagram.com/preetiee_decor?igsh=dzdlYjRsNmx0bXRh" target="_blank" rel="noopener noreferrer">
                <Instagram />
              </a>
              <a href="https://pin.it/wNN6Lb5bI" target="_blank" rel="noopener noreferrer">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                  <path d="M18 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                  <path d="M12 22c2-4 2-6 2-8" />
                  <path d="M12 22c-2-4-2-6-2-8" />
                  <path d="M8 12.5c.5 2 1.5 4 4 4s3.5-2 4-4" />
                </svg>
              </a>
            </SocialLinks>
          </FooterSection>

          {/* Center - Quick Links - FIXED: changed <a> to <Link> */}
          <FooterSection>
            <SectionTitle>Quick Links</SectionTitle>
            <QuickLinks>
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </QuickLinks>
          </FooterSection>

          <FooterSection>
            <SectionTitle>For More Inquiry</SectionTitle>
            <ContactInfo>
              <div className="contact-item">
                <MailIcon />
                <a href="mailto:info@preetiedecor.com">info@preetiedecor.com</a>
              </div>
              <div className="contact-item">
                <PhoneIcon />
                <a href="tel:+255672715657">+255 672 715 657</a>
              </div>
            </ContactInfo>
            
            <Location>
              <MapPin />
              <span>Dar es Salaam - Msasani, Tanzania</span>
            </Location>
            
            <MapContainer>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.087401234567!2d39.269123!3d-6.765432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDUnNTUuNSJTIDM5wrAxNicwOC44IkU!5e0!3m2!1sen!2stz!4v1234567890!5m2!1sen!2stz"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Prettiee Decor Location"
              />
            </MapContainer>
          </FooterSection>
        </FooterContent>

        <Copyright>
          &copy; {currentYear} Prettiee Decor. All Rights Reserved.
        </Copyright>
      </Container>
    </FooterContainer>
  );
};

export default Footer;