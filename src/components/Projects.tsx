import { projects } from '../data/content';
import ProjectCard from './ProjectCard';
import { Section } from './ui';

export default function Projects() {
  return (
    <Section
      id="projects"
      title="Featured projects"
      intro="Three projects covering microservices, multi-tenant AI systems, and serverless infrastructure. Each has a case study with architecture, decisions, and tradeoffs."
    >
      <div className="project-list">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </Section>
  );
}
