import type { Projects as ProjectsData } from '../lib/content';
import ProjectCard from './ProjectCard';
import Section from './Section';
import Todo from './Todo';
import './Projects.css';

interface Props {
  projects: ProjectsData;
  user: string;
}

/** `ls -la ~/projects` */
export default function Projects({ projects, user }: Props) {
  return (
    <Section id="projects" user={user} command="ls -la ~/projects" title={projects.title}>
      {projects.items.length ? (
        <ul role="list" className="projects">
          {projects.items.map((project, i) => (
            <li key={project.name}>
              <ProjectCard project={project} id={`project-${i + 1}`} />
            </li>
          ))}
        </ul>
      ) : (
        <Todo>no projects found in content/projects.md</Todo>
      )}
    </Section>
  );
}
