import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Folder } from "lucide-react";
import { projects } from "../data/profile";
import useInView from "../hooks/useInView";
import { revealClass, revealStyle } from "../utils/reveal";

// Gap between cards in px — must match the `gap-6` class on the scroller.
const GAP = 24;

// The carousel loops: cards are rendered three times (prev / main / next
// copies) and the scroller starts on the main copy. Whenever a scroll settles
// inside one of the clone copies, we jump by one full copy width back into the
// main copy. All copies are identical, so the jump is invisible.
const COPIES = 3;
const MAIN = 1;
const loopedProjects = Array.from({ length: COPIES }, (_, copy) =>
  projects.map((project, index) => ({ project, index, copy }))
).flat();

// Scroll instantly, bypassing the container's CSS `scroll-behavior: smooth`.
function jumpTo(el, left) {
  const previous = el.style.scrollBehavior;
  el.style.scrollBehavior = "auto";
  el.scrollLeft = left;
  el.style.scrollBehavior = previous;
}

export default function Projects() {
  const [sectionRef, inView] = useInView();
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getStep = () => {
    const card = scrollerRef.current?.children[0];
    return card ? card.offsetWidth + GAP : 0;
  };

  const updateActiveIndex = () => {
    const el = scrollerRef.current;
    const step = getStep();
    if (!el || !step) return;
    setActiveIndex(Math.round(el.scrollLeft / step) % projects.length);
  };

  // Called once scrolling has come to rest: pull the position back into the
  // main copy if we've wandered into a clone, and round onto a snap point in
  // case the scroller was clamped at its physical end.
  const normalizeScroll = () => {
    const el = scrollerRef.current;
    const step = getStep();
    if (!el || !step) return;
    const copyWidth = step * projects.length;
    let left = Math.round(el.scrollLeft / step) * step;
    if (left < copyWidth * MAIN) left += copyWidth;
    else if (left >= copyWidth * (MAIN + 1)) left -= copyWidth;
    if (Math.abs(left - el.scrollLeft) > 1) jumpTo(el, left);
  };

  // Start on the main copy before first paint so the clones are never seen.
  useLayoutEffect(() => {
    const el = scrollerRef.current;
    const step = getStep();
    if (el && step) jumpTo(el, step * projects.length * MAIN);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // Prefer the native `scrollend` event; fall back to a debounce where it
    // isn't supported (older Safari).
    const supportsScrollEnd = "onscrollend" in window;
    let timer;
    const onScroll = () => {
      updateActiveIndex();
      if (!supportsScrollEnd) {
        clearTimeout(timer);
        timer = setTimeout(normalizeScroll, 150);
      }
    };
    const onResize = () => {
      normalizeScroll();
      updateActiveIndex();
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    if (supportsScrollEnd) el.addEventListener("scrollend", normalizeScroll);
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      el.removeEventListener("scroll", onScroll);
      if (supportsScrollEnd) el.removeEventListener("scrollend", normalizeScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollByCard = (direction) => {
    const el = scrollerRef.current;
    const step = getStep();
    if (!el || !step) return;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const scrollToIndex = (index) => {
    const el = scrollerRef.current;
    const step = getStep();
    if (!el || !step) return;
    // Scroll to whichever copy of the card is nearest, so wrapping from the
    // last dot to the first moves one card forward rather than four back.
    const current = el.scrollLeft / step;
    const candidates = Array.from(
      { length: COPIES },
      (_, copy) => index + copy * projects.length
    );
    const target = candidates.reduce((best, candidate) =>
      Math.abs(candidate - current) < Math.abs(best - current) ? candidate : best
    );
    el.scrollTo({ left: target * step, behavior: "smooth" });
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
              aria-label="Previous project"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next project"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth pb-4"
        >
          {loopedProjects.map(({ project, index, copy }) => {
            const Icon = project.icon ?? Folder;
            const isClone = copy !== MAIN;
            return (
              <div
                key={`${copy}-${project.title}`}
                aria-hidden={isClone || undefined}
                className={`shrink-0 snap-start w-[78vw] sm:w-80 lg:w-[22rem] ${revealClass(inView)}`}
                style={revealStyle(inView, index * 90)}
              >
                <div className="group relative flex flex-col h-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 hover:border-violet-500/30 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
                      <Icon size={20} className="text-violet-300" />
                    </div>
                    <div className="flex items-center gap-3 text-white/40">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          tabIndex={isClone ? -1 : undefined}
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
            );
          })}
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
