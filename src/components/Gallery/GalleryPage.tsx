import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const Section = styled.section`
  padding: ${theme.spacing.xlarge} ${theme.spacing.large};
  background: ${theme.colors.light};
  text-align: center;
`;

const Title = styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: 2.8rem;
  color: ${theme.colors.primaryLight};
  margin-top: 20px;
  margin-bottom: 10px;
  position: relative;
  display: inline-block;
  letter-spacing: 2px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    height: 3px;
    width: 50px;
    background: linear-gradient(90deg, ${theme.colors.primaryLight}, ${theme.colors.accent});
    top: 50%;
    transform: translateY(-50%);
    border-radius: 2px;
  }

  &::before {
    left: -60px;
  }

  &::after {
    right: -60px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2.2rem;
    
    &::before,
    &::after {
      width: 30px;
    }
    
    &::before {
      left: -40px;
    }
    
    &::after {
      right: -40px;
    }
  }
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${theme.colors.gray};
  margin-bottom: 40px;
  font-style: italic;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  font-family: ${theme.fonts.body};
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.figure<{ isActive: boolean }>`
  position: relative;
  width: 350px;
  background: ${theme.colors.white};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${theme.shadows.medium};
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 0;

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${theme.shadows.hover};
  }

  img {
    width: 100%;
    height: 280px;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.08);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 90%;
  }
`;

const FigCaption = styled.figcaption`
  padding: 20px 15px;
  text-align: left;
  position: relative;
  z-index: 2;
  background: white;

  h3 {
    margin: 0 0 12px 0;
    color: ${theme.colors.primaryLight};
    font-size: 1.3rem;
    font-family: ${theme.fonts.heading};
    font-weight: 600;
  }
`;

const Details = styled.div<{ isActive: boolean }>`
  max-height: ${props => props.isActive ? '100px' : '0'};
  opacity: ${props => props.isActive ? 1 : 0};
  overflow: hidden;
  transition: all 0.4s ease;
  
  p {
    margin: 8px 0;
    font-size: 0.95rem;
    color: ${theme.colors.textLight};
    font-family: ${theme.fonts.body};
    display: flex;
    align-items: center;
    gap: 5px;

    span {
      font-weight: 600;
      color: ${theme.colors.primaryLight};
      min-width: 70px;
    }
  }
`;

interface GalleryItem {
  id: number;
  title: string;
  location: string;
  date: string;
  image: string;
}

const GalleryPage: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    // EXISTING IMAGES (KEPT)
    {
      id: 1,
      title: 'Elegant Wedding Setup',
      location: 'Dar es Salaam',
      date: 'June 2024',
      image: '/images/chair.jpg'
    },
    {
      id: 2,
      title: 'Bridal Shower Bliss',
      location: 'Dar es Salaam, Masaki',
      date: 'July 2023',
      image: '/images/brid.jpg'
    },
    {
      id: 3,
      title: 'Grand Opening',
      location: 'Dar es Salaam, Osterbay',
      date: 'June 2023',
      image: '/images/open.jpg'
    },
    {
      id: 4,
      title: 'Birthday Celebration',
      location: 'Dar es Salaam, Masaki',
      date: 'July 2023',
      image: '/images/boy.jpg'
    },
    {
      id: 5,
      title: 'Confirmation Event',
      location: 'Dar es Salaam, Masaki',
      date: 'November 2024',
      image: '/images/ou.jpg'
    },
    {
      id: 6,
      title: 'Christmas Event',
      location: 'Dar es Salaam, Msasani',
      date: 'December 2024',
      image: '/images/chr.jpg'
    },
    // NEW WEDDING IMAGES (ADDED)
    {
      id: 7,
      title: 'Wedding Ceremony',
      location: 'Dar es Salaam',
      date: '2026',
      image: '/images/ww.jpeg'
    },
    {
      id: 8,
      title: 'Wedding Reception',
      location: 'Dar es Salaam, Masaki',
      date: '2026',
      image: '/images/ww2.jpeg'
    },
    {
      id: 9,
      title: 'Wedding Decoration',
      location: 'Dar es Salaam, Osterbay',
      date: '2026',
      image: '/images/ww3.jpeg'
    },
    {
      id: 10,
      title: 'Wedding Setup',
      location: 'Dar es Salaam, Msasani',
      date: '2026',
      image: '/images/ww5.jpeg'
    }
  ];

  const toggleCard = (id: number) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <>
      <Helmet>
        <title>Gallery | Preetie Decor - Event Decoration Portfolio in Dar es Salaam, Tanzania</title>
        <meta name="description" content="View our portfolio of stunning event decorations in Dar es Salaam, Tanzania. From elegant weddings and bridal showers to birthday parties and corporate events. See Preetie Decor's work in Msasani, Masaki, and across Dar es Salaam." />
        <meta name="keywords" content="event decoration gallery Dar es Salaam, wedding decor portfolio Tanzania, birthday party setup images, bridal shower decorations, confirmation event styling, Christmas event decor, Preetie Decor portfolio, event photos Msasani" />
        <meta name="geo.region" content="TZ" />
        <meta name="geo.placename" content="Dar es Salaam" />
        <meta name="geo.position" content="-6.7924;39.2083" />
        <meta name="ICBM" content="-6.7924, 39.2083" />
      </Helmet>
      <Section>
        <Title>Our Event Gallery</Title>
        <Subtitle>Memorable moments from our special events</Subtitle>

        <Container>
          {galleryItems.map((item) => (
            <Card 
              key={item.id}
              isActive={activeCard === item.id}
              onClick={() => toggleCard(item.id)}
            >
              <img src={item.image} alt={item.title} loading="lazy" />
              <FigCaption>
                <h3>{item.title}</h3>
                <Details isActive={activeCard === item.id}>
                  <p>
                    <span>📍 Location:</span> {item.location}
                  </p>
                  <p>
                    <span>📅 Date:</span> {item.date}
                  </p>
                </Details>
              </FigCaption>
            </Card>
          ))}
        </Container>
      </Section>
    </>
  );
};

export default GalleryPage;