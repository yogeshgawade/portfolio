import { Link } from 'react-router-dom';
import type { Project } from '../types';
import { ext, Tags } from './ui';

export default function ProjectCard({ project: p }: { project: Project }) {
  const to = `/projects/${p.slug}`;
  return (
    <article className="card project">
      <div className="project-main">
        <h3>
          {/* The title link is stretched over the whole card via CSS. */}
          <Link className="card-link" to={to}>
            {p.title}
          </Link>
        </h3>
        <p className="muted">{p.description}</p>
        <Tags items={p.tags} label="Architecture tags" />
        <div className="actions card-actions">
          <Link className="btn btn-sm" to={to}>
            View case study<span className="sr-only">: {p.title}</span>
          </Link>
          <a className="btn btn-sm btn-ghost" href={p.githubUrl} {...ext}>
            GitHub<span className="sr-only"> repository for {p.title}</span>
          </a>
          {p.liveUrl && (
            <a className="btn btn-sm btn-ghost" href={p.liveUrl} {...ext}>
              Live demo<span className="sr-only"> of {p.title}</span>
            </a>
          )}
        </div>
      </div>
      <div className="project-side">
        <ul className="list">
          {p.highlights.slice(0, 4).map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <Tags items={p.technologies} label="Technologies" />
      </div>
    </article>
  );
}
