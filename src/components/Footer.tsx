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
