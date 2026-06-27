import React, { useState, useEffect, useRef, memo } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #2d3436; /* Fallback color while loading */
`;

const SlidesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BackgroundImage = styled.div<{ image: string; isActive: boolean; isLoaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.isActive && props.isLoaded) ? 1 : 0};
  transition: opacity 0.6s ease-in-out;
  filter: brightness(0.7);
  background-color: #2d3436; /* Fallback color */
  
  /* Hardware acceleration */
  transform: translateZ(0);
  will-change: opacity;
`;

const VideoBackground = styled.video<{ isActive: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => props.isActive ? 1 : 0};
  transition: opacity 0.6s ease-in-out;
  filter: brightness(0.7);
  z-index: ${props => props.isActive ? 1 : 0};
  
  transform: translateZ(0);
  will-change: opacity;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  z-index: 2;
`;

const Content = memo(styled.div`
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  z-index: 3;
  color: white;
  max-width: 600px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    left: 5%;
    right: 5%;
    text-align: center;
    max-width: 100%;
  }
`);

const Title = memo(styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: 5rem;
  color: white;
  margin-bottom: 1rem;

  span {
    color: ${theme.colors.accent};
    display: block;
    font-size: 3.5rem;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 3.5rem;
    span {
      font-size: 2.5rem;
    }
  }
`);

const Description = memo(styled.p`
  font-family: ${theme.fonts.body};
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 500px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin: 0 auto;
  }
`);

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const videoRef = useRef<HTMLVideoElement>(null);

  const slides = [
    { type: 'image', src: '/images/booth.jpg' },
    { type: 'image', src: '/images/latable.jpg' },
    { type: 'image', src: '/images/dec.jpg' },
  ];

  // Load first image immediately
  useEffect(() => {
    const firstImage = slides[0];
    if (firstImage.type === 'image') {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(firstImage.src));
      };
      img.src = firstImage.src;
    }
  }, []);

  // Load only current and next image - not all at once
  useEffect(() => {
    slides.forEach((slide, index) => {
      if (index === currentIndex || index === (currentIndex + 1) % slides.length) {
        if (slide.type === 'image' && !loadedImages.has(slide.src)) {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => new Set(prev).add(slide.src));
          };
          img.src = slide.src;
        }
      }
    });
  }, [currentIndex]);

  // Start carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <HeroSection>
      <SlidesContainer>
        {slides.map((slide, index) => (
          slide.type === 'image' ? (
            <BackgroundImage 
              key={slide.src} 
              image={slide.src} 
              isActive={index === currentIndex}
              isLoaded={loadedImages.has(slide.src)}
            />
          ) : (
            <VideoBackground 
              key={slide.src}
              ref={index === currentIndex ? videoRef : null}
              autoPlay 
              loop 
              muted 
              playsInline
              isActive={index === currentIndex}
            >
              <source src={slide.src} type="video/mp4" />
            </VideoBackground>
          )
        ))}
      </SlidesContainer>
      
      <Overlay />
      
      <Content>
        <Title>
          Elegant Events
          <span>Styled with Love</span>
        </Title>
        <Description>
          Creating beautiful moments and unforgettable memories 
          through exceptional event design and decoration.
        </Description>
      </Content>
    </HeroSection>
  );
};

export default Hero;