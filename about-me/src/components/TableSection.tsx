import type { TableData } from '../lib/content';
import Section from './Section';
import Todo from './Todo';
import './TableSection.css';

interface Props {
  id: string;
  /** Content file name, shown in the `cat` prompt and in the empty-state TODO. */
  file: string;
  table: TableData;
  user: string;
}

function slug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

/**
 * `cat <file>`: a section whose content is one real table (Organizations, Competitions).
 * Explicit ARIA roles keep table semantics when the small-screen layout restyles rows
 * as stacked blocks, which only happens for tables with more than two columns.
 */
export default function TableSection({ id, file, table, user }: Props) {
  const { headers, rows } = table;
  const stack = headers.length > 2;
  return (
    <Section id={id} user={user} command={`cat ${file}`} title={table.title}>
      {rows.length ? (
        <div className={`data-table${stack ? ' data-table--stack' : ''}`}>
          <table className="data-table__table" role="table" aria-labelledby={`${id}-title`}>
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
                    const className = `data-table__cell data-table__cell--${slug(label)}`;
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
        <Todo>no table rows found in content/{file}</Todo>
      )}
    </Section>
  );
}
