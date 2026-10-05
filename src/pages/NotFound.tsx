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
