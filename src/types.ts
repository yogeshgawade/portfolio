export interface Layer {
  label: string;
  items: string[];
}

export interface Decision {
  title: string;
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  tags: string[];
  highlights: string[];
  githubUrl: string;
  liveUrl?: string;
  problem: string;
  architecture: { summary: string; layers: Layer[] };
  decisions: Decision[];
  challenges: string[];
  tradeoffs: string[];
  aws: string[];
  cicd: string[];
  status: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Role {
  company: string;
  role: string;
  dates: string;
  bullets: string[];
  tech: string[];
}

export interface Principle {
  title: string;
  body: string;
}
