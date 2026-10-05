import { useParams } from 'react-router-dom';
import ProjectDetails from '../components/ProjectDetails';
import { projects } from '../data/content';
import NotFound from './NotFound';

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  return project ? <ProjectDetails project={project} /> : <NotFound />;
}
