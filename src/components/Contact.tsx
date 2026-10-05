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
