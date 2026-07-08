import React from 'react';
import { Gem, Calendar, Users } from 'lucide-react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const Section = styled.section`
  padding: ${theme.spacing.xxlarge} ${theme.spacing.large};
  background: ${theme.colors.light};
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  max-width: 560px;
  margin: 0 auto ${theme.spacing.xxlarge};
`;

const Eyebrow = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 0.85rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  margin-bottom: ${theme.spacing.medium};
`;

const Title = styled.h2`
  font-family: ${theme.fonts.heading};
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 2.8rem);
  color: ${theme.colors.dark};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 90px auto 1fr;
  align-items: center;
  gap: ${theme.spacing.large};
  padding: ${theme.spacing.xlarge} 0;
  border-top: 1px solid ${theme.colors.grayLight};

  &:last-child {
    border-bottom: 1px solid ${theme.colors.grayLight};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 60px auto;
    grid-template-areas:
      'number icon'
      'body body';
    row-gap: ${theme.spacing.medium};
  }
`;

const Number = styled.span`
  font-family: ${theme.fonts.heading};
  font-style: italic;
  font-size: 1.6rem;
  color: ${theme.colors.grayLight};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-area: number;
  }
`;

const IconWrapper = styled.div`
  color: ${theme.colors.primary};

  svg {
    width: 34px;
    height: 34px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-area: icon;
  }
`;

const Body = styled.div`
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-area: body;
  }
`;

const ItemTitle = styled.h3`
  font-family: ${theme.fonts.heading};
  font-weight: 700;
  font-size: 1.3rem;
  color: ${theme.colors.dark};
  margin-bottom: 6px;
`;

const ItemText = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 0.98rem;
  line-height: 1.7;
  color: ${theme.colors.textLight};
  max-width: 520px;
`;

const WhyChoose: React.FC = () => {
  const features = [
    {
      icon: Gem,
      title: 'Premium Quality',
      description: 'We use the finest materials to make your event unforgettable.'
    },
    {
      icon: Calendar,
      title: 'Personalized Events',
      description: 'We tailor decorations to your style and theme.'
    },
    {
      icon: Users,
      title: 'Professional Team',
      description: 'We create emotion. Every detail is designed to make you feel something special, because moments matter more than things.'
    }
  ];

  return (
    <Section>
      <Container>
        <Header>
          <Eyebrow>Why Preetie Decor</Eyebrow>
          <Title>Reasons to celebrate with us</Title>
        </Header>

        <List>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Item key={index}>
                <Number>{String(index + 1).padStart(2, '0')}</Number>
                <IconWrapper>
                  <Icon />
                </IconWrapper>
                <Body>
                  <ItemTitle>{feature.title}</ItemTitle>
                  <ItemText>{feature.description}</ItemText>
                </Body>
              </Item>
            );
          })}
        </List>
      </Container>
    </Section>
  );
};

export default WhyChoose;
