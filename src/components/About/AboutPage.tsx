import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled, { keyframes } from 'styled-components';
import { Award, Trophy, Medal, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { theme } from '../../styles/theme';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ── Layout ─────────────────────────────────────────────────────────────────── */
const Section = styled.section`
  padding: ${theme.spacing.xxlarge} ${theme.spacing.large};
  background: ${theme.colors.white};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xlarge} ${theme.spacing.medium};
  }
`;

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`;

/* ── Intro ──────────────────────────────────────────────────────────────────── */
const Intro = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: ${theme.spacing.xlarge};
  align-items: center;
  animation: ${fadeIn} 0.6s ease;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.large};
  }
`;

const FounderImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${theme.borderRadius.large};
  display: block;

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 360px;
    margin: 0 auto;
  }
`;

const Content = styled.div``;

const Eyebrow = styled.span`
  display: block;
  font-family: ${theme.fonts.body};
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: 2.6rem;
  font-weight: 600;
  color: ${theme.colors.dark};
  line-height: 1.2;
  margin-bottom: ${theme.spacing.medium};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Paragraph = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  color: ${theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: ${theme.spacing.medium};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.95rem;
    line-height: 1.7;
  }
`;

const Highlight = styled.strong`
  color: ${theme.colors.dark};
  font-weight: 600;
`;

const Quote = styled.blockquote`
  margin: ${theme.spacing.large} 0 0;
  padding-left: ${theme.spacing.medium};
  border-left: 3px solid ${theme.colors.primary};
  font-family: ${theme.fonts.heading};
  font-size: 1.15rem;
  font-style: italic;
  color: ${theme.colors.dark};
  line-height: 1.5;
`;

/* ── Awards ─────────────────────────────────────────────────────────────────── */
const AwardsBlock = styled.div`
  margin-top: ${theme.spacing.xxlarge};
  animation: ${fadeIn} 0.6s ease 0.1s both;
`;

const AwardsHeading = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: 1.6rem;
  font-weight: 600;
  color: ${theme.colors.dark};
  text-align: center;
  margin-bottom: 6px;
`;

const AwardsSub = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 0.95rem;
  color: ${theme.colors.textLight};
  text-align: center;
  margin-bottom: ${theme.spacing.large};
`;

const AwardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.medium};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const AwardCard = styled.button`
  text-align: left;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.grayLight};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.large};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    transform: translateY(-3px);
    box-shadow: ${theme.shadows.card};
  }

  &:focus-visible {
    outline: 3px solid ${theme.colors.accent};
    outline-offset: 2px;
  }

  .icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.light};
    color: ${theme.colors.primary};
  }

  .name {
    font-family: ${theme.fonts.heading};
    font-size: 1.05rem;
    font-weight: 600;
    color: ${theme.colors.dark};
  }

  .desc {
    font-family: ${theme.fonts.body};
    font-size: 0.88rem;
    color: ${theme.colors.textLight};
    line-height: 1.5;
  }

  .view {
    margin-top: auto;
    font-family: ${theme.fonts.body};
    font-size: 0.85rem;
    font-weight: 600;
    color: ${theme.colors.primary};
  }
`;

/* ── Modal ──────────────────────────────────────────────────────────────────── */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.medium};
  z-index: 1000;
  animation: ${fadeIn} 0.25s ease;
`;

const Modal = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.large};
  max-width: 720px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.medium};
  padding: ${theme.spacing.medium} ${theme.spacing.large};
  border-bottom: 1px solid ${theme.colors.grayLight};

  h3 {
    font-family: ${theme.fonts.heading};
    font-size: 1.1rem;
    color: ${theme.colors.dark};
    margin: 0;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: ${theme.colors.grayDark};
    display: flex;
    padding: 4px;
    border-radius: 50%;
    transition: background 0.2s ease;

    &:hover {
      background: ${theme.colors.light};
    }
  }
`;

const ModalBody = styled.div`
  padding: ${theme.spacing.large};
  text-align: center;

  img {
    max-width: 100%;
    border-radius: ${theme.borderRadius.medium};
  }

  .caption {
    margin-top: ${theme.spacing.medium};
    font-family: ${theme.fonts.body};
    font-size: 0.9rem;
    color: ${theme.colors.textLight};
  }
`;

interface AwardItem {
  icon: LucideIcon;
  name: string;
  desc: string;
  modalTitle: string;
  image: string;
  caption: string;
}

const awards: AwardItem[] = [
  {
    icon: Trophy,
    name: 'Africa Interior Design Award 2026',
    desc: 'Winner · Best Event Decoration · Pan-African Excellence',
    modalTitle: 'Africa Interior Design Award 2026 — Winner',
    image: '/images/aww.jpeg',
    caption: 'Best Event Decoration · Pan-African Excellence',
  },
  {
    icon: Award,
    name: 'TZ Event Planning — Certificate of Appreciation',
    desc: 'Winner · Best Emerging Event Decorator',
    modalTitle: 'TZ Event Planning · Certificate of Appreciation',
    image: '/images/tz.jpeg',
    caption: 'Best Emerging Event Decorator · Winner · Prettiee Decor',
  },
  {
    icon: Medal,
    name: 'Professional Flower Arranging & Function Decor',
    desc: 'Certified in 2024 · Recognized Excellence',
    modalTitle: 'Professional Flower Arranging & Function Decor Certification',
    image: '/images/IMG_1922.png',
    caption: 'Achieved in 2024 · Recognized Excellence',
  },
];

const AboutPage: React.FC = () => {
  const [activeAward, setActiveAward] = useState<AwardItem | null>(null);

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
          <Intro>
            <FounderImage src="/images/ceo.png" alt="Founder Harpreet Kaur Dogra" />

            <Content>
              <Eyebrow>About Us</Eyebrow>
              <Title>Crafting unforgettable celebrations</Title>

              <Paragraph>
                Preetie Decor was founded in <Highlight>2022</Highlight> by{' '}
                <Highlight>Harpreet Kaur Dogra</Highlight>, with a dream to transform
                ordinary spaces into breathtaking celebrations. What began as a small
                passion project has grown into a trusted name in event decoration —
                known for creativity, attention to detail, and exceptional care.
              </Paragraph>

              <Paragraph>
                From stunning floral arrangements to bespoke décor concepts, we bring
                elegance and a personal story to weddings, birthdays, corporate events,
                and more — turning your dream event into reality.
              </Paragraph>

              <Quote>
                “Your celebration is our canvas — and we paint it with love, color, and
                creativity.”
              </Quote>
            </Content>
          </Intro>

          <AwardsBlock>
            <AwardsHeading>Awards &amp; Recognition</AwardsHeading>
            <AwardsSub>Honored for our work across Tanzania and beyond</AwardsSub>

            <AwardsGrid>
              {awards.map(award => {
                const Icon = award.icon;
                return (
                  <AwardCard key={award.name} onClick={() => setActiveAward(award)}>
                    <span className="icon">
                      <Icon size={22} />
                    </span>
                    <span className="name">{award.name}</span>
                    <span className="desc">{award.desc}</span>
                    <span className="view">View certificate →</span>
                  </AwardCard>
                );
              })}
            </AwardsGrid>
          </AwardsBlock>
        </Container>

        {activeAward && (
          <Overlay onClick={() => setActiveAward(null)}>
            <Modal onClick={e => e.stopPropagation()}>
              <ModalHeader>
                <h3>{activeAward.modalTitle}</h3>
                <button onClick={() => setActiveAward(null)} aria-label="Close">
                  <X size={22} />
                </button>
              </ModalHeader>
              <ModalBody>
                <img src={activeAward.image} alt={activeAward.modalTitle} />
                <p className="caption">{activeAward.caption}</p>
              </ModalBody>
            </Modal>
          </Overlay>
        )}
      </Section>
    </>
  );
};

export default AboutPage;
