import type { Contacts } from '../lib/content';
import Section from './Section';
import Todo from './Todo';
import './Contact.css';

interface Props {
  contacts: Contacts;
  user: string;
}

/** `./contact`: closing line, copyable mail command, and the other channels. */
export default function Contact({ contacts, user }: Props) {
  const { email } = contacts;
  return (
    <Section id="contact" user={user} command="./contact" title={contacts.title}>
      <div className="contact">
        <p className="contact__closing">
          {contacts.closing ?? <Todo>closing text missing in content/contacts.md</Todo>}
        </p>

        {email ? (
          <div className="cmdbox">
            <a className="cmdbox__cmd" href={email.href}>
              <span className="cmdbox__sigil" aria-hidden="true">
                $ mail{' '}
              </span>
              <span className="cmdbox__email">{email.value}</span>
              <span className="cursor" aria-hidden="true" />
            </a>
            {/* Revealed by the page script only when the Clipboard API is available. */}
            <button type="button" className="cmdbox__copy" data-copy={email.value} aria-label="copy email" hidden>
              copy
            </button>
            <span className="visually-hidden" aria-live="polite" data-copy-status />
          </div>
        ) : (
          <Todo>email missing in content/contacts.md</Todo>
        )}

        {contacts.links.length > 0 && (
          <ul role="list" className="socials">
            {contacts.links.map((link) => (
              <li key={link.label}>
                <a className="social" href={link.href}>
                  <span className="social__arrow" aria-hidden="true">
                    -&gt;
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
