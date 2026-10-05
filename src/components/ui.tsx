import type { ReactNode } from 'react';

/** Props for links that leave the site. */
export const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

/** Highlights unfinished placeholder text (anything containing "TODO"). */
export function T({ children }: { children: string }) {
  return children.includes('TODO') ? <span className="ph">{children}</span> : <>{children}</>;
}

export function Tags({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className="tags" aria-label={label}>
      {items.map((i) => (
        <li key={i}>
          <T>{i}</T>
        </li>
      ))}
    </ul>
  );
}

export function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="section reveal" aria-labelledby={`${id}-h`}>
      <div className="container">
        <h2 id={`${id}-h`}>{title}</h2>
        {intro && (
          <p className="section-intro">
            <T>{intro}</T>
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
