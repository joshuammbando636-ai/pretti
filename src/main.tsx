import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement?.hasChildNodes()) {
  // For prerendered content (Google sees this)
  hydrateRoot(rootElement, <App />);
} else {
  // For normal client-side rendering
  createRoot(rootElement!).render(<App />);
}