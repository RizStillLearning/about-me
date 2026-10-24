import type { Education as EducationData } from '../lib/content';
import Section from './Section';
import Todo from './Todo';
import './Education.css';

interface Props {
  education: EducationData;
  user: string;
}

/** `cat education.md`: schools as a `tree`-style listing. */
export default function Education({ education, user }: Props) {
  return (
    <Section id="education" user={user} command="cat education.md" title={education.title}>
      {education.schools.length ? (
        <ol role="list" className="tree">
          {education.schools.map((school) => (
            <li key={school.name} className="tree__item">
              <div className="tree__head">
                <h3 className="tree__name">{school.name}</h3>
                <span className="tree__leader" aria-hidden="true" />
                {school.period && <p className="tree__period">{school.period}</p>}
              </div>
              {school.details.length > 0 && (
                <dl className="tree__details">
                  {school.details.map((detail) => (
                    <div key={detail.key + detail.value} className="tree__item tree__detail">
                      {detail.key && <dt>{detail.key}</dt>}
                      <dd>{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <Todo>no schools found in content/education.md</Todo>
      )}
    </Section>
  );
}
