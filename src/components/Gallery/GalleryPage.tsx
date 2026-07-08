import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled, { css } from 'styled-components';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { theme } from '../../styles/theme';

gsap.registerPlugin(ScrollTrigger);

const heroVideoSrc = encodeURI(
  '/videos/A full setup brought to life with passion_ detail and elegance ✨_From the handcrafted backdrop to the thoughtfully styled table and every cultural touch i(.mp4'
);

const VideoHeroWrapper = styled.div<{ $reduced: boolean }>`
  position: relative;
  width: 100%;
  margin-top: -120px; /* bleed up under the navbar clearance so the hero is full */

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-top: -96px;
  }
`;

const VideoStage = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
`;

const HeroVideo = styled.video<{ $reduced: boolean }>`
  object-fit: cover;
  background-color: #2d3436;
  will-change: width, height, border-radius;

  ${p =>
    p.$reduced
      ? css`
          width: 86vw;
          height: 60vh;
          border-radius: 40px;
        `
      : css`
          width: 100vw;
          height: 100vh;
          height: 100svh;
          border-radius: 0px;
        `}
`;

const GalleryHeading = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: clamp(4rem, 18vw, 14rem);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -2px;
  text-align: center;
  color: ${theme.colors.primary};
  margin: ${theme.spacing.xlarge} auto ${theme.spacing.large};
`;

const Section = styled.section`
  padding: ${theme.spacing.xlarge} ${theme.spacing.large};
  background: ${theme.colors.light};
  text-align: center;
`;

const Title = styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: 2.8rem;
  color: ${theme.colors.primaryLight};
  margin: 20px auto 10px;
  letter-spacing: 2px;
  text-align: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2.2rem;
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

const IntroText = styled.p`
  max-width: 640px;
  margin: 0 auto ${theme.spacing.large};
  color: ${theme.colors.textLight};
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  line-height: 1.7;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.xlarge};
  margin-bottom: ${theme.spacing.large};
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing.large};
  }
`;

const Stat = styled.div`
  text-align: center;

  strong {
    display: block;
    font-family: ${theme.fonts.heading};
    font-size: 1.8rem;
    font-weight: 700;
    color: ${theme.colors.primary};
  }

  span {
    font-family: ${theme.fonts.body};
    font-size: 0.85rem;
    color: ${theme.colors.textLight};
    letter-spacing: 0.4px;
  }
`;

const ShowcaseWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const ShowcaseTrack = styled.div`
  display: flex;
  height: 100vh;
  height: 100svh;
  width: max-content;
  will-change: transform;
`;

const ShowcaseMobileStack = styled.div`
  display: block;
  width: 100%;
`;

const ShowcasePanel = styled.div<{ $stacked: boolean }>`
  position: relative;
  cursor: pointer;

  ${p =>
    p.$stacked
      ? css`
          width: 100%;
          aspect-ratio: 4 / 5;
          height: auto;
          margin-bottom: ${theme.spacing.small};
          overflow: hidden;
        `
      : css`
          display: flex;
          align-items: stretch;
          width: 82vw;
          height: 100vh;
          height: 100svh;
          flex: 0 0 82vw;
        `}
`;

const ShowcaseImageWrap = styled.div`
  position: relative;
  flex: 1 1 auto;
  overflow: hidden;
`;

const ShowcaseGutter = styled.div`
  flex: 0 0 18vw;
  background: #f9e6ec;
  border-left: 1px solid rgba(255, 255, 255, 0.3);

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const ShowcaseImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ShowcaseOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.55) 100%);
  pointer-events: none;
`;

const ShowcaseLabel = styled.h3`
  position: absolute;
  left: ${theme.spacing.large};
  bottom: ${theme.spacing.large};
  z-index: 2;
  margin: 0;
  font-family: ${theme.fonts.body};
  font-weight: 300;
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  line-height: 0.95;
  color: ${theme.colors.white};
  letter-spacing: 0.5px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: clamp(1.8rem, 9vw, 3rem);
    left: ${theme.spacing.medium};
    bottom: ${theme.spacing.medium};
  }
`;

const ShowcaseCTA = styled.button`
  position: absolute;
  top: ${theme.spacing.large};
  right: ${theme.spacing.large};
  z-index: 2;
  background: none;
  border: none;
  padding: 0;
  color: ${theme.colors.white};
  font-family: ${theme.fonts.body};
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  padding-bottom: 2px;
  transition: border-color 0.25s ease, opacity 0.25s ease;

  &:hover,
  &:focus-visible {
    border-color: ${theme.colors.white};
    opacity: 0.85;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.white};
    outline-offset: 4px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    top: ${theme.spacing.medium};
    right: ${theme.spacing.medium};
    font-size: 0.72rem;
  }
`;

const StorySection = styled.section`
  background: ${theme.colors.light};
  padding: ${theme.spacing.xxlarge} ${theme.spacing.large};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

const StoryParagraph = styled.p`
  max-width: 1100px;
  margin: 0 auto;
  font-family: ${theme.fonts.heading};
  font-weight: 500;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.4;
`;

const StoryWord = styled.span`
  color: rgba(45, 52, 54, 0.25);
`;

const LightboxOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${p => (p.$open ? 1 : 0)};
  visibility: ${p => (p.$open ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  padding: ${theme.spacing.large};
`;

const LightboxImage = styled.img`
  max-width: 90vw;
  max-height: 75vh;
  object-fit: contain;
  border-radius: ${theme.borderRadius.small};
  box-shadow: ${theme.shadows.large};
`;

const LightboxCaption = styled.div`
  position: absolute;
  bottom: ${theme.spacing.xlarge};
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: ${theme.colors.white};
  font-family: ${theme.fonts.body};

  h3 {
    font-family: ${theme.fonts.heading};
    margin: 0 0 4px 0;
    font-size: 1.4rem;
  }

  p {
    margin: 0;
    color: ${theme.colors.grayLight};
    font-size: 0.95rem;
  }
`;

const LightboxButton = styled.button`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: ${theme.colors.white};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

const CloseButton = styled(LightboxButton)`
  top: ${theme.spacing.large};
  right: ${theme.spacing.large};
`;

const PrevButton = styled(LightboxButton)`
  left: ${theme.spacing.large};
  top: 50%;
  transform: translateY(-50%);
`;

const NextButton = styled(LightboxButton)`
  right: ${theme.spacing.large};
  top: 50%;
  transform: translateY(-50%);
`;

type Category = 'Wedding' | 'Bridal Shower' | 'Birthday' | 'Confirmation' | 'Holiday' | 'Corporate';

interface GalleryItem {
  id: number;
  title: string;
  location: string;
  date: string;
  image: string;
  category: Category;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Elegant Wedding Setup',
    location: 'Dar es Salaam',
    date: 'June 2024',
    image: '/images/chair.jpg',
    category: 'Wedding'
  },
  {
    id: 2,
    title: 'Bridal Shower Bliss',
    location: 'Dar es Salaam, Masaki',
    date: 'July 2023',
    image: '/images/brid.jpg',
    category: 'Bridal Shower'
  },
  {
    id: 3,
    title: 'Grand Opening',
    location: 'Dar es Salaam, Osterbay',
    date: 'June 2023',
    image: '/images/open.jpg',
    category: 'Corporate'
  },
  {
    id: 4,
    title: 'Birthday Celebration',
    location: 'Dar es Salaam, Masaki',
    date: 'July 2023',
    image: '/images/boy.jpg',
    category: 'Birthday'
  },
  {
    id: 5,
    title: 'Confirmation Event',
    location: 'Dar es Salaam, Masaki',
    date: 'November 2024',
    image: '/images/ou.jpg',
    category: 'Confirmation'
  },
  {
    id: 6,
    title: 'Christmas Event',
    location: 'Dar es Salaam, Msasani',
    date: 'December 2024',
    image: '/images/chr.jpg',
    category: 'Holiday'
  },
  {
    id: 7,
    title: 'Wedding Ceremony',
    location: 'Dar es Salaam',
    date: '2026',
    image: '/images/ww.jpeg',
    category: 'Wedding'
  },
  {
    id: 8,
    title: 'Wedding Reception',
    location: 'Dar es Salaam, Masaki',
    date: '2026',
    image: '/images/ww2.jpeg',
    category: 'Wedding'
  },
  {
    id: 9,
    title: 'Wedding Decoration',
    location: 'Dar es Salaam, Osterbay',
    date: '2026',
    image: '/images/ww3.jpeg',
    category: 'Wedding'
  },
  {
    id: 10,
    title: 'Wedding Setup',
    location: 'Dar es Salaam, Msasani',
    date: '2026',
    image: '/images/ww5.jpeg',
    category: 'Wedding'
  },
  {
    id: 11,
    title: 'Wedding Details',
    location: 'Dar es Salaam',
    date: '2026',
    image: '/images/ww4.jpeg',
    category: 'Wedding'
  },
  {
    id: 12,
    title: 'Special Recognition',
    location: 'Dar es Salaam',
    date: '2026',
    image: '/images/aww.jpeg',
    category: 'Corporate'
  },
  {
    id: 13,
    title: 'Bridal Shower Sign',
    location: 'Dar es Salaam',
    date: '2025',
    image: '/images/a.jpeg',
    category: 'Bridal Shower'
  },
  {
    id: 14,
    title: 'Garden Bridal Tablescape',
    location: 'Dar es Salaam',
    date: '2025',
    image: '/images/aa.jpeg',
    category: 'Bridal Shower'
  },
  {
    id: 15,
    title: 'Bridal Shower Celebration',
    location: 'Dar es Salaam',
    date: '2025',
    image: '/images/aaaa.jpeg',
    category: 'Bridal Shower'
  },
  {
    id: 16,
    title: 'Golden Birthday Celebration',
    location: 'Dar es Salaam',
    date: '2026',
    image: '/images/aaa.jpeg',
    category: 'Birthday'
  },
  {
    id: 17,
    title: 'Champagne Tower',
    location: 'Dar es Salaam',
    date: '2025',
    image: '/images/aaaaaaa.jpeg',
    category: 'Bridal Shower'
  },
  {
    id: 18,
    title: 'Elegant Birthday Table',
    location: 'Dar es Salaam',
    date: '2026',
    image: '/images/aaaaaaaa.jpeg',
    category: 'Birthday'
  },
  {
    id: 19,
    title: 'Luxury Blue Ballroom',
    location: 'Dar es Salaam',
    date: '2026',
    image: '/images/bla.jpeg',
    category: 'Corporate'
  },
  {
    id: 20,
    title: 'Event Styling Showcase',
    location: 'Dar es Salaam',
    date: '2026',
    image: '/images/bll.jpeg',
    category: 'Corporate'
  },
  {
    id: 21,
    title: 'Vibrant Kibaokata Backdrop',
    location: 'Dar es Salaam',
    date: '2025',
    image: '/images/gg.jpeg',
    category: 'Birthday'
  },
  {
    id: 22,
    title: 'Candlelit Romantic Table',
    location: 'Dar es Salaam',
    date: '2025',
    image: '/images/tabl.jpg',
    category: 'Wedding'
  }
];

const categories: Array<Category | 'All'> = [
  'All',
  'Wedding',
  'Bridal Shower',
  'Birthday',
  'Confirmation',
  'Holiday',
  'Corporate'
];

const showcaseItemIds = [1, 2, 3, 4, 5, 6, 7, 13, 16, 19];
const showcaseItems: GalleryItem[] = showcaseItemIds.map(id => galleryItems.find(item => item.id === id)!);

const storyText =
  'Preetie Decor is a Dar es Salaam styling studio dedicated to capturing those moments, often fleeting, where celebrations reveal what is most precious to the people living them: their joy, their story, and their emotion.';
const storyWords = storyText.split(' ');

const GalleryPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const storyRef = useRef<HTMLParagraphElement>(null);
  const [prefersReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(`(max-width: ${theme.breakpoints.tablet})`).matches
  );

  useEffect(() => {
    const mobileQuery = window.matchMedia(`(max-width: ${theme.breakpoints.tablet})`);
    const syncMobile = () => setIsMobile(mobileQuery.matches);
    syncMobile();
    mobileQuery.addEventListener('change', syncMobile);
    return () => mobileQuery.removeEventListener('change', syncMobile);
  }, []);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const videoWrapper = videoWrapperRef.current;
    const video = videoRef.current;
    if (!videoWrapper || !video) return;

    const ctx = gsap.context(() => {
      gsap.to(video, {
        width: '86vw',
        height: '60vh',
        borderRadius: '40px',
        ease: 'none',
        scrollTrigger: {
          trigger: videoWrapper,
          start: 'top top',
          end: () => `+=${window.innerHeight}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, videoWrapper);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useLayoutEffect(() => {
    if (prefersReducedMotion || isMobile) return;
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => Math.max(track.scrollWidth - window.innerWidth, 0);

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, [prefersReducedMotion, isMobile]);

  useLayoutEffect(() => {
    if (prefersReducedMotion || isMobile) return;
    ScrollTrigger.refresh();
  }, [prefersReducedMotion, isMobile]);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const story = storyRef.current;
    if (!story) return;

    const ctx = gsap.context(() => {
      const words = story.querySelectorAll('span');

      gsap.to(words, {
        color: theme.colors.dark,
        stagger: 0.03,
        ease: 'none',
        scrollTrigger: {
          trigger: story,
          start: 'top 85%',
          end: 'bottom 55%',
          scrub: true,
        },
      });
    }, story);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex(i => (i === null ? null : (i - 1 + showcaseItems.length) % showcaseItems.length)),
    []
  );
  const showNext = useCallback(
    () => setActiveIndex(i => (i === null ? null : (i + 1) % showcaseItems.length)),
    []
  );

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, close, showPrev, showNext]);

  const activeItem = activeIndex !== null ? showcaseItems[activeIndex] : null;

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

      <VideoHeroWrapper ref={videoWrapperRef} $reduced={prefersReducedMotion}>
        <VideoStage>
          <HeroVideo
            ref={videoRef}
            $reduced={prefersReducedMotion}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src={heroVideoSrc} type="video/mp4" />
          </HeroVideo>
        </VideoStage>
      </VideoHeroWrapper>

      <GalleryHeading>GALLERY</GalleryHeading>

      <Section>
        <Title>Our Event Gallery</Title>
        <Subtitle>Memorable moments from our special events</Subtitle>

        <IntroText>
          Since 2022, Preetie Decor has transformed everyday spaces into unforgettable settings —
          from intimate bridal showers to grand corporate celebrations. Every piece in this gallery
          tells a story of color, detail, and care, captured across dozens of events throughout
          Dar es Salaam.
        </IntroText>

        <StatsRow>
          <Stat>
            <strong>{galleryItems.length}+</strong>
            <span>Events Styled</span>
          </Stat>
          <Stat>
            <strong>{categories.length - 1}</strong>
            <span>Celebration Types</span>
          </Stat>
          <Stat>
            <strong>2022</strong>
            <span>Est.</span>
          </Stat>
        </StatsRow>

      </Section>

      <section aria-label="Browse gallery by category">
        {isMobile || prefersReducedMotion ? (
          <ShowcaseMobileStack>
            {showcaseItems.map((item, i) => (
              <ShowcasePanel key={`${item.id}-${i}`} $stacked onClick={() => openLightbox(i)}>
                <ShowcaseImage
                  src={item.image}
                  alt={`${item.category} event decor by Preetie Decor`}
                  loading="lazy"
                />
                <ShowcaseOverlay />
                <ShowcaseLabel>{item.category}</ShowcaseLabel>
                <ShowcaseCTA
                  type="button"
                  aria-label={`View ${item.category} photo`}
                  onClick={e => { e.stopPropagation(); openLightbox(i); }}
                >
                  Discover
                </ShowcaseCTA>
              </ShowcasePanel>
            ))}
          </ShowcaseMobileStack>
        ) : (
          <ShowcaseWrapper ref={wrapperRef}>
            <ShowcaseTrack ref={trackRef}>
              {showcaseItems.map((item, i) => (
                <ShowcasePanel key={`${item.id}-${i}`} $stacked={false} onClick={() => openLightbox(i)}>
                  <ShowcaseImageWrap>
                    <ShowcaseImage
                      src={item.image}
                      alt={`${item.category} event decor by Preetie Decor`}
                      loading="lazy"
                    />
                    <ShowcaseOverlay />
                    <ShowcaseLabel>{item.category}</ShowcaseLabel>
                    <ShowcaseCTA
                      type="button"
                      aria-label={`View ${item.category} photo`}
                      onClick={e => { e.stopPropagation(); openLightbox(i); }}
                    >
                      Discover
                    </ShowcaseCTA>
                  </ShowcaseImageWrap>
                  <ShowcaseGutter />
                </ShowcasePanel>
              ))}
            </ShowcaseTrack>
          </ShowcaseWrapper>
        )}
      </section>

      <StorySection>
        <StoryParagraph ref={storyRef}>
          {storyWords.map((word, i) => (
            <StoryWord key={i}>
              {word}
              {i < storyWords.length - 1 ? ' ' : ''}
            </StoryWord>
          ))}
        </StoryParagraph>
      </StorySection>

      <LightboxOverlay $open={activeItem !== null} onClick={close}>
        {activeItem && (
          <>
            <CloseButton onClick={close} aria-label="Close">
              <X size={24} />
            </CloseButton>
            <PrevButton onClick={e => { e.stopPropagation(); showPrev(); }} aria-label="Previous image">
              <ChevronLeft size={28} />
            </PrevButton>
            <div onClick={e => e.stopPropagation()} style={{ position: 'relative' }}>
              <LightboxImage src={activeItem.image} alt={activeItem.title} />
              <LightboxCaption>
                <h3>{activeItem.title}</h3>
                <p>{activeItem.location} · {activeItem.date}</p>
              </LightboxCaption>
            </div>
            <NextButton onClick={e => { e.stopPropagation(); showNext(); }} aria-label="Next image">
              <ChevronRight size={28} />
            </NextButton>
          </>
        )}
      </LightboxOverlay>
    </>
  );
};

export default GalleryPage;
