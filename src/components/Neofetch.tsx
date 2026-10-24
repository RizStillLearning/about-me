import type { Bio } from '../lib/content';
import Prompt from './Prompt';
import Todo from './Todo';
import './Neofetch.css';

interface Props {
  bio: Bio;
  user: string;
}

const SWATCHES = 8;

/** `neofetch`: photo beside a key/value block of skills and GPA. */
export default function Neofetch({ bio, user }: Props) {
  const title = `${user}@portfolio`;
  return (
    <div className="neofetch">
      <Prompt user={user} command="neofetch" />
      <div className="neofetch__panel">
        <figure className="neofetch__photo">
          {bio.photo ? (
            <div className="neofetch__frame">
              <img
                src={bio.photo.src}
                alt={bio.photo.alt ?? 'TODO: add photo alt text in content/bio.md'}
                width={1200}
                height={1600}
                decoding="async"
              />
            </div>
          ) : (
            <Todo>photo missing, add "- Files:" under "## Photo" in content/bio.md</Todo>
          )}
          {bio.photo && !bio.photo.alt && (
            <figcaption>
              <Todo>photo alt text missing, add "- Alt:" under "## Photo" in content/bio.md</Todo>
            </figcaption>
          )}
        </figure>

        <div className="neofetch__info">
          <p className="neofetch__title" aria-hidden="true">
            <span className="neofetch__user">{user}</span>@portfolio
          </p>
          <p className="neofetch__rule" aria-hidden="true">
            {'-'.repeat(title.length)}
          </p>
          <dl className="neofetch__list">
            <div className="neofetch__row">
              <dt>Skills</dt>
              <dd>
                {bio.skills.length ? (
                  <ul role="list" className="checks">
                    {bio.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                ) : (
                  <Todo>skills missing in content/bio.md</Todo>
                )}
              </dd>
            </div>
            <div className="neofetch__row">
              <dt>{bio.gpa?.key ?? 'GPA'}</dt>
              <dd className="neofetch__value">{bio.gpa?.value ?? <Todo>GPA missing in content/bio.md</Todo>}</dd>
            </div>
          </dl>
          <div className="neofetch__swatches" aria-hidden="true">
            {Array.from({ length: SWATCHES }, (_, i) => (
              <span key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
