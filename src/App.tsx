import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { useReveal, useTheme } from './hooks';

// Case-study pages are code-split; they load only when opened.
const ProjectPage = lazy(() => import('./pages/ProjectPage'));

export default function App() {
  const { theme, toggle } = useTheme();
  const { pathname, hash, key } = useLocation();
  const navType = useNavigationType();

  useReveal(pathname);

  // Scroll to the requested section (/#skills), or to the top on a new page.
  // Back/forward (POP) keeps the browser's own scroll restoration.
  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) target.scrollIntoView();
    else if (navType !== 'POP') window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash, key, navType]);

  return (
    <>
      <a
        className="skip"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main-content')?.focus();
        }}
      >
        Skip to content
      </a>
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<p className="container loading">Loading…</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Navigate to="/#projects" replace />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
