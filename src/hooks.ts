import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export type Theme = 'dark' | 'light';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  );
  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage unavailable: theme still works for this session */
    }
  }, [theme]);

  return { theme, toggle };
}

/** Fades in `.reveal` elements once, when they scroll into view. */
export function useReveal(dep: unknown) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

function setMeta(selector: string, value: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', value);
}

/**
 * Per-page document title and meta description.
 * Returns a ref for the page's <h1> (give it tabIndex={-1}); focus moves there
 * after client-side navigation so keyboard and screen-reader users know the page changed.
 */
export function usePage(title: string, description: string) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { key, hash } = useLocation();

  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
  }, [title, description]);

  useEffect(() => {
    // The first location key is "default": don't steal focus on initial load.
    // When a section hash is present, scrolling to the section takes priority.
    if (key !== 'default' && !hash) ref.current?.focus({ preventScroll: true });
  }, [key, hash]);

  return ref;
}
