import type { Project } from '../lib/content';
import Tag from './Tag';
import Todo from './Todo';
import './ProjectCard.css';

interface Props {
  project: Project;
  id: string;
}

/** URL without the protocol, with break opportunities after each slash. */
function displayUrl(url: string) {
  const parts = url.replace(/^https?:\/\/(www\.)?/, '').split('/');
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && (
        <>
          /<wbr />
        </>
      )}
    </span>
  ));
}

/** One `ls -la` entry. The repo link stretches over the whole card. */
export default function ProjectCard({ project, id }: Props) {
  const iconClass = `project__icon${project.icon?.recolor ? ' project__icon--recolor' : ''}`;
  const { image } = project;
  return (
    <article className={`project${image ? ' project--with-shot' : ''}`} aria-labelledby={id}>
      {project.icon ? (
        <div className={iconClass} dangerouslySetInnerHTML={{ __html: project.icon.svg }} />
      ) : (
        <div className="project__icon project__icon--missing">
          <Todo>icon</Todo>
        </div>
      )}

      <header className="project__head">
        <div className="project__title-row">
          <h3 id={id} className="project__name">
            {project.name}
            <span className="project__slash" aria-hidden="true">
              /
            </span>
          </h3>
          <p className="project__meta">
            {project.year ?? <Todo>year</Todo>}
            <span className="project__perm" aria-hidden="true">
              drwxr-xr-x
            </span>
          </p>
        </div>
        {project.tagline && <p className="project__tagline">{project.tagline}</p>}
      </header>

      {image && (
        <div className="project__shot">
          {image.src ? (
            <div className="project__frame">
              <img
                src={image.src}
                alt={image.alt ?? 'TODO: add screenshot alt text in content/projects.md'}
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : (
            <Todo>image not found: {image.ref}</Todo>
          )}
          {image.src && !image.alt && (
            <Todo>screenshot alt text missing, add "- Alt:" under this project in content/projects.md</Todo>
          )}
        </div>
      )}

      <div className="project__body">
        <p className="project__desc">{project.description ?? <Todo>description missing in content/projects.md</Todo>}</p>
        {project.frameworks.length > 0 && (
          <dl className="project__stack">
            <dt>Frameworks</dt>
            <dd>{project.frameworks.join(', ')}</dd>
          </dl>
        )}
        <div className="project__foot">
          {project.tags.length > 0 && (
            <ul role="list" className="project__tags" aria-label="Tags">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>
          )}
          {project.link ? (
            <a className="project__link" href={project.link}>
              <span className="project__arrow" aria-hidden="true">
                -&gt;
              </span>
              <span className="project__url">{displayUrl(project.link)}</span>
            </a>
          ) : (
            <Todo>link missing in content/projects.md</Todo>
          )}
        </div>
      </div>
    </article>
  );
}
