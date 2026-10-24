import type { ReactNode } from 'react';
import './Tag.css';

/** Rounded-rectangle label used for project tags. */
export default function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}
