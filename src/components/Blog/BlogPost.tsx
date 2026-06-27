import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { theme } from '../../styles/theme';
import blogPosts from '../../data/blogPosts.json';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  image: string;
  slug: string;
  content: string;
}

const Section = styled.section`
  padding: ${theme.spacing.xlarge} ${theme.spacing.large};
  background: ${theme.colors.light};
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.primary};
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 30px;
  font-weight: 500;
  font-size: 1rem;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PostImage = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, ${theme.colors.primaryLight}40, ${theme.colors.accent}40);
  border-radius: 20px;
  margin-bottom: 30px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PostMeta = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
  color: ${theme.colors.textLight};
  font-size: 0.95rem;

  svg {
    width: 18px;
    height: 18px;
    margin-right: 5px;
    color: ${theme.colors.primary};
  }

  span {
    display: flex;
    align-items: center;
  }
`;

const PostTitle = styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: 2.5rem;
  color: ${theme.colors.dark};
  margin-bottom: 20px;
  line-height: 1.3;
  overflow-wrap: break-word;
`;

const PostContent = styled.div`
  font-family: ${theme.fonts.body};
  color: ${theme.colors.textLight};
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 40px;
  overflow-wrap: break-word;
  word-break: break-word;

  h1 {
    color: ${theme.colors.primary};
    font-size: 2rem;
    margin-top: 40px;
    margin-bottom: 20px;
    overflow-wrap: break-word;
  }

  h2 {
    color: ${theme.colors.primary};
    font-size: 1.6rem;
    margin-top: 35px;
    margin-bottom: 15px;
    overflow-wrap: break-word;
  }

  p {
    margin-bottom: 20px;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: ${theme.borderRadius.medium};
  }

  a {
    color: ${theme.colors.primary};
    overflow-wrap: break-word;
  }

  ul, ol {
    margin-bottom: 20px;
    padding-left: 25px;
  }

  li {
    margin-bottom: 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 30px 0;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  
  th {
    background: ${theme.colors.primaryLight}20;
    font-weight: 600;
  }
  
  strong {
    color: ${theme.colors.primary};
  }
`;

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Find the post from JSON using slug
  const post = (blogPosts as BlogPost[]).find((p: BlogPost) => p.slug === slug);

  // If post not found
  if (!post) {
    return (
      <Section>
        <Container>
          <h2>Post not found</h2>
          <button onClick={() => navigate('/blog')} style={{ background: 'none', border: 'none', color: theme.colors.primary, cursor: 'pointer' }}>
            Back to Blog
          </button>
        </Container>
      </Section>
    );
  }

  // Simple markdown to HTML converter
  const formatContent = (content: string): string => {
    let html = content;
    
    // Convert headers
    html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
    html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    
    // Convert bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert lists
    html = html.replace(/^- (.*?)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Convert tables
    const tableRegex = /\n(\|.*\|)\n\|[-:\s|]+\|\n((?:\|.*\|\n?)+)/gm;
    html = html.replace(tableRegex, (_match: string, headerRow: string, bodyRows: string) => {
      const headers = headerRow.split('|').filter((cell: string) => cell.trim());
      const headerHtml = `<tr>${headers.map((h: string) => `<th>${h.trim()}</th>`).join('')}</tr>`;
      const rows = bodyRows.trim().split('\n');
      const bodyHtml = rows.map((row: string) => {
        const cells = row.split('|').filter((cell: string) => cell.trim());
        return `<tr>${cells.map((c: string) => `<td>${c.trim()}</td>`).join('')}</tr>`;
      }).join('');
      return `<div style="overflow-x: auto;"><table>${headerHtml}${bodyHtml}</table></div>`;
    });
    
    // Convert line breaks to paragraphs
    const paragraphs = html.split('\n\n');
    html = paragraphs.map((para: string) => {
      if (para.trim().startsWith('<')) return para;
      if (para.trim().length > 0) return `<p>${para.replace(/\n/g, '<br/>')}</p>`;
      return '';
    }).join('');
    
    return html;
  };

  return (
    <Section>
      <Container>
        <BackButton onClick={() => navigate('/blog')}>
          <ArrowLeft size={18} />
          Back to Blog
        </BackButton>

        {post.image && (
          <PostImage>
            <img src={post.image} alt={post.title} />
          </PostImage>
        )}

        <PostMeta>
          <span><Calendar size={16} /> {post.date}</span>
          <span><User size={16} /> {post.author}</span>
        </PostMeta>

        <PostTitle>{post.title}</PostTitle>
        
        <PostContent dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
      </Container>
    </Section>
  );
};

export default BlogPost;