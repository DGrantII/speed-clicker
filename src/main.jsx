/**
 * Application entry point: loads global styles and mounts the React app into #root.
 */
import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// DOM mount node for the React tree
const rootElement = document.getElementById('root');

createRoot(rootElement).render(
    <StrictMode>
        <App />
    </StrictMode>
);
