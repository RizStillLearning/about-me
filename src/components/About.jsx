import { GraduationCap, MapPin } from "lucide-react";
import { profile, education, skills } from "../data/profile";
import useInView from "../hooks/useInView";
import { revealClass, revealStyle } from "../utils/reveal";

export default function About() {
  const [sectionRef, inView] = useInView();

  return (
    <section id="about" ref={sectionRef} className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`mb-14 ${revealClass(inView)}`} style={revealStyle(inView)}>
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-2">
            About Me
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Education &amp; Background
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Bio + location */}
          <div
            className={`md:col-span-2 space-y-6 ${revealClass(inView)}`}
            style={revealStyle(inView, 100)}
          >
            <p className="text-white/60 leading-relaxed">{profile.bio}</p>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <MapPin size={16} className="text-violet-400" />
              {profile.location}
            </div>

            <div>
              <p className="text-sm font-medium text-white/80 mb-3">
                Skills &amp; Tools
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Education timeline */}
          <div className="md:col-span-3 space-y-6">
            {education.map((edu, index) => (
              <div
                key={edu.school}
                className={revealClass(inView)}
                style={revealStyle(inView, 200 + index * 100)}
              >
                <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 sm:p-8 hover:border-violet-500/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
                      <GraduationCap size={22} className="text-violet-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-display text-lg font-semibold text-white">
                          {edu.school}
                        </h3>
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          {edu.status}
                        </span>
                      </div>
                      <p className="text-white/70 mt-1">{edu.degree}</p>
                      <p className="text-white/40 text-sm mt-1">{edu.period}</p>
                      <p className="text-white/50 text-sm mt-3 leading-relaxed">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
