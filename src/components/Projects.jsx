import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Folder } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects } from "../data/profile";
import useInView from "../hooks/useInView";
import { revealClass, revealStyle } from "../utils/reveal";

export default function Projects() {
  const [sectionRef, inView] = useInView();
  const scrollerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);

    const card = el.children[0];
    if (card) {
      const step = card.offsetWidth + 24;
      setActiveIndex(Math.round(el.scrollLeft / step));
    }
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollByCard = (direction) => {
    const el = scrollerRef.current;
    const card = el?.children[0];
    if (!el || !card) return;
    const step = card.offsetWidth + 24;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const scrollToIndex = (index) => {
    const el = scrollerRef.current;
    const card = el?.children[index];
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <section id="projects" ref={sectionRef} className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          className={`mb-14 flex items-end justify-between gap-4 ${revealClass(inView)}`}
          style={revealStyle(inView)}
        >
          <div>
            <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-2">
              Projects
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Things I've built
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollLeft}
              aria-label="Previous project"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollRight}
              aria-label="Next project"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth pb-4"
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`shrink-0 snap-start w-[78vw] sm:w-80 lg:w-[22rem] ${revealClass(inView)}`}
              style={revealStyle(inView, index * 90)}
            >
              <div className="group relative flex flex-col h-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 hover:border-violet-500/30 transition-colors duration-300">
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
            </div>
          ))}
        </div>

        <div
          className={`mt-8 flex items-center justify-center gap-2 ${revealClass(inView)}`}
          style={revealStyle(inView, projects.length * 90)}
        >
          {projects.map((project, index) => (
            <button
              key={project.title}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to ${project.title}`}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-6 bg-violet-400"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
