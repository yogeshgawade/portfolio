import { principles } from '../data/content';
import { Section } from './ui';

export default function EngineeringApproach() {
  return (
    <Section id="approach" title="Engineering approach" intro="The defaults I start from when designing and building systems.">
      <div className="principles">
        {principles.map((p) => (
          <div className="principle" key={p.title}>
            <h3>{p.title}</h3>
            <p className="muted">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
