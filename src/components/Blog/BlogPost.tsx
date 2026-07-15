import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Calendar, User, ArrowLeft, Sparkles } from 'lucide-react';
import { theme } from '../../styles/theme';
import blogPosts from '../../data/blogPosts.json';
import { BlogToc } from './BlogToc';
import type { TocItem } from './BlogToc';

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

/* ── Layout ─────────────────────────────────────────────────────────────────── */
const Section = styled.section`
  padding: ${theme.spacing.xlarge} ${theme.spacing.large};
  background: ${theme.colors.light};
  min-height: 100vh;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.large} ${theme.spacing.medium};
  }
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.large};

  @media (min-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 240px minmax(0, 1fr) 300px;
    gap: 40px;
    align-items: start;
  }
`;

const SideLeft = styled.aside`
  display: none;

  @media (min-width: ${theme.breakpoints.desktop}) {
    display: block;
    position: sticky;
    top: 100px;
  }
`;

const SideRight = styled.aside`
  display: none;

  @media (min-width: ${theme.breakpoints.desktop}) {
    display: block;
    position: sticky;
    top: 100px;
  }
`;

const Article = styled.div`
  min-width: 0;
  max-width: 760px;
  width: 100%;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  margin-bottom: 25px;
  padding: 8px 16px;
  border: 1px solid ${theme.colors.grayLight};
  border-radius: ${theme.borderRadius.round};
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const PostImage = styled.div`
  width: 100%;
  height: 340px;
  border-radius: ${theme.borderRadius.large};
  margin-bottom: 30px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 220px;
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
  margin-bottom: 25px;
  line-height: 1.25;
  overflow-wrap: break-word;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.9rem;
  }
`;

const PostContent = styled.div`
  font-family: ${theme.fonts.body};
  color: ${theme.colors.textLight};
  line-height: 1.8;
  font-size: 1.1rem;
  overflow-wrap: break-word;
  word-break: break-word;

  h1 {
    color: ${theme.colors.primary};
    font-size: 2rem;
    margin-top: 40px;
    margin-bottom: 20px;
    overflow-wrap: break-word;
    scroll-margin-top: 100px;
  }

  h2 {
    color: ${theme.colors.dark};
    font-family: ${theme.fonts.heading};
    font-size: 1.55rem;
    margin-top: 40px;
    margin-bottom: 15px;
    overflow-wrap: break-word;
    scroll-margin-top: 100px;
  }

  h3 {
    color: ${theme.colors.primary};
    font-size: 1.2rem;
    margin-top: 28px;
    margin-bottom: 12px;
    scroll-margin-top: 100px;
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

/* ── CTA ────────────────────────────────────────────────────────────────────── */
const CtaCard = styled.div`
  background: ${theme.colors.dark};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.large};
  padding: ${theme.spacing.large};

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: ${theme.colors.accent};
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }

  h3 {
    font-family: ${theme.fonts.heading};
    font-size: 1.4rem;
    margin-bottom: 10px;
    line-height: 1.3;
  }

  p {
    font-size: 0.92rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.82);
    margin-bottom: 18px;
  }

  a {
    display: inline-block;
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    padding: 12px 22px;
    border-radius: ${theme.borderRadius.round};
    transition: background 0.2s ease, transform 0.2s ease;

    &:hover {
      background: ${theme.colors.primaryHover};
      transform: translateY(-2px);
    }
  }
`;

const MobileCta = styled.div`
  margin-top: ${theme.spacing.xlarge};

  @media (min-width: ${theme.breakpoints.desktop}) {
    display: none;
  }
`;

/* ── Related ────────────────────────────────────────────────────────────────── */
const RelatedSection = styled.section`
  max-width: 1200px;
  margin: ${theme.spacing.xxlarge} auto 0;
`;

const RelatedHeading = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: 1.8rem;
  color: ${theme.colors.dark};
  margin-bottom: ${theme.spacing.large};
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const RelatedCard = styled(Link)`
  display: block;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
  min-width: 0;
  text-decoration: none;
  color: inherit;
  box-shadow: ${theme.shadows.small};
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${theme.shadows.card};
  }

  .thumb {
    position: relative;
    height: 180px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .cat {
      position: absolute;
      top: 12px;
      left: 12px;
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 4px 10px;
      border-radius: ${theme.borderRadius.round};
    }
  }

  .body {
    padding: 16px;
  }

  .date {
    font-size: 0.8rem;
    color: ${theme.colors.textLight};
    margin-bottom: 6px;
  }

  h3 {
    font-family: ${theme.fonts.heading};
    font-size: 1.05rem;
    color: ${theme.colors.dark};
    line-height: 1.35;
    overflow-wrap: break-word;
  }
`;

/* ── Helpers ────────────────────────────────────────────────────────────────── */
const slugify = (t: string) =>
  t
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);

function buildToc(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used: Record<string, number> = {};
  const out = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (m, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (!text) return m;
    let id = slugify(text) || 'section';
    if (used[id]) {
      used[id]++;
      id = `${id}-${used[id]}`;
    } else {
      used[id] = 1;
    }
    toc.push({ id, text });
    return /\sid=/.test(attrs) ? m : `<h2 id="${id}"${attrs}>${inner}</h2>`;
  });
  return { html: out, toc };
}

const CtaBlock: React.FC = () => (
  <CtaCard>
    <span className="badge">
      <Sparkles size={14} /> Prettiee Decor
    </span>
    <h3>Planning an event?</h3>
    <p>
      Let us bring your vision to life with a free consultation and a tailored
      quote for your celebration.
    </p>
    <Link to="/contact">Get a free quote →</Link>
  </CtaCard>
);

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const posts = blogPosts as BlogPost[];
  const idx = posts.findIndex(p => p.slug === slug);
  const post = posts[idx];

  if (!post) {
    return (
      <Section>
        <Inner>
          <h2>Post not found</h2>
          <BackButton to="/blog">
            <ArrowLeft size={18} /> Back to Blog
          </BackButton>
        </Inner>
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

  const { html, toc } = buildToc(formatContent(post.content));

  const related = [1, 2, 3].map(o => posts[(idx + o) % posts.length]);

  return (
    <Section>
      <Helmet>
        <title>{post.title} | Preetie Decor Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://preetiedecor.com/blog/${post.slug}`} />
      </Helmet>

      <Inner>
        <Grid>
          <SideLeft>
            <BlogToc items={toc} />
          </SideLeft>

          <Article>
            <BackButton to="/blog">
              <ArrowLeft size={18} /> Back to Blog
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

            <PostContent dangerouslySetInnerHTML={{ __html: html }} />

            <MobileCta>
              <CtaBlock />
            </MobileCta>
          </Article>

          <SideRight>
            <CtaBlock />
          </SideRight>
        </Grid>

        <RelatedSection>
          <RelatedHeading>You may also like</RelatedHeading>
          <RelatedGrid>
            {related.map(rp => (
              <RelatedCard key={rp.slug} to={`/blog/${rp.slug}`}>
                <div className="thumb">
                  <img src={rp.image} alt={rp.title} loading="lazy" />
                  <span className="cat">{rp.category}</span>
                </div>
                <div className="body">
                  <div className="date">{rp.date}</div>
                  <h3>{rp.title}</h3>
                </div>
              </RelatedCard>
            ))}
          </RelatedGrid>
        </RelatedSection>
      </Inner>
    </Section>
  );
};

export default BlogPost;
