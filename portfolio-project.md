# Yogesh Gawade: Developer Portfolio (React + TypeScript + Vite)

Dark-first, data-driven portfolio. Runtime dependencies: `react`, `react-dom`, and `react-router-dom` (real URL paths). No UI kit, no web fonts, no images.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview
```

Create every file below at the path shown in its heading. Put your resume at `public/resume.pdf`.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home: hero, projects, skills, experience, about, approach, contact |
| `/#projects`, `/#skills`, ... | Home sections (nav links work from any page) |
| `/projects/:slug` | Case study, lazy-loaded (`ecommerce-platform`, `ai-helpdesk-saas`, `serverless-url-shortener`) |
| `/projects` | Redirects to `/#projects` |
| anything else | 404 page |

Each page sets its own `<title>` and meta description, moves focus to its heading on navigation, and scrolls to the top or to the requested section.

## File tree

```
portfolio/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
├── public/
│   ├── favicon.svg
│   ├── _redirects              <- Netlify SPA fallback
│   └── resume.pdf              <- add your own file
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── hooks.ts
    ├── types.ts
    ├── styles.css
    ├── data/content.ts         <- all editable content lives here
    ├── pages/
    │   ├── Home.tsx
    │   ├── ProjectPage.tsx      (lazy-loaded)
    │   └── NotFound.tsx
    └── components/
        ├── ui.tsx
        ├── Navbar.tsx
        ├── Hero.tsx
        ├── Projects.tsx
        ├── ProjectCard.tsx
        ├── ProjectDetails.tsx
        ├── Skills.tsx
        ├── Experience.tsx
        ├── About.tsx
        ├── EngineeringApproach.tsx
        ├── Contact.tsx
        └── Footer.tsx
```

## Replace these placeholders (search for `TODO` and `YOUR-`)

| Where | What |
| --- | --- |
| `src/data/content.ts` → `profile` | email, GitHub URL, LinkedIn URL |
| `src/data/content.ts` → `projects` | `githubUrl`, `liveUrl`, `status`, AWS and CI/CD details |
| `src/data/content.ts` → `experience` | companies, roles, dates, bullets, technologies |
| `public/resume.pdf` | your resume |
| `index.html` | `og:url` and `og:image` once deployed |

Anything containing `TODO` renders with a dashed amber underline so unfinished text is easy to spot. Project architecture, decisions, challenges, and tradeoffs are drafted from the stack and highlights you described. Review them against your repos and edit anything that does not match what you built.

---

## Config files

### `package.json`

```json
{
  "name": "portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "typescript": "^5.6.3",
    "vite": "^5.4.10"
  }
}
```

### `vite.config.ts`

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base '/' is required for real URL paths such as /projects/ecommerce-platform.
// Deploying under a sub-path? Change it here; the router reads it as its basename.
export default defineConfig({
  base: '/',
  plugins: [react()],
});
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "types": ["vite/client"]
  },
  "include": ["src", "vite.config.ts"]
}
```

### `.gitignore`

```
node_modules
dist
.DS_Store
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Yogesh Gawade | Software Engineer: Backend, Full Stack, AWS</title>
    <meta
      name="description"
      content="Software engineer building backend systems, cloud infrastructure, and full-stack applications with Java, Spring Boot, React, and AWS."
    />
    <meta name="theme-color" content="#0f151b" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="Yogesh Gawade | Software Engineer" />
    <meta
      property="og:description"
      content="Backend systems, cloud infrastructure, and full-stack applications with Java, Spring Boot, React, and AWS."
    />
    <!-- TODO: add og:url and og:image after deployment -->
    <meta name="twitter:card" content="summary" />

    <script>
      // Set theme before first paint to avoid a flash. Dark is the default.
      (function () {
        var d = document.documentElement;
        var t = 'dark';
        d.classList.add('js');
        try { t = localStorage.getItem('theme') || 'dark'; } catch (e) {}
        d.dataset.theme = t;
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### `public/favicon.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#0f151b"/><text x="16" y="21.5" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#5cc8b8">YG</text></svg>
```

### `public/_redirects`

```
/*    /index.html   200
```

---

## Source

### `src/main.tsx`

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

### `src/types.ts`

```ts
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
```

### `src/hooks.ts`

```ts
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export type Theme = 'dark' | 'light';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  );
  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage unavailable: theme still works for this session */
    }
  }, [theme]);

  return { theme, toggle };
}

/** Fades in `.reveal` elements once, when they scroll into view. */
export function useReveal(dep: unknown) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

function setMeta(selector: string, value: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', value);
}

/**
 * Per-page document title and meta description.
 * Returns a ref for the page's <h1> (give it tabIndex={-1}); focus moves there
 * after client-side navigation so keyboard and screen-reader users know the page changed.
 */
export function usePage(title: string, description: string) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { key, hash } = useLocation();

  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
  }, [title, description]);

  useEffect(() => {
    // The first location key is "default": don't steal focus on initial load.
    // When a section hash is present, scrolling to the section takes priority.
    if (key !== 'default' && !hash) ref.current?.focus({ preventScroll: true });
  }, [key, hash]);

  return ref;
}
```

### `src/App.tsx`

```tsx
import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { useReveal, useTheme } from './hooks';

// Case-study pages are code-split; they load only when opened.
const ProjectPage = lazy(() => import('./pages/ProjectPage'));

export default function App() {
  const { theme, toggle } = useTheme();
  const { pathname, hash, key } = useLocation();
  const navType = useNavigationType();

  useReveal(pathname);

  // Scroll to the requested section (/#skills), or to the top on a new page.
  // Back/forward (POP) keeps the browser's own scroll restoration.
  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) target.scrollIntoView();
    else if (navType !== 'POP') window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash, key, navType]);

  return (
    <>
      <a
        className="skip"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main-content')?.focus();
        }}
      >
        Skip to content
      </a>
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<p className="container loading">Loading…</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Navigate to="/#projects" replace />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
```

### `src/data/content.ts`

```ts
import type { Principle, Project, Role, SkillGroup } from '../types';

/* ------------------------------------------------------------------ */
/* Profile: replace every placeholder value before publishing.         */
/* ------------------------------------------------------------------ */
export const siteTitle = 'Yogesh Gawade | Software Engineer: Backend, Full Stack, AWS';

export const profile = {
  name: 'Yogesh Gawade',
  title: 'Software Engineer',
  focus: 'Backend • Full Stack • AWS',
  intro:
    'Software engineer building backend systems, cloud infrastructure, and full-stack applications with Java, Spring Boot, React, and AWS.',
  email: 'your.email@example.com', // TODO: replace
  githubUrl: 'https://github.com/YOUR-GITHUB-USERNAME', // TODO: replace
  linkedinUrl: 'https://www.linkedin.com/in/YOUR-LINKEDIN-HANDLE', // TODO: replace
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`, // place the file at public/resume.pdf
  heroStack: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'AWS', 'Terraform'],
};

/* ------------------------------------------------------------------ */
/* Projects: cards, case-study pages, and diagrams are all rendered    */
/* from this array. Add an entry and it appears everywhere.            */
/* ------------------------------------------------------------------ */
export const projects: Project[] = [
  {
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description:
      'Production-oriented e-commerce platform built around Spring Boot microservices and event-driven architecture.',
    tags: ['Microservices', 'Event-driven', 'Kafka', 'Infrastructure as code'],
    technologies: [
      'Java 21', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Redis',
      'Elasticsearch/OpenSearch', 'Docker', 'AWS', 'ECS', 'Terraform',
    ],
    highlights: [
      'Microservices communicating over REST and asynchronous Kafka events',
      'Authentication and authorization with Spring Security',
      'Redis caching on read-heavy paths',
      'Database-per-service boundaries on PostgreSQL',
      'Containers deployed to AWS ECS, provisioned with Terraform',
    ],
    githubUrl: 'https://github.com/YOUR-GITHUB-USERNAME/ecommerce-platform', // TODO: replace
    problem:
      'An online store splits into domains that change at different rates: catalog, search, cart, orders, and payments. This project explores how to separate them into independently deployable services while keeping order workflows consistent, and it is explicit about the operational cost that comes with that split.',
    architecture: {
      summary:
        'Clients reach the services through a single entry point. Services handle synchronous requests over REST and publish domain events to Kafka. Consumers react asynchronously to update the search index, caches, and downstream workflows.',
      layers: [
        { label: 'Edge', items: ['Load balancer / API entry point', 'Authentication and authorization (Spring Security)'] },
        { label: 'Services (Spring Boot)', items: ['Catalog', 'Cart', 'Orders', 'Payments', 'Search'] },
        { label: 'Messaging', items: ['Kafka topics for domain events'] },
        { label: 'Data', items: ['PostgreSQL per service', 'Redis cache', 'Elasticsearch / OpenSearch index'] },
        { label: 'Platform', items: ['Docker images', 'AWS ECS', 'Terraform'] },
      ],
    },
    decisions: [
      {
        title: 'Database per service',
        body: "Each service owns its schema, so deployments don't couple through shared tables. Cross-service reads go through APIs or events instead of joins.",
      },
      {
        title: 'Kafka for workflow events',
        body: 'Order lifecycle changes are published as events so search indexing and other consumers can react without blocking the request that caused them.',
      },
      {
        title: 'Redis for read-heavy paths',
        body: 'Data that is read far more often than it changes is cached, with invalidation driven by events rather than only by TTLs.',
      },
    ],
    challenges: [
      'Keeping multi-service workflows consistent without distributed transactions, using event choreography and idempotent consumers.',
      'Handling duplicate and out-of-order events safely.',
      'Keeping the search index in sync with the source of truth.',
    ],
    tradeoffs: [
      'Microservices add network, deployment, and debugging overhead compared with a modular monolith. The split here is driven by clear domain boundaries and by what the project is meant to demonstrate.',
      'Eventual consistency between services means users can briefly see stale data.',
      'Cache invalidation adds a failure mode that has to be monitored.',
    ],
    aws: [
      'ECS for running containerized services',
      'Terraform for networking, services, and data stores',
      'TODO: list the exact AWS services used (for example RDS, ElastiCache, MSK, OpenSearch Service)',
    ],
    cicd: [
      'Build and test each service independently',
      'Build and publish container images',
      'Apply infrastructure changes through Terraform',
      'TODO: name the CI/CD tool and describe your actual pipeline',
    ],
    status: 'TODO: describe the current status (for example in development, deployed, features completed).',
  },
  {
    slug: 'ai-helpdesk-saas',
    title: 'AI Helpdesk SaaS',
    description:
      'Multi-tenant AI-powered helpdesk platform combining traditional backend systems with asynchronous AI processing and RAG.',
    tags: ['Multi-tenancy', 'RAG', 'Async AI', 'pgvector'],
    technologies: [
      'React', 'TypeScript', 'Spring Boot', 'FastAPI', 'PostgreSQL',
      'pgvector', 'Redis Streams', 'S3', 'AWS',
    ],
    highlights: [
      'Tenant isolation enforced in PostgreSQL with Row Level Security',
      'RAG and semantic search over tenant content with pgvector',
      'Asynchronous ticket classification through Redis Streams',
      'Spring Boot core API alongside a separate FastAPI AI service',
      'Documents and attachments stored in S3',
    ],
    githubUrl: 'https://github.com/YOUR-GITHUB-USERNAME/ai-helpdesk', // TODO: replace
    problem:
      'Support teams need ticket management plus AI assistance such as classification and answer suggestions. The design question is how to keep each tenant\'s data strictly isolated while moving slow, variable-latency AI work off the request path.',
    architecture: {
      summary:
        "A React and TypeScript client talks to a Spring Boot API for core ticket workflows. Work that doesn't need to block the user, such as classification and embedding, is queued on Redis Streams and processed by a FastAPI service that writes results back to PostgreSQL.",
      layers: [
        { label: 'Client', items: ['React + TypeScript'] },
        { label: 'Core API', items: ['Spring Boot', 'Tenant-aware authentication'] },
        { label: 'Async', items: ['Redis Streams', 'Consumer workers'] },
        { label: 'AI service', items: ['FastAPI', 'Classification', 'Embeddings and retrieval (RAG)'] },
        { label: 'Data', items: ['PostgreSQL with Row Level Security', 'pgvector', 'S3'] },
      ],
    },
    decisions: [
      {
        title: 'Row Level Security for tenant isolation',
        body: "Isolation is enforced by the database, so a missing filter in application code can't expose another tenant's rows.",
      },
      {
        title: 'pgvector inside PostgreSQL',
        body: 'Keeping embeddings next to relational data avoids running a separate vector store and lets retrieval reuse the same tenant isolation rules.',
      },
      {
        title: 'Synchronous core, asynchronous AI',
        body: "Ticket CRUD stays synchronous. Classification and indexing are asynchronous so users aren't waiting on model latency.",
      },
    ],
    challenges: [
      'Propagating tenant context to every database session so RLS policies apply reliably.',
      'Handling retries and failed jobs in stream consumers without producing duplicate results.',
      'Grounding RAG answers in relevant tenant documents and limiting irrelevant context.',
    ],
    tradeoffs: [
      'Two runtimes (Java and Python) increase deployment surface. Python was chosen for the AI service because its ecosystem is strongest there.',
      'RLS adds query-planning and testing considerations compared with application-level filtering.',
      'Redis Streams is simpler to operate than a full message broker but offers fewer features.',
    ],
    aws: [
      'S3 for document and attachment storage',
      'TODO: list compute, database, and networking services used',
    ],
    cicd: ['TODO: describe build, test, and deploy steps for the Java, Python, and React components'],
    status: 'TODO: describe the current status (for example in development, deployed, features completed).',
  },
  {
    slug: 'serverless-url-shortener',
    title: 'Serverless URL Shortener',
    description:
      'Serverless URL-shortening service demonstrating AWS serverless architecture and infrastructure as code.',
    tags: ['Serverless', 'Terraform', 'IAM', 'CI/CD'],
    technologies: ['AWS Lambda', 'API Gateway', 'S3', 'DynamoDB', 'Terraform', 'CloudFront'],
    highlights: [
      'Lambda functions behind API Gateway',
      'DynamoDB for short-code lookups',
      'CloudFront in front of the API and static assets',
      'Least-privilege IAM roles',
      'Whole stack defined in Terraform, deployed through CI/CD',
    ],
    githubUrl: 'https://github.com/YOUR-GITHUB-USERNAME/url-shortener', // TODO: replace
    liveUrl: 'https://REPLACE-WITH-LIVE-DEMO-URL', // TODO: replace, or delete this line
    problem:
      'A URL shortener is a small, well-understood problem, which makes it a good vehicle for practicing serverless design: pay-per-request compute, managed data stores, and a fully reproducible infrastructure definition.',
    architecture: {
      summary:
        'CloudFront serves the static frontend from S3 and fronts the API. API Gateway routes requests to Lambda functions that create links and resolve redirects, using DynamoDB keyed by short code.',
      layers: [
        { label: 'Edge', items: ['CloudFront', 'S3 static frontend'] },
        { label: 'API', items: ['API Gateway', 'Lambda: create link', 'Lambda: redirect'] },
        { label: 'Data', items: ['DynamoDB'] },
        { label: 'Security', items: ['IAM roles scoped per function'] },
        { label: 'Delivery', items: ['Terraform', 'CI/CD pipeline'] },
      ],
    },
    decisions: [
      {
        title: 'DynamoDB key-value access',
        body: "A redirect is a single lookup by short code, which fits DynamoDB's access model well.",
      },
      {
        title: 'Least-privilege IAM per function',
        body: 'Each Lambda receives only the permissions its job needs, defined next to the code in Terraform.',
      },
      {
        title: 'Terraform for everything',
        body: 'Infrastructure is reviewed, versioned, and reproducible instead of configured by hand in the console.',
      },
    ],
    challenges: [
      'Generating short codes without collisions.',
      'Managing cold starts and redirect latency.',
      'Separating Terraform state and environments safely.',
    ],
    tradeoffs: [
      'Serverless reduces operational work but ties the design to AWS services.',
      'DynamoDB limits ad hoc queries, so analytics would need a separate pipeline.',
      'Lambda cold starts can affect tail latency on redirects.',
    ],
    aws: ['Lambda', 'API Gateway', 'DynamoDB', 'S3 and CloudFront', 'IAM'],
    cicd: [
      'Run checks on every pull request',
      'Terraform plan for review, apply on merge',
      'TODO: name the CI/CD tool and describe your actual pipeline',
    ],
    status: 'TODO: describe the current status (for example deployed, features completed).',
  },
];

export const skillGroups: SkillGroup[] = [
  { title: 'Backend', items: ['Java', 'Spring Boot', 'Spring Security', 'Python', 'FastAPI'] },
  { title: 'Frontend', items: ['React', 'Angular', 'TypeScript', 'JavaScript'] },
  { title: 'Databases & Storage', items: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB', 'S3'] },
  { title: 'Cloud & Infrastructure', items: ['AWS', 'Docker', 'Terraform', 'ECS', 'EC2', 'CloudFront'] },
  {
    title: 'Architecture',
    items: ['REST APIs', 'Microservices', 'Event-driven architecture', 'Async processing', 'Caching', 'RAG', 'System design'],
  },
  { title: 'Testing', items: ['JUnit', 'Integration testing', 'Testcontainers'] },
];

/* Experience: placeholders only. Duplicate an object to add a role. */
export const experience: Role[] = [
  {
    company: 'TODO: Company name',
    role: 'TODO: Job title',
    dates: 'TODO: Mon YYYY – Present',
    bullets: [
      'TODO: Describe a system, service, or feature you owned and what it did.',
      'TODO: Describe a technical decision you made and why. Include only outcomes you can verify.',
      'TODO: Describe how you worked with the team, such as code reviews, on-call, or mentoring.',
    ],
    tech: ['TODO: Technologies used'],
  },
  {
    company: 'TODO: Previous company',
    role: 'TODO: Job title',
    dates: 'TODO: Mon YYYY – Mon YYYY',
    bullets: [
      'TODO: Describe the main system or product you worked on.',
      'TODO: Describe a problem you diagnosed or an improvement you shipped.',
      'TODO: Describe the scope of your responsibility.',
    ],
    tech: ['TODO: Technologies used'],
  },
];

export const aboutParagraphs = [
  "I'm a software engineer with five years of experience across backend and full-stack development. Most of my work centers on Java and Spring Boot services, with React or Angular on the front end and Python where it fits, such as FastAPI services.",
  "I'm interested in the parts of software that show up in production: how services communicate, how data is modeled and isolated, how infrastructure is provisioned on AWS, and how systems behave when something fails.",
  "My projects are built to explore those questions end to end, from API design and messaging to Terraform and deployment. I keep learning by building, reading other people's architectures, and revisiting my own decisions.",
];

export const aboutFacts: [string, string][] = [
  ['Experience', '5 years'],
  ['Focus', 'Backend and full-stack'],
  ['Primary stack', 'Java, Spring Boot, React, AWS'],
  ['Looking for', 'Backend or full-stack roles where system design and production engineering matter'],
];

export const principles: Principle[] = [
  {
    title: 'Start simple',
    body: 'Prefer simple architectures before introducing distributed complexity. A well-structured monolith often beats premature microservices.',
  },
  {
    title: 'Keep slow work off the request path',
    body: "Use asynchronous processing when work doesn't need to block the user.",
  },
  {
    title: 'Treat infrastructure as code',
    body: 'Environments should be reviewed, versioned, and reproducible.',
  },
  {
    title: 'Design for failure',
    body: 'Plan for observability, security, and failure from the start, not after the first incident.',
  },
  {
    title: 'Make boundaries explicit',
    body: 'Clear API contracts, data ownership, and tenant isolation make systems easier to change.',
  },
  {
    title: 'Test against real dependencies',
    body: 'Use integration tests with Testcontainers where mocks would hide real behavior.',
  },
];
```

### `src/pages/Home.tsx`

```tsx
import About from '../components/About';
import Contact from '../components/Contact';
import EngineeringApproach from '../components/EngineeringApproach';
import Experience from '../components/Experience';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import { profile, siteTitle } from '../data/content';
import { usePage } from '../hooks';

export default function Home() {
  const headingRef = usePage(siteTitle, profile.intro);
  return (
    <>
      <Hero headingRef={headingRef} />
      <Projects />
      <Skills />
      <Experience />
      <About />
      <EngineeringApproach />
      <Contact />
    </>
  );
}
```

### `src/pages/ProjectPage.tsx`

```tsx
import { useParams } from 'react-router-dom';
import ProjectDetails from '../components/ProjectDetails';
import { projects } from '../data/content';
import NotFound from './NotFound';

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  return project ? <ProjectDetails project={project} /> : <NotFound />;
}
```

### `src/pages/NotFound.tsx`

```tsx
import { Link } from 'react-router-dom';
import { profile } from '../data/content';
import { usePage } from '../hooks';

export default function NotFound() {
  const headingRef = usePage(`Page not found | ${profile.name}`, 'The page you requested does not exist.');
  return (
    <section className="container notfound">
      <h1 ref={headingRef} tabIndex={-1}>
        Page not found
      </h1>
      <p className="muted">That address doesn't match any page on this site.</p>
      <div className="actions">
        <Link className="btn" to="/">
          Back to home
        </Link>
        <Link className="btn btn-ghost" to="/#projects">
          View projects
        </Link>
      </div>
    </section>
  );
}
```

### `src/components/ui.tsx`

```tsx
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
```

### `src/components/Navbar.tsx`

```tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/content';
import type { Theme } from '../hooks';
import { ext } from './ui';

const links = [
  ['Projects', '/#projects'],
  ['Skills', '/#skills'],
  ['Experience', '/#experience'],
  ['About', '/#about'],
  ['Approach', '/#approach'],
  ['Contact', '/#contact'],
] as const;

export default function Navbar({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const [open, setOpen] = useState(false);
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          {profile.name}
        </Link>
        <nav id="site-nav" aria-label="Primary" className={open ? 'open' : ''}>
          <ul>
            {links.map(([label, to]) => (
              <li key={to}>
                <Link to={to} onClick={() => setOpen(false)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-actions">
          <button type="button" className="btn btn-sm btn-ghost" onClick={onToggleTheme} aria-label={`Switch to ${next} theme`}>
            {next === 'light' ? 'Light' : 'Dark'}
          </button>
          <a className="btn btn-sm nav-resume" href={profile.resumeUrl} {...ext}>
            Resume
          </a>
          <button
            type="button"
            className="btn btn-sm btn-ghost menu-btn"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((o) => !o)}
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}
```

### `src/components/Hero.tsx`

```tsx
import type { RefObject } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/content';
import { ext, Tags } from './ui';

export default function Hero({ headingRef }: { headingRef: RefObject<HTMLHeadingElement> }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <h1 id="hero-title" ref={headingRef} tabIndex={-1}>
          {profile.name}
        </h1>
        <p className="hero-role">{profile.title}</p>
        <p className="hero-focus">{profile.focus}</p>
        <p className="lead">{profile.intro}</p>
        <div className="actions">
          <Link className="btn" to="/#projects">
            View Projects
          </Link>
          <a className="btn btn-ghost" href={profile.githubUrl} {...ext}>
            GitHub
          </a>
          <a className="btn btn-ghost" href={profile.linkedinUrl} {...ext}>
            LinkedIn
          </a>
          <a className="btn btn-ghost" href={profile.resumeUrl} {...ext}>
            Resume
          </a>
        </div>
        <Tags items={profile.heroStack} label="Primary technologies" />
      </div>
    </section>
  );
}
```

### `src/components/Projects.tsx`

```tsx
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
```

### `src/components/ProjectCard.tsx`

```tsx
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
```

### `src/components/ProjectDetails.tsx`

```tsx
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
```

### `src/components/Skills.tsx`

```tsx
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
```

### `src/components/Experience.tsx`

```tsx
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
```

### `src/components/About.tsx`

```tsx
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
```

### `src/components/EngineeringApproach.tsx`

```tsx
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
```

### `src/components/Contact.tsx`

```tsx
import { profile } from '../data/content';
import { ext, Section } from './ui';

export default function Contact() {
  return (
    <Section id="contact" title="Contact" intro="Open to backend and full-stack software engineering roles. The best way to reach me is email.">
      <ul className="contact-list">
        <li>
          <span>Email</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </li>
        <li>
          <span>GitHub</span>
          <a href={profile.githubUrl} {...ext}>
            {profile.githubUrl.replace('https://', '')}
          </a>
        </li>
        <li>
          <span>LinkedIn</span>
          <a href={profile.linkedinUrl} {...ext}>
            {profile.linkedinUrl.replace('https://', '')}
          </a>
        </li>
      </ul>
      <div className="actions">
        <a className="btn" href={profile.resumeUrl} {...ext}>
          Resume
        </a>
      </div>
    </Section>
  );
}
```

### `src/components/Footer.tsx`

```tsx
import { profile } from '../data/content';
import { ext } from './ui';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-name">{profile.name}</p>
          <p className="muted">{profile.title}</p>
        </div>
        <nav aria-label="Footer">
          <ul>
            <li>
              <a href={profile.githubUrl} {...ext}>GitHub</a>
            </li>
            <li>
              <a href={profile.linkedinUrl} {...ext}>LinkedIn</a>
            </li>
            <li>
              <a href={profile.resumeUrl} {...ext}>Resume</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
```

### `src/styles.css`

```css
/* Tokens ------------------------------------------------------------ */
:root {
  --bg: #0f151b;
  --surface: #151d25;
  --surface-2: #1b2530;
  --border: #273442;
  --text: #e8eef3;
  --muted: #9fb0bf;
  --accent: #5cc8b8;
  --accent-ink: #06201c;
  --ph: #f2c14e;
  --sans: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --r: 8px;
  --w: 1080px;
  color-scheme: dark;
}
[data-theme="light"] {
  --bg: #f6f8fa;
  --surface: #ffffff;
  --surface-2: #eef2f5;
  --border: #d5dde5;
  --text: #16212b;
  --muted: #4a5a69;
  --accent: #0b6b5f;
  --accent-ink: #ffffff;
  --ph: #8a5a00;
  color-scheme: light;
}

/* Base -------------------------------------------------------------- */
* { box-sizing: border-box; }
html { scroll-padding-top: 76px; }
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font: 400 1rem/1.65 var(--sans);
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3 { line-height: 1.2; letter-spacing: -0.02em; margin: 0; }
h1 { font-size: clamp(2.4rem, 6vw, 3.6rem); font-weight: 700; }
h2 { font-size: clamp(1.6rem, 3vw, 2rem); font-weight: 650; }
h3 { font-size: 1.15rem; font-weight: 600; }
p { margin: 0 0 1rem; max-width: 68ch; }
a { color: var(--accent); text-underline-offset: 3px; }
a:focus-visible, button:focus-visible, main:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
main:focus { outline: none; }
.muted { color: var(--muted); }
.container { width: min(100% - 2.5rem, var(--w)); margin-inline: auto; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.skip { position: absolute; left: 1rem; top: -4rem; background: var(--accent); color: var(--accent-ink); padding: .6rem 1rem; border-radius: var(--r); z-index: 50; }
.skip:focus { top: 1rem; }
.loading { padding: 4rem 0; color: var(--muted); }
h1:focus, h1:focus-visible { outline: none; }
.notfound { padding: clamp(4rem, 10vw, 7rem) 0; }
.ph { color: var(--ph); border-bottom: 1px dashed var(--ph); }

/* Buttons and tags -------------------------------------------------- */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  min-height: 44px; padding: 0 1.15rem;
  border-radius: var(--r); border: 1px solid var(--accent);
  background: var(--accent); color: var(--accent-ink);
  font: inherit; font-weight: 600; text-decoration: none; cursor: pointer;
  transition: background-color .15s, border-color .15s, color .15s;
}
.btn:hover { filter: brightness(1.08); }
.btn-ghost { background: transparent; color: var(--text); border-color: var(--border); }
.btn-ghost:hover { border-color: var(--accent); filter: none; }
.btn-sm { min-height: 38px; padding: 0 .9rem; font-size: .9rem; }
.actions { display: flex; flex-wrap: wrap; gap: .6rem; margin: 1.5rem 0 0; }

.tags { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: .4rem; }
.tags li { font: .78rem/1 var(--mono); padding: .4rem .55rem; border: 1px solid var(--border); border-radius: 6px; background: var(--surface-2); color: var(--muted); }

.list { margin: 0; padding-left: 1.1rem; display: grid; gap: .5rem; }
.list li::marker { color: var(--accent); }

/* Navigation -------------------------------------------------------- */
.nav {
  position: sticky; top: 0; z-index: 20;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}
.nav-inner { display: flex; align-items: center; justify-content: space-between; gap: 1rem; min-height: 64px; }
.brand { font-weight: 700; color: var(--text); text-decoration: none; }
#site-nav ul { display: flex; gap: 1.4rem; list-style: none; margin: 0; padding: 0; }
#site-nav a { color: var(--muted); text-decoration: none; font-size: .95rem; padding: .5rem 0; }
#site-nav a:hover { color: var(--text); }
.nav-actions { display: flex; gap: .6rem; align-items: center; }
.menu-btn { display: none; }

/* Hero -------------------------------------------------------------- */
.hero { position: relative; isolation: isolate; padding: clamp(4rem, 12vw, 8rem) 0 clamp(3rem, 8vw, 5rem); }
.hero::before {
  content: ""; position: absolute; inset: 0; z-index: -1; opacity: .3;
  background-image:
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 48px 48px;
  -webkit-mask-image: linear-gradient(to bottom, #000 20%, transparent);
  mask-image: linear-gradient(to bottom, #000 20%, transparent);
}
.hero-role { font-size: 1.5rem; font-weight: 600; margin: 1rem 0 .25rem; }
.hero-focus { color: var(--accent); font-weight: 600; margin-bottom: 1.5rem; }
.lead { font-size: 1.125rem; color: var(--muted); max-width: 60ch; }
.hero .tags { margin-top: 2rem; }

/* Sections ---------------------------------------------------------- */
.section { padding: clamp(3.5rem, 8vw, 6rem) 0; }
.section + .section { border-top: 1px solid var(--border); }
.section-intro { color: var(--muted); margin: .75rem 0 2.5rem; }

/* Projects ---------------------------------------------------------- */
.project-list { display: grid; gap: 1.5rem; }
.card {
  position: relative;
  background: var(--surface); border: 1px solid var(--border); border-radius: var(--r);
  padding: 1.75rem; transition: border-color .2s, transform .2s;
}
.card:hover, .card:focus-within { border-color: var(--accent); transform: translateY(-2px); }
.project { display: grid; gap: 1.5rem 2.5rem; }
.project-main { display: flex; flex-direction: column; gap: 1rem; }
.project-main p { margin: 0; }
.project-side { display: flex; flex-direction: column; gap: 1.25rem; }
.card-link { color: var(--text); text-decoration: none; }
.card-link::after { content: ""; position: absolute; inset: 0; border-radius: var(--r); }
.card-actions { position: relative; z-index: 1; margin-top: auto; padding-top: .5rem; }
@media (min-width: 860px) {
  .project { grid-template-columns: 1.1fr 1fr; }
}

/* Case study -------------------------------------------------------- */
.detail { padding: 2.5rem 0 5rem; }
.back { display: inline-block; margin-bottom: 2rem; color: var(--muted); }
.detail-head { padding-bottom: 2rem; }
.detail-head .lead { margin: 1rem 0 1.25rem; }
.block { padding: 2rem 0; border-top: 1px solid var(--border); }
.block h2 { font-size: 1.4rem; margin-bottom: 1rem; }
.decisions { display: grid; gap: 1rem; }
.decision { border-left: 2px solid var(--accent); padding-left: 1rem; }
.decision p { margin: .35rem 0 0; }

.diagram {
  list-style: none; margin: 1.5rem 0 0; padding: 1.25rem;
  display: grid; gap: 1.6rem;
  background: var(--surface); border: 1px dashed var(--border); border-radius: var(--r);
}
.diagram > li { position: relative; display: grid; grid-template-columns: 170px 1fr; gap: 1rem; align-items: center; }
.diagram > li:not(:last-child)::after {
  content: ""; position: absolute; left: .5rem; bottom: -1.3rem; height: 1rem; border-left: 1px solid var(--accent);
}
.layer-label { font-weight: 600; font-size: .9rem; color: var(--accent); }
.diagram ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: .5rem; }
.diagram ul li { padding: .5rem .75rem; border: 1px solid var(--border); border-radius: 6px; background: var(--surface-2); font-size: .9rem; }

/* Skills, experience, about, approach ------------------------------- */
.skills { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 2rem 2.5rem; }
.skill-group { border-top: 2px solid var(--border); padding-top: 1rem; display: grid; gap: .9rem; align-content: start; }

.timeline { list-style: none; margin: 0; padding: 0 0 0 1.5rem; border-left: 1px solid var(--border); display: grid; gap: 2.5rem; }
.timeline > li { position: relative; }
.timeline > li::before { content: ""; position: absolute; left: calc(-1.5rem - 4px); top: .55rem; width: 7px; height: 7px; border-radius: 50%; background: var(--accent); }
.timeline article { display: grid; gap: .9rem; }
.timeline p { margin: 0; }

.about { display: grid; gap: 2.5rem; }
@media (min-width: 860px) { .about { grid-template-columns: 1.4fr 1fr; gap: 4rem; } }
.facts { margin: 0; display: grid; gap: 1rem; align-content: start; }
.facts div { border-top: 1px solid var(--border); padding-top: .75rem; }
.facts dt { color: var(--muted); font-size: .9rem; }
.facts dd { margin: .15rem 0 0; font-weight: 500; }

.principles { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.75rem 2.5rem; }
.principle { border-left: 2px solid var(--border); padding-left: 1rem; }
.principle p { margin: .4rem 0 0; }

/* Contact and footer ------------------------------------------------ */
.contact-list { list-style: none; margin: 0; padding: 0; max-width: 560px; }
.contact-list li { display: flex; gap: 1rem; justify-content: space-between; flex-wrap: wrap; padding: .85rem 0; border-top: 1px solid var(--border); }
.contact-list li:last-child { border-bottom: 1px solid var(--border); }
.contact-list span { color: var(--muted); }
.footer { border-top: 1px solid var(--border); padding: 2.5rem 0; }
.footer-inner { display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: space-between; align-items: flex-start; }
.footer p { margin: 0; }
.footer-name { font-weight: 600; }
.footer ul { list-style: none; margin: 0; padding: 0; display: flex; gap: 1.5rem; }
.footer a { color: var(--muted); }
.footer a:hover { color: var(--text); }

/* Motion: opacity-only section reveal, enabled only when JS runs ----- */
.js .reveal { opacity: 0; transition: opacity .5s ease; }
.js .reveal.in { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .js .reveal { opacity: 1; transition: none; }
  .card, .btn { transition: none; }
  .card:hover, .card:focus-within { transform: none; }
}

/* Responsive -------------------------------------------------------- */
@media (max-width: 860px) {
  .menu-btn { display: inline-flex; }
  #site-nav {
    display: none; position: absolute; top: 64px; left: 0; right: 0;
    background: var(--bg); border-bottom: 1px solid var(--border); padding: .5rem 1.25rem 1rem;
  }
  #site-nav.open { display: block; }
  #site-nav ul { flex-direction: column; gap: 0; }
  #site-nav a { display: block; padding: .75rem 0; }
}
@media (max-width: 640px) {
  .diagram > li { grid-template-columns: 1fr; gap: .5rem; padding-left: 1.25rem; }
  .diagram > li:not(:last-child)::after { left: .5rem; }
  .card { padding: 1.25rem; }
}
@media (max-width: 520px) {
  .nav-resume { display: none; }
  .actions .btn { flex: 1 1 calc(50% - .6rem); }
}
```

---

## Routing and hosting

The site uses real paths (`/` and `/projects/:slug`) through `react-router-dom`. Those paths don't exist as files, so the host must serve `index.html` for unknown paths. Without that, refreshing a case-study URL returns a 404. `npm run dev` and `npm run preview` already handle this.

| Host | Setup |
| --- | --- |
| Netlify | `public/_redirects` (included above) |
| Vercel | add `vercel.json` containing `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }` |
| S3 + CloudFront | custom error responses for 403 and 404 returning `/index.html` with status 200 (Terraform below) |
| GitHub Pages | copy `dist/index.html` to `dist/404.html` after the build; use a user or org site (served from the root) |

```hcl
# Inside aws_cloudfront_distribution
custom_error_response {
  error_code         = 403
  response_code      = 200
  response_page_path = "/index.html"
}

custom_error_response {
  error_code         = 404
  response_code      = 200
  response_page_path = "/index.html"
}
```

Deploying under a sub-path instead of the domain root? Change `base` in `vite.config.ts`. The router and the resume link both read it.

### Known limitation: link previews

This is a client-side app, so the Open Graph tags in `index.html` apply to every URL. Crawlers used by LinkedIn and Slack don't run JavaScript, so a shared project link shows the site-wide preview. Per-project previews would need build-time prerendering.
