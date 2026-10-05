import { useState } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/content';
import type { Theme } from '../hooks';
import { ext } from './ui';

const links = [
  ['Projects', '/#projects'],
  ['Skills', '/#skills'],
  ['Experience', '/#experience'],
  ['About', '/#about'],
  ['Approach', '/#approach'],
  ['Contact', '/#contact'],
] as const;

export default function Navbar({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const [open, setOpen] = useState(false);
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          {profile.name}
        </Link>
        <nav id="site-nav" aria-label="Primary" className={open ? 'open' : ''}>
          <ul>
            {links.map(([label, to]) => (
              <li key={to}>
                <Link to={to} onClick={() => setOpen(false)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-actions">
          <button type="button" className="btn btn-sm btn-ghost" onClick={onToggleTheme} aria-label={`Switch to ${next} theme`}>
            {next === 'light' ? 'Light' : 'Dark'}
          </button>
          <a className="btn btn-sm nav-resume" href={profile.resumeUrl} {...ext}>
            Resume
          </a>
          <button
            type="button"
            className="btn btn-sm btn-ghost menu-btn"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((o) => !o)}
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}
