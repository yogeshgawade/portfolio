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
