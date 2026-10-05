import { experience } from '../data/content';
import { Section, T, Tags } from './ui';

export default function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      intro="TODO: replace the placeholder roles in src/data/content.ts with your real experience."
    >
      <ol className="timeline">
        {experience.map((r, i) => (
          <li key={i}>
            <article>
              <h3>
                <T>{r.role}</T>
              </h3>
              <p className="muted">
                <T>{r.company}</T>
                {' · '}
                <T>{r.dates}</T>
              </p>
              <ul className="list">
                {r.bullets.map((b) => (
                  <li key={b}>
                    <T>{b}</T>
                  </li>
                ))}
              </ul>
              <Tags items={r.tech} label={`Technologies used at ${r.company}`} />
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
