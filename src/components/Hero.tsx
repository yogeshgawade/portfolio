import type { RefObject } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/content';
import { ext, Tags } from './ui';

export default function Hero({ headingRef }: { headingRef: RefObject<HTMLHeadingElement> }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <h1 id="hero-title" ref={headingRef} tabIndex={-1}>
          {profile.name}
        </h1>
        <p className="hero-role">{profile.title}</p>
        <p className="hero-focus">{profile.focus}</p>
        <p className="lead">{profile.intro}</p>
        <div className="actions">
          <Link className="btn" to="/#projects">
            View Projects
          </Link>
          <a className="btn btn-ghost" href={profile.githubUrl} {...ext}>
            GitHub
          </a>
          <a className="btn btn-ghost" href={profile.linkedinUrl} {...ext}>
            LinkedIn
          </a>
          <a className="btn btn-ghost" href={profile.resumeUrl} {...ext}>
            Resume
          </a>
        </div>
        <Tags items={profile.heroStack} label="Primary technologies" />
      </div>
    </section>
  );
}
