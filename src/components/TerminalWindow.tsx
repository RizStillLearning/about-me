import type { ReactNode } from 'react';
import './TerminalWindow.css';

export interface NavItem {
  id: string;
  label: string;
}

interface Props {
  user: string;
  nav: NavItem[];
  status: string | null;
  children: ReactNode;
}

/** Fake terminal window that frames the whole page: title bar, nav, and the scrolling session. */
export default function TerminalWindow({ user, nav, status, children }: Props) {
  return (
    <div className="window">
      <header className="window__bar">
        <div className="window__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="window__path" aria-hidden="true">
          <span className="window__user">{user}</span>@portfolio: <span className="window__cwd">~</span>
        </p>
        <nav className="window__nav" aria-label="Sections">
          <ul role="list">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>
                  <span className="window__nav-prefix" aria-hidden="true">
                    ~/
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {status && (
          <p className="window__status">
            <span className="window__status-dot" aria-hidden="true" />
            {status}
          </p>
        )}
      </header>
      <main id="main" className="window__body">
        {children}
      </main>
    </div>
  );
}
