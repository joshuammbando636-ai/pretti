import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled, { keyframes } from 'styled-components';
import { Award, Heart, Quote, X, Trophy } from 'lucide-react';
import { theme } from '../../styles/theme';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Section = styled.section`
  padding: ${theme.spacing.xlarge} ${theme.spacing.large};
  background: linear-gradient(135deg, ${theme.colors.light} 0%, #fff 100%);
  min-height: 80vh;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 40px 20px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 20px;
  }
`;

const ImageColumn = styled.div`
  position: relative;
  animation: ${fadeIn} 0.8s ease;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
    justify-content: center;
  }
`;

const FounderImage = styled.img`
  width: 100%;
  max-width: 450px;
  border-radius: 20px;
  box-shadow: ${theme.shadows.large};
  transition: transform 0.5s ease;
  margin: 0 auto;
  display: block;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 280px;
    width: 100%;
  }
`;

const ImageBadge = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: ${theme.colors.primaryLight};
  color: white;
  padding: 12px 20px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 20px rgba(179, 0, 89, 0.3);
  animation: ${float} 3s ease infinite;

  svg {
    width: 24px;
    height: 24px;
  }

  span {
    font-family: ${theme.fonts.body};
    font-weight: 600;
    font-size: 1rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 8px 15px;
    bottom: 15px;
    right: 15px;
    
    svg {
      width: 18px;
      height: 18px;
    }
    
    span {
      font-size: 0.8rem;
    }
  }
`;

const ContentColumn = styled.div`
  animation: ${fadeIn} 0.8s ease 0.2s both;
`;

const Title = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: 3rem;
  color: ${theme.colors.primary};
  margin-bottom: 20px;
  font-weight: 700;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${theme.colors.primaryLight}, ${theme.colors.accent});
    margin-top: 10px;
    border-radius: 2px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
    
    &::after {
      width: 60px;
    }
  }
`;

const Paragraph = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  color: ${theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: 20px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

const Highlight = styled.strong`
  color: ${theme.colors.primary};
  font-weight: 600;
`;

const CertificationBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, ${theme.colors.primaryLight}10, ${theme.colors.accent}10);
  padding: 15px 25px;
  border-radius: 12px;
  margin: 20px 0;
  border-left: 4px solid ${theme.colors.primary};
  width: 100%;

  svg {
    color: ${theme.colors.primary};
    width: 28px;
    height: 28px;
  }

  div {
    text-align: left;
  }

  strong {
    color: ${theme.colors.primary};
    font-size: 1rem;
    display: block;
    margin-bottom: 4px;
  }

  span {
    color: ${theme.colors.textLight};
    font-size: 0.9rem;
    font-family: ${theme.fonts.body};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 12px 15px;
    
    svg {
      width: 24px;
      height: 24px;
    }
    
    strong {
      font-size: 0.85rem;
    }
    
    span {
      font-size: 0.8rem;
    }
  }
`;

const AwardSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  background: linear-gradient(135deg, #f5e6d3 0%, #fff0e0 100%);
  padding: 15px 25px;
  border-radius: 12px;
  margin: 20px 0;
  border-left: 4px solid #c49a6c;
  width: 100%;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(196, 154, 108, 0.2);
  }

  svg {
    color: #c49a6c;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 12px 15px;
    gap: 12px;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const AwardContent = styled.div`
  flex: 1;
  text-align: left;

  strong {
    color: #8B7355;
    font-size: 1rem;
    display: block;
    margin-bottom: 4px;
    font-family: ${theme.fonts.heading};
  }

  span {
    color: ${theme.colors.textLight};
    font-size: 0.9rem;
    font-family: ${theme.fonts.body};
    display: block;
    margin-bottom: 8px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    strong {
      font-size: 0.85rem;
    }
    
    span {
      font-size: 0.8rem;
    }
  }
`;

const ViewAwardButton = styled.button`
  background: transparent;
  border: 1px solid #c49a6c;
  color: #c49a6c;
  padding: 6px 15px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${theme.fonts.body};

  &:hover {
    background: #c49a6c;
    color: white;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 4px 12px;
    font-size: 0.75rem;
  }
`;

const QuoteBox = styled.div`
  background: ${theme.colors.light};
  padding: 25px;
  border-radius: 15px;
  margin: 25px 0;
  position: relative;
  border: 1px solid ${theme.colors.primaryLight}20;

  svg {
    color: ${theme.colors.primary};
    opacity: 0.3;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 15px;
    left: 15px;
  }

  p {
    font-family: ${theme.fonts.heading};
    font-size: 1.2rem;
    color: ${theme.colors.primary};
    font-style: italic;
    margin: 0;
    padding-left: 50px;
    font-weight: 500;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 20px 15px;
    
    svg {
      width: 30px;
      height: 30px;
      top: 10px;
      left: 10px;
    }
    
    p {
      font-size: 1rem;
      padding-left: 40px;
    }
  }
`;

const Button = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: 14px 30px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${theme.fonts.body};
  box-shadow: 0 5px 15px rgba(179, 0, 89, 0.3);
  animation: ${pulse} 2s infinite;

  &:hover {
    background: ${theme.colors.primaryLight};
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(179, 0, 89, 0.4);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 10px 20px;
    font-size: 0.9rem;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
`;

const ModalContent = styled.div`
  background: ${theme.colors.white};
  border-radius: 20px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: ${fadeIn} 0.3s ease;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 95%;
    border-radius: 15px;
  }
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${theme.colors.grayLight};
  display: flex;
  justify-content: space-between;
  align-items: center;

  h5 {
    font-family: ${theme.fonts.heading};
    color: ${theme.colors.primary};
    font-size: 1.3rem;
    margin: 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 15px;
    
    h5 {
      font-size: 1rem;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.3s ease;

  &:hover {
    background: ${theme.colors.light};
  }

  svg {
    width: 24px;
    height: 24px;
    color: ${theme.colors.grayDark};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const ModalBody = styled.div`
  padding: 20px;
  text-align: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 15px;
  }
`;

const CertificateImage = styled.img`
  max-width: 100%;
  border-radius: 10px;
  box-shadow: ${theme.shadows.medium};

  @media (max-width: ${theme.breakpoints.mobile}) {
    border-radius: 8px;
  }
`;

// NEW AWARD SECTION FROM YOUR IMAGE (TZ EVENT PLANNING CERTIFICATE)
const TZAwardSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  background: linear-gradient(135deg, #e8f0f5 0%, #d9eaf0 100%);
  padding: 15px 25px;
  border-radius: 12px;
  margin: 20px 0;
  border-left: 4px solid #2c6e8f;
  width: 100%;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(44, 110, 143, 0.2);
  }

  svg {
    color: #2c6e8f;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 12px 15px;
    gap: 12px;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const AboutPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [isTZAwardModalOpen, setIsTZAwardModalOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>About Preetie Decor | Award-Winning Event Stylists in Dar es Salaam, Tanzania</title>
        <meta name="description" content="Preetie Decor was founded in 2022 by Harpreet Kaur Dogra in Dar es Salaam, Tanzania. Winner of Africa Interior Design Award 2024 for Best Event Decoration. Professional flower arranging certified." />
        <meta name="keywords" content="about Preetie Decor, event decoration company Dar es Salaam, Harpreet Kaur Dogra, Tanzania event stylists, award winning decorators, Africa Interior Design Award 2024, professional flower arranging certification, event decoration company Tanzania" />
        <meta name="geo.region" content="TZ" />
        <meta name="geo.placename" content="Dar es Salaam" />
        <meta name="geo.position" content="-6.7924;39.2083" />
        <meta name="ICBM" content="-6.7924, 39.2083" />
      </Helmet>
      <Section>
        <Container>
          <Row>
            <ImageColumn>
              <FounderImage src="/images/ceo.png" alt="Founder Harpreet Kaur Dogra" />
              <ImageBadge>
                <Heart />
                <span>Founder & Creative Director</span>
              </ImageBadge>
            </ImageColumn>

            <ContentColumn>
              <Title>About Us</Title>
              
              <Paragraph>
                Preetie Decor was founded in <Highlight>2022</Highlight> by the visionary 
                <Highlight> Harpreet Kaur Dogra</Highlight>, with a dream to transform ordinary spaces into breathtaking 
                celebrations. What started as a small passion project has grown into a trusted name in event 
                decoration, recognized for creativity, attention to detail, and exceptional customer care.
              </Paragraph>

              <CertificationBadge>
                <Award />
                <div>
                  <strong>Professional Flower arranging and Function Decor Certification</strong>
                  <span>Achieved in 2024 • Recognized Excellence</span>
                </div>
              </CertificationBadge>

              {/* EXISTING AWARD SECTION */}
              <AwardSection onClick={() => setIsAwardModalOpen(true)}>
                <Trophy />
                <AwardContent>
                  <strong>Africa Interior Design Award 2026</strong>
                  <span>Winner • Best Event Decoration • Pan-African Excellence</span>
                  <ViewAwardButton>View Award</ViewAwardButton>
                </AwardContent>
              </AwardSection>

              {/* NEW TZ EVENT PLANNING AWARD SECTION - ADDED HERE */}
              <TZAwardSection onClick={() => setIsTZAwardModalOpen(true)}>
                <Award />
                <AwardContent>
                  <strong>TZ EVENT PLANNING · Certificate OF APPRECIATION</strong>
                  <span>BEST EMERGING EVENT DECORATOR · WINNER · PRETIEIE_DECOR</span>
                  <ViewAwardButton>View Certificate</ViewAwardButton>
                </AwardContent>
              </TZAwardSection>

              <Paragraph>
                In <Highlight>2024</Highlight>, we proudly earned our <Highlight>Professional Flower arranging and Function Decor Certification</Highlight>, 
                solidifying our expertise and commitment to delivering premium quality services for weddings, 
                birthdays, corporate events, and more.
              </Paragraph>

              <Paragraph>
                At Prettiee Decor, we believe every occasion deserves a touch of elegance, beauty, and a personal 
                story. Our mission is simple: to create unforgettable moments that reflect your unique style and 
                vision. From stunning floral arrangements to bespoke décor concepts, we turn your dream event into 
                reality.
              </Paragraph>

              <QuoteBox>
                <Quote />
                <p>
                  "Your celebration is our canvas — and we paint it with love, color, and creativity."
                </p>
              </QuoteBox>

              <Button onClick={() => setIsModalOpen(true)}>
                <Award />
                View Certificate
              </Button>
            </ContentColumn>
          </Row>
        </Container>

        {/* MODAL FOR FLOWER CERTIFICATE */}
        <ModalOverlay isOpen={isModalOpen} onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h5>Professional Flower arranging and Function Decor Certification</h5>
              <CloseButton onClick={() => setIsModalOpen(false)}>
                <X />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <CertificateImage src="/images/IMG_1922.png" alt="Certificate" />
            </ModalBody>
          </ModalContent>
        </ModalOverlay>

        {/* MODAL FOR AFRICA INTERIOR DESIGN AWARD */}
        <ModalOverlay isOpen={isAwardModalOpen} onClick={() => setIsAwardModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h5>Africa Interior Design Award 2026 - Winner</h5>
              <CloseButton onClick={() => setIsAwardModalOpen(false)}>
                <X />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <CertificateImage 
                src="/images/aww.jpeg" 
                alt="Africa Interior Design Award" 
              />
              <p style={{ marginTop: '20px', color: theme.colors.textLight }}>
                Best Event Decoration • Pan-African Excellence
              </p>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>

        {/* MODAL FOR TZ EVENT PLANNING AWARD - NEW */}
        <ModalOverlay isOpen={isTZAwardModalOpen} onClick={() => setIsTZAwardModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h5>TZ Event Planning · Certificate of Appreciation</h5>
              <CloseButton onClick={() => setIsTZAwardModalOpen(false)}>
                <X />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <CertificateImage 
                src="/images/tz.jpeg" 
                alt="TZ Event Planning Award Certificate" 
              />
              <p style={{ marginTop: '20px', color: theme.colors.textLight }}>
                BEST EMERGING EVENT DECORATOR · WINNER · PRETIEIE_DECOR
              </p>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Section>
    </>
  );
};

export default AboutPage;