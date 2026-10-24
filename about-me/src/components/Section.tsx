import type { ReactNode } from 'react';
import Prompt from './Prompt';
import Todo from './Todo';
import './Section.css';

interface Props {
  id: string;
  user: string;
  command: string;
  /** Heading text from content/; null renders a TODO. */
  title: string | null;
  children: ReactNode;
}

/** A command prompt + h2, the shared frame for every section after the bio. */
export default function Section({ id, user, command, title, children }: Props) {
  const headingId = `${id}-title`;
  return (
    <section id={id} className="section" aria-labelledby={headingId}>
      <Prompt user={user} command={command} />
      <h2 id={headingId} className="section__title">
        <span className="section__hash" aria-hidden="true">
          #{' '}
        </span>
        {title ?? <Todo>section heading missing in content/</Todo>}
      </h2>
      {children}
    </section>
  );
}
