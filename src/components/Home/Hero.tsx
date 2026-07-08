import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { theme } from '../../styles/theme';

gsap.registerPlugin(ScrollTrigger);

const Stage = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${theme.colors.light};
`;

const ZoomImage = styled.div<{ $reduced: boolean }>`
  position: relative;
  background-image: url('/images/booth.jpg');
  background-size: cover;
  background-position: center top;
  background-color: ${theme.colors.grayLight};
  will-change: width, height;

  ${p =>
    p.$reduced
      ? css`
          width: 100vw;
          height: 100vh;
          height: 100svh;
        `
      : css`
          height: 78vh;
          width: auto;
          aspect-ratio: 9 / 16;

          @media (max-width: ${theme.breakpoints.tablet}) {
            height: 62vh;
          }
        `}
`;

const Annotation = styled.div<{ $position: 'top' | 'bottom' }>`
  position: absolute;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 10px;
  pointer-events: none;

  ${p =>
    p.$position === 'top'
      ? css`
          top: 14%;
          left: 4%;
          flex-direction: row;
        `
      : css`
          bottom: 14%;
          right: 4%;
          flex-direction: row-reverse;
        `}

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const AnnotationLine = styled.svg`
  width: 90px;
  height: 30px;
  overflow: visible;
  color: ${theme.colors.dark};
`;

const AnnotationText = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${theme.colors.dark};
  white-space: nowrap;
`;

const TopFade = styled.div<{ $reduced: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40vh;
  background: linear-gradient(to bottom, ${theme.colors.light} 0%, rgba(248, 244, 242, 0) 100%);
  pointer-events: none;
  z-index: 3;
  opacity: ${p => (p.$reduced ? 1 : 0)};
`;

const CaptionBlock = styled.div`
  text-align: center;
  background: ${theme.colors.light};
  padding: ${theme.spacing.xlarge} ${theme.spacing.large};
`;

const Signature = styled.p`
  font-family: ${theme.fonts.accent};
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.large};
`;

const CTA = styled(Link)`
  display: inline-block;
  font-family: ${theme.fonts.body};
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  color: ${theme.colors.white};
  background: ${theme.gradients.primary};
  padding: 0.95rem 2.4rem;
  border-radius: ${theme.borderRadius.round};
  box-shadow: ${theme.shadows.medium};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.shadows.hover};
  }
`;

const BioSection = styled.section`
  background: ${theme.colors.light};
  padding: ${theme.spacing.xxlarge} ${theme.spacing.large};
  text-align: center;
`;

const BioText = styled.p`
  max-width: 720px;
  margin: 0 auto;
  font-family: ${theme.fonts.body};
  font-size: 1.05rem;
  line-height: 1.85;
  color: ${theme.colors.textLight};
`;

const Hero: React.FC = () => {
  const [prefersReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const stage = stageRef.current;
    const image = imageRef.current;
    const fade = fadeRef.current;
    if (!stage || !image || !fade) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: () => `+=${window.innerHeight}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        image,
        {
          width: '112vw',
          height: '112vh',
          ease: 'none',
        },
        0
      ).to(
        fade,
        {
          opacity: 1,
          ease: 'none',
        },
        0
      );
    }, stage);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <>
      <Stage ref={stageRef}>
        <ZoomImage ref={imageRef} $reduced={prefersReducedMotion} />
        {!prefersReducedMotion && (
          <>
            <Annotation $position="top">
              <AnnotationLine viewBox="0 0 100 30" fill="none">
                <path
                  d="M2,20 C25,2 45,32 68,14 C80,6 88,10 96,4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </AnnotationLine>
              <AnnotationText>Premium Service</AnnotationText>
            </Annotation>
            <Annotation $position="bottom">
              <AnnotationLine viewBox="0 0 100 30" fill="none">
                <path
                  d="M2,20 C25,2 45,32 68,14 C80,6 88,10 96,4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </AnnotationLine>
              <AnnotationText>Sophisticated Style</AnnotationText>
            </Annotation>
          </>
        )}
        <TopFade ref={fadeRef} $reduced={prefersReducedMotion} />
      </Stage>

      <CaptionBlock>
        <Signature>Harpreet Kaur Dogra</Signature>
        <CTA to="/contact">Plan Your Event</CTA>
      </CaptionBlock>

      <BioSection>
        <BioText>
          Founded in 2022 by Harpreet Kaur Dogra, Preetie Decor has grown into one of
          Dar es Salaam's most trusted names in event styling — winner of the Africa
          Interior Design Award 2024 for Best Event Decoration. From weddings and bridal
          showers to birthdays and corporate celebrations, every setup is designed and
          hand-arranged by a certified team who believe moments matter more than things.
        </BioText>
      </BioSection>
    </>
  );
};

export default Hero;
