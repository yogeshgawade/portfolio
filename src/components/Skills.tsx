import { skillGroups } from '../data/content';
import { Section, Tags } from './ui';

export default function Skills() {
  return (
    <Section id="skills" title="Skills" intro="Grouped by the part of the system they belong to.">
      <div className="skills">
        {skillGroups.map((g) => (
          <div className="skill-group" key={g.title}>
            <h3>{g.title}</h3>
            <Tags items={g.items} label={`${g.title} skills`} />
          </div>
        ))}
      </div>
    </Section>
  );
}
