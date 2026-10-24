import type { ReactNode } from 'react';

/** Visible placeholder for copy or assets missing from content/. */
export default function Todo({ children }: { children: ReactNode }) {
  return <span className="todo">TODO: {children}</span>;
}
