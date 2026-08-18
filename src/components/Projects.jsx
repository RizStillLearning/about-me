import { ExternalLink, Folder } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects } from "../data/profile";

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-2">
            Projects
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Things I've built
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 hover:border-violet-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
                  <Folder size={20} className="text-violet-300" />
                </div>
                <div className="flex items-center gap-3 text-white/40">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      className="hover:text-white transition-colors"
                    >
                      <FaGithub size={18} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} live demo`}
                      className="hover:text-white transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="font-display text-lg font-semibold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
