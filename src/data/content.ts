import type { Principle, Project, Role, SkillGroup } from '../types';

/* ------------------------------------------------------------------ */
/* Profile: replace every placeholder value before publishing.         */
/* ------------------------------------------------------------------ */
export const siteTitle = 'Yogesh Gawade | Software Engineer: Full Stack Dev';

export const profile = {
  name: 'Yogesh Gawade',
  title: 'Software Engineer',
  focus: 'Full Stack Development | Backend Systems | Cloud Infrastructure',
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
