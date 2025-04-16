
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add DOM content loaded event listener to make sure the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    createRoot(rootElement).render(<App />);
  }
});
