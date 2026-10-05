import { aboutFacts, aboutParagraphs } from '../data/content';
import { Section } from './ui';

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="about">
        <div>
          {aboutParagraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className="facts">
          {aboutFacts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
