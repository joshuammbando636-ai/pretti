import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { theme } from '../../styles/theme';
import blogPosts from '../../data/blogPosts.json';

const Section = styled.section`
  padding: ${theme.spacing.xlarge} ${theme.spacing.large};
  background: ${theme.colors.light};
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: 3rem;
  color: ${theme.colors.primary};
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 1.2rem;
  color: ${theme.colors.textLight};
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 100%;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled(Link)`
  display: block;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  min-width: 0;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(179, 0, 89, 0.1);
  }
`;

const BlogImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, ${theme.colors.primaryLight}40, ${theme.colors.accent}40);
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${BlogCard}:hover img {
    transform: scale(1.05);
  }
`;

const Category = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  background: ${theme.colors.primary};
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  z-index: 2;
`;

const BlogContent = styled.div`
  padding: 25px 20px;
`;

const BlogMeta = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  font-size: 0.9rem;
  color: ${theme.colors.textLight};

  svg {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    color: ${theme.colors.primary};
  }

  span {
    display: flex;
    align-items: center;
  }
`;

const BlogTitle = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: 1.4rem;
  color: ${theme.colors.dark};
  margin-bottom: 10px;
  line-height: 1.4;
  overflow-wrap: break-word;
`;

const BlogExcerpt = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 0.95rem;
  color: ${theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: 20px;
  overflow-wrap: break-word;
`;

const ReadMoreLink = styled.span`
  color: ${theme.colors.primary};
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: gap 0.3s ease;

  ${BlogCard}:hover & {
    gap: 12px;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const BlogPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Blog | Preetie Decor - Event Styling Tips & Wedding Trends in Dar es Salaam, Tanzania</title>
        <meta name="description" content="Read the latest event decoration tips, wedding trends, and styling inspiration from Preetie Decor in Dar es Salaam, Tanzania. Expert advice for weddings, birthdays, and corporate events." />
        <meta name="keywords" content="event decoration blog Dar es Salaam, wedding trends Tanzania, party styling tips, event inspiration, Preetie Decor blog, wedding decor ideas, birthday decoration tips, corporate event styling Tanzania" />
        <meta name="geo.region" content="TZ" />
        <meta name="geo.placename" content="Dar es Salaam" />
        <meta name="geo.position" content="-6.7924;39.2083" />
        <meta name="ICBM" content="-6.7924, 39.2083" />
        <link rel="canonical" href="https://preetiedecor.com/blog" />
      </Helmet>
      <Section>
        <Container>
          <Header>
            <Title>Our Blog</Title>
            <Subtitle>Tips, ideas, and inspiration for your next event</Subtitle>
          </Header>

          <BlogGrid>
            {blogPosts.map((post) => (
              <BlogCard key={post.id} to={`/blog/${post.slug}`}>
                <BlogImage>
                  <img src={post.image} alt={post.title} />
                  <Category>{post.category}</Category>
                </BlogImage>
                <BlogContent>
                  <BlogMeta>
                    <span>
                      <Calendar />
                      {post.date}
                    </span>
                    <span>
                      <User />
                      {post.author}
                    </span>
                  </BlogMeta>
                  <BlogTitle>{post.title}</BlogTitle>
                  <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                  <ReadMoreLink>
                    Read More
                    <ArrowRight />
                  </ReadMoreLink>
                </BlogContent>
              </BlogCard>
            ))}
          </BlogGrid>
        </Container>
      </Section>
    </>
  );
};

export default BlogPage;