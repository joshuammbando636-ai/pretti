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

// Original Events Section
const Section = styled.section`
  text-align: center;
  padding: ${theme.spacing.xlarge} ${theme.spacing.large};
  background: ${theme.gradients.light};
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
  color: ${theme.colors.secondary};
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
  color: ${theme.colors.textLight};
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
  box-shadow: ${theme.shadows.card};
  transition: transform 0.3s ease;
  animation: ${fadeInUp} 0.8s ease ${props => props.index * 0.1}s both;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.hover};
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
  color: ${theme.colors.secondary};
  margin-bottom: 10px;
`;

const EventDescription = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  color: ${theme.colors.textLight};
  line-height: 1.6;
  margin: 0;
`;

const Decoration = styled.div<{ top?: string; left?: string; right?: string; bottom?: string }>`
  position: absolute;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, ${theme.colors.light} 0%, transparent 70%);
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
        <link rel="canonical" href="https://preetiedecor.com/events" />
      </Helmet>
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