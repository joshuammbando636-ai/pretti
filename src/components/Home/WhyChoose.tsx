import React from 'react';
import styled from 'styled-components';
import { Gem, Calendar, Users } from 'lucide-react';
import { theme } from '../../styles/theme';

const Section = styled.section`
  padding: ${theme.spacing.xlarge} ${theme.spacing.large};
  background: ${theme.colors.light};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xlarge};
  font-family: ${theme.fonts.heading};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.large};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${theme.colors.white};
  border-radius: 12px;
  padding: ${theme.spacing.large};
  box-shadow: ${theme.shadows.medium};
  transition: transform 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.large};
  }
`;

const IconWrapper = styled.div`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.medium};

  svg {
    width: 48px;
    height: 48px;
  }
`;

const CardTitle = styled.h3`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.medium};
  font-family: ${theme.fonts.heading};
`;

const CardText = styled.p`
  color: ${theme.colors.textLight};
  font-family: ${theme.fonts.body};
  line-height: 1.6;
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
      description: 'We create emotion. Every detail is designed to make you feel something special, because moments matter more than things'
    }
  ];

  return (
    <Section>
      <Container>
        <Title>Why Choose Preetiee Decor?</Title>
        <Row>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index}>
                <IconWrapper>
                  <Icon />
                </IconWrapper>
                <CardTitle>{feature.title}</CardTitle>
                <CardText>{feature.description}</CardText>
              </Card>
            );
          })}
        </Row>
      </Container>
    </Section>
  );
};

export default WhyChoose;