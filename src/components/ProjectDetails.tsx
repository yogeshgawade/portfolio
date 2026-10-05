import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/content';
import { usePage, useReveal } from '../hooks';
import type { Project } from '../types';
import { ext, T, Tags } from './ui';

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="block reveal">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list">
      {items.map((i) => (
        <li key={i}>
          <T>{i}</T>
        </li>
      ))}
    </ul>
  );
}

function Links({ p }: { p: Project }) {
  return (
    <div className="actions">
      <a className="btn btn-sm" href={p.githubUrl} {...ext}>
        GitHub<span className="sr-only"> repository</span>
      </a>
      {p.liveUrl && (
        <a className="btn btn-sm btn-ghost" href={p.liveUrl} {...ext}>
          Live demo
        </a>
      )}
    </div>
  );
}

export default function ProjectDetails({ project: p }: { project: Project }) {
  useReveal(p.slug);
  const headingRef = usePage(`${p.title} | ${profile.name}`, p.description);

  return (
    <article className="container detail">
      <Link className="back" to="/#projects">
        Back to projects
      </Link>
      <header className="detail-head">
        <h1 ref={headingRef} tabIndex={-1}>
          {p.title}
        </h1>
        <p className="lead">{p.description}</p>
        <Tags items={p.tags} label="Architecture tags" />
        <Links p={p} />
      </header>

      <Block title="Problem">
        <p>{p.problem}</p>
      </Block>

      <Block title="Architecture">
        <p>{p.architecture.summary}</p>
        <ol className="diagram" aria-label="Architecture layers, from top to bottom">
          {p.architecture.layers.map((layer) => (
            <li key={layer.label}>
              <span className="layer-label">{layer.label}</span>
              <ul>
                {layer.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="Technology stack">
        <Tags items={p.technologies} label="Technologies" />
      </Block>

      <Block title="Key engineering decisions">
        <div className="decisions">
          {p.decisions.map((d) => (
            <div className="decision" key={d.title}>
              <h3>{d.title}</h3>
              <p className="muted">{d.body}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Challenges">
        <List items={p.challenges} />
      </Block>
      <Block title="Tradeoffs">
        <List items={p.tradeoffs} />
      </Block>
      <Block title="AWS infrastructure">
        <List items={p.aws} />
      </Block>
      <Block title="CI/CD">
        <List items={p.cicd} />
      </Block>

      <Block title="Results and current status">
        <p>
          <T>{p.status}</T>
        </p>
      </Block>

      <Block title="GitHub and live demo">
        <Links p={p} />
      </Block>
    </article>
  );
}
