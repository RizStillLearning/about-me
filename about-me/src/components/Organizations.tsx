import type { Organizations as OrganizationsData } from '../lib/content';
import Section from './Section';
import Todo from './Todo';
import './Organizations.css';

interface Props {
  organizations: OrganizationsData;
  user: string;
}

function slug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

/**
 * `cat organizations.md`: a real table. Explicit ARIA roles keep table semantics
 * when the small-screen layout restyles rows as stacked blocks.
 */
export default function Organizations({ organizations, user }: Props) {
  const { headers, rows } = organizations;
  return (
    <Section id="organizations" user={user} command="cat organizations.md" title={organizations.title}>
      {rows.length ? (
        <div className="org">
          <table className="org__table" role="table" aria-labelledby="organizations-title">
            <thead role="rowgroup">
              <tr role="row">
                {headers.map((header) => (
                  <th key={header} scope="col" role="columnheader">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody role="rowgroup">
              {rows.map((row) => (
                <tr key={row.join('|')} role="row">
                  {row.map((cell, i) => {
                    const label = headers[i] ?? '';
                    const className = `org__cell org__cell--${slug(label)}`;
                    return i === 0 ? (
                      <th key={i} scope="row" role="rowheader" className={className}>
                        {cell}
                      </th>
                    ) : (
                      <td key={i} role="cell" className={className} data-label={label}>
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Todo>no organizations found in content/organizations.md</Todo>
      )}
    </Section>
  );
}
