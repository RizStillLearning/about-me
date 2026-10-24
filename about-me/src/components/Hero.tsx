import type { ReactNode } from 'react';
import type { Bio } from '../lib/content';
import Prompt from './Prompt';
import Todo from './Todo';
import './Hero.css';

interface Props {
  bio: Bio;
  user: string;
  /** Phrases inside the short bio to pick out in green; ones not found are skipped. */
  highlights: string[];
}

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlight(text: string, phrases: string[]): ReactNode[] {
  const found = phrases.filter((p) => text.includes(p));
  if (!found.length) return [text];
  const pattern = new RegExp(`(${found.map(escapeRegExp).join('|')})`);
  return text
    .split(pattern)
    .map((part, i) => (found.includes(part) ? <span className="hl" key={i}>{part}</span> : part));
}

/** `whoami`: name banner, what Harris is looking for, short bio, and the two jump-to CTAs. */
export default function Hero({ bio, user, highlights }: Props) {
  return (
    <div className="hero">
      <Prompt user={user} command="whoami" />
      <h1 id="bio-name" className="hero__name">
        {bio.name ?? <Todo>name missing in content/bio.md</Todo>}
        <span className="hero__cursor" aria-hidden="true">
          _
        </span>
      </h1>
      <p className="hero__role">
        <span className="hero__caret" aria-hidden="true">
          &gt;{' '}
        </span>
        {bio.lookingFor ?? <Todo>"What I'm looking for" missing in content/bio.md</Todo>}
      </p>
      <p className="hero__intro">
        {bio.shortBio ? highlight(bio.shortBio, highlights) : <Todo>short bio missing in content/bio.md</Todo>}
      </p>
      <div className="hero__actions">
        <a className="btn btn--solid" href="#projects">
          <span aria-hidden="true">$ ls ~/</span>projects<span aria-hidden="true"> -&gt;</span>
        </a>
        <a className="btn btn--ghost" href="#contact">
          <span aria-hidden="true">./</span>contact
        </a>
      </div>
    </div>
  );
}
