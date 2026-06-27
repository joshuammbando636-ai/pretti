import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import Layout from './components/Layout/Layout'
import WhatsAppButton from './components/WhatsAppButton'
import { theme } from './styles/theme'

const HomePage = lazy(() => import('./components/Home/HomePage'))
const AboutPage = lazy(() => import('./components/About/AboutPage'))
const EventsPage = lazy(() => import('./components/Events/EventsPage'))
const GalleryPage = lazy(() => import('./components/Gallery/GalleryPage'))
const ContactPage = lazy(() => import('./components/Contact/ContactPage'))
const BlogPage = lazy(() => import('./components/Blog/BlogPage'))
const BlogPost = lazy(() => import('./components/Blog/BlogPost'))

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: ${theme.fonts.body};
    line-height: 1.6;
    background-color: ${theme.colors.light};
    color: ${theme.colors.dark};
    overflow-x: hidden;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Focus styles for accessibility */
  :focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  /* Responsive typography */
  @media (max-width: ${theme.breakpoints.tablet}) {
    html {
      font-size: 14px;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    html {
      font-size: 12px;
    }
  }
`

function App() {
  // Your WhatsApp number - make sure to use international format without '+'
  const whatsappNumber = '255672715657'; // +255 672 715 657
  const whatsappMessage = "Hello! I'm interested in your decoration services.";

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogPost />} />
            </Route>
          </Routes>
        </Suspense>
        {/* WhatsApp Button appears on all pages */}
        <WhatsAppButton
          phoneNumber={whatsappNumber}
          message={whatsappMessage}
        />
      </BrowserRouter>
    </>
  )
}

export default App