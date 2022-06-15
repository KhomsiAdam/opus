import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './App/store';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { ProjectProvider } from '@/context/ProjectProvider';
import App from './App';
import './main.css';
import 'flowbite';
import Toast from './shared/components/Toast';

const rootElement = document.getElementById('App');
const root = createRoot(rootElement as Element);

root.render(
  // <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <ProjectProvider>
          <Toast />
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </ProjectProvider>
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
  // </StrictMode>,
);
