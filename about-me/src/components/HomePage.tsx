import type { Site } from '../lib/content';
import Contact from './Contact';
import Education from './Education';
import Hero from './Hero';
import Neofetch from './Neofetch';
import Organizations from './Organizations';
import Projects from './Projects';
import Prompt from './Prompt';
import TerminalWindow from './TerminalWindow';

/** Phrases in the short bio shown in green. Ones not present in content/bio.md are skipped. */
const BIO_HIGHLIGHTS = ['Computer Science student at BINUS University', 'machine learning and AI engineering'];

export default function HomePage({ site }: { site: Site }) {
  const { bio, education, organizations, projects, contacts } = site;
  const user = (bio.name?.split(/\s+/)[0] ?? 'user').toLowerCase();
  const nav = [
    { id: 'education', label: education.title },
    { id: 'organizations', label: organizations.title },
    { id: 'projects', label: projects.title },
    { id: 'contact', label: contacts.title },
  ].map((item) => ({ id: item.id, label: (item.label ?? item.id).toLowerCase() }));

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="page">
        <TerminalWindow user={user} nav={nav} status={bio.status}>
          <section id="bio" aria-labelledby="bio-name">
            <Hero bio={bio} user={user} highlights={BIO_HIGHLIGHTS} />
            <Neofetch bio={bio} user={user} />
          </section>
          <Education education={education} user={user} />
          <Organizations organizations={organizations} user={user} />
          <Projects projects={projects} user={user} />
          <Contact contacts={contacts} user={user} />
          <div className="session-end">
            <Prompt user={user} cursor />
          </div>
        </TerminalWindow>
      </div>
    </>
  );
}
