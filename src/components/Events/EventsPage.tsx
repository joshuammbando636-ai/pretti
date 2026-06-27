import React from 'react';
import { Helmet } from 'react-helmet';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Video Hero Section
const VideoHeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 80vh;
  overflow: hidden;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none; /* THIS FIXES SCROLL ISSUE */
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const VideoContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  text-align: center;
  padding: 0 20px;
`;

const VideoTitle = styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: 5rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  animation: ${fadeInUp} 1s ease;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 3.5rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const VideoSubtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 1.5rem;
  max-width: 700px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  animation: ${fadeInUp} 1s ease 0.2s both;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.2rem;
  }
`;

// Original Events Section
const Section = styled.section`
  text-align: center;
  padding: ${theme.spacing.xlarge} ${theme.spacing.large};
  background: linear-gradient(135deg, #fff9f9 0%, #fff0f3 100%);
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto 50px;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: 3.5rem;
  color: #d44e6c;
  margin-bottom: 10px;
  line-height: 1.2;
  animation: ${fadeInUp} 0.8s ease;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 1.2rem;
  color: #a67c8d;
  font-weight: 300;
  animation: ${fadeInUp} 0.8s ease 0.2s both;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const Card = styled.div<{ index: number }>`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(212, 78, 108, 0.1);
  transition: transform 0.3s ease;
  animation: ${fadeInUp} 0.8s ease ${props => props.index * 0.1}s both;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(212, 78, 108, 0.15);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 280px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 25px 20px;
  text-align: left;
`;

const EventTitle = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: 2rem;
  color: #d44e6c;
  margin-bottom: 10px;
`;

const EventDescription = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  color: #6d4c5d;
  line-height: 1.6;
  margin: 0;
`;

const Decoration = styled.div<{ top?: string; left?: string; right?: string; bottom?: string }>`
  position: absolute;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, #ffd5df 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  top: ${props => props.top || 'auto'};
  left: ${props => props.left || 'auto'};
  right: ${props => props.right || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
`;

const EventsPage: React.FC = () => {
  const events = [
    {
      id: 1,
      title: 'Weddings',
      description: 'Elegant, romantic, and personalized ceremonies that reflect your unique love story.',
      image: '/images/dec.jpg',
    },
    {
      id: 2,
      title: 'Birthday Party',
      description: 'Charming celebrations filled with laughter, games, and beautiful décor.',
      image: '/images/re.jpg',
    },
    {
      id: 3,
      title: 'Bridal Showers',
      description: 'From intimate gatherings to grand parties, we create unforgettable bridal experiences.',
      image: '/images/brid.jpg',
    },
    {
      id: 4,
      title: 'Confirmations',
      description: 'Graceful decorations that honor this important spiritual milestone.',
      image: '/images/ou.jpg',
    }
  ];

  return (
    <>
      <Helmet>
        <title>Events & Services | Preetie Decor - Weddings, Birthdays & Corporate Events in Dar es Salaam, Tanzania</title>
        <meta name="description" content="Explore Preetie Decor's event services in Dar es Salaam, Tanzania. From elegant weddings and birthday parties to bridal showers and confirmations, we create unforgettable celebrations with stunning decorations." />
        <meta name="keywords" content="events Dar es Salaam, wedding decorations Tanzania, birthday party decor, bridal shower styling, confirmation ceremony decor, event planning services, Preetie Decor events, party decorations Msasani" />
        <meta name="geo.region" content="TZ" />
        <meta name="geo.placename" content="Dar es Salaam" />
        <meta name="geo.position" content="-6.7924;39.2083" />
        <meta name="ICBM" content="-6.7924, 39.2083" />
      </Helmet>
      {/* Video Hero Section */}
      <VideoHeroSection>
        <VideoBackground autoPlay loop muted playsInline preload="metadata">
          {/* Add your video file to public/videos/ folder */}
          <source src="/videos/vv21.mp4" type="video/mp4" />
          {/* Fallback text if video doesn't load */}
          Your browser does not support the video tag.
        </VideoBackground>
        <Overlay />
        <VideoContent>
          <VideoTitle>Our Events</VideoTitle>
          <VideoSubtitle>Creating unforgettable moments for every celebration</VideoSubtitle>
        </VideoContent>
      </VideoHeroSection>

      {/* Original Events Content */}
      <Section>
        <Decoration top="5%" left="5%" />
        <Decoration bottom="5%" right="5%" />
        
        <HeroContent>
          <Title>Explore Our Services</Title>
          <Subtitle>Each event is crafted with love and attention to detail</Subtitle>
        </HeroContent>

        <Container>
          {events.map((event, index) => (
            <Card key={event.id} index={index}>
              <ImageWrapper>
                <Image src={event.image} alt={event.title} loading="lazy" />
              </ImageWrapper>
              <CardContent>
                <EventTitle>{event.title}</EventTitle>
                <EventDescription>{event.description}</EventDescription>
              </CardContent>
            </Card>
          ))}
        </Container>
      </Section>
    </>
  );
};

export default EventsPage;