import { Users } from "lucide-react";
import { organizations } from "../data/profile";
import useInView from "../hooks/useInView";
import { revealClass, revealStyle } from "../utils/reveal";

export default function Organizations() {
  const [sectionRef, inView] = useInView();

  return (
    <section id="organizations" ref={sectionRef} className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`mb-14 ${revealClass(inView)}`} style={revealStyle(inView)}>
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-2">
            Organizations
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Communities I'm part of
          </h2>
        </div>

        <div
          className={`rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm ${revealClass(inView)}`}
          style={revealStyle(inView, 100)}
        >
          {/* Table from the sm breakpoint up */}
          <table className="hidden sm:table w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-white/40">
                <th scope="col" className="px-6 py-4 font-medium">
                  Organization
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  Role
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  Experience
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  Period
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {organizations.map((org) => (
                <tr key={org.name} className="hover:bg-white/[0.03] transition-colors align-top">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 w-9 h-9 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
                        <Users size={16} className="text-violet-300" />
                      </div>
                      <span className="font-medium text-white">{org.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/70">{org.role}</td>
                  <td className="px-6 py-4 text-white/50">
                    {org.experiences?.length ? (
                      <ul className="space-y-1">
                        {org.experiences.map((experience) => (
                          <li key={experience}>{experience}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-white/25">&mdash;</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-white/40 whitespace-nowrap">{org.period}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Stacked rows on phones, where the columns don't fit */}
          <ul className="sm:hidden divide-y divide-white/10 text-sm">
            {organizations.map((org) => (
              <li key={org.name} className="flex items-start gap-3 px-4 py-4">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
                  <Users size={16} className="text-violet-300" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-white">{org.name}</p>
                  <p className="text-white/50 text-xs mt-0.5">
                    {org.role} · {org.period}
                  </p>
                  {org.experiences?.length > 0 && (
                    <ul className="mt-2 space-y-1 text-xs text-white/50">
                      {org.experiences.map((experience) => (
                        <li key={experience} className="flex gap-2">
                          <span className="text-violet-400/70">•</span>
                          <span>{experience}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
