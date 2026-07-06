import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

export interface TocItem {
  id: string;
  text: string;
}

const Nav = styled.nav`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.grayLight};
  border-radius: ${theme.borderRadius.medium};
  padding: 20px;

  p.title {
    font-family: ${theme.fonts.heading};
    font-weight: 600;
    font-size: 1.1rem;
    color: ${theme.colors.dark};
    margin-bottom: 14px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }

  .dot {
    margin-top: 9px;
    flex-shrink: 0;
    border-radius: 50%;
    background: ${theme.colors.primary};
    transition: width 0.2s ease, height 0.2s ease;
  }

  a {
    display: block;
    font-family: ${theme.fonts.body};
    font-size: 0.9rem;
    line-height: 1.4;
    padding: 6px 0;
    text-decoration: none;
    transition: color 0.2s ease;
  }
`;

export const BlogToc: React.FC<{ items: TocItem[] }> = ({ items }) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    if (!items.length) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const offset = 120;
        let current = items[0].id;
        for (const item of items) {
          const el = document.getElementById(item.id);
          if (!el) continue;
          if (el.getBoundingClientRect().top - offset <= 0) current = item.id;
          else break;
        }
        setActiveId(current);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items]);

  const scrollTo = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setActiveId(id);
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  if (!items.length) return null;

  return (
    <Nav>
      <p className="title">Contents</p>
      <ul>
        {items.map(item => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <span
                className="dot"
                style={{ width: active ? 6 : 0, height: active ? 6 : 0 }}
              />
              <a
                href={`#${item.id}`}
                onClick={e => scrollTo(e, item.id)}
                style={{
                  color: active ? theme.colors.primary : theme.colors.textLight,
                  fontWeight: active ? 600 : 400,
                }}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </Nav>
  );
};

export default BlogToc;
