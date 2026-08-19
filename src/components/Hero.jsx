import { ArrowDown } from "lucide-react";
import { profile, socials } from "../data/profile";

export default function Hero() {
  const quickSocials = socials.filter((s) =>
    ["GitHub", "LinkedIn", "Email"].includes(s.name)
  );

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 text-sm text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Open to opportunities
          </p>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Hi, I'm {profile.name}
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-white/60 font-display">
            {profile.role} at{" "}
            <span className="text-white">BINUS University</span>
          </p>
          <p className="mt-6 text-white/60 max-w-xl leading-relaxed">
            {profile.bio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-violet-500 hover:bg-violet-400 transition-colors text-white font-medium px-6 py-3"
            >
              View my projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 hover:border-white/30 hover:bg-white/5 transition-colors text-white font-medium px-6 py-3"
            >
              Contact me
            </a>
          </div>

          <div className="mt-10 flex items-center gap-5">
            {quickSocials.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                target={name !== "Email" ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={name}
                className="text-white/50 hover:text-white transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:flex justify-center animate-fade-up">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-violet-500/40 to-cyan-400/30 blur-2xl" />
            <div className="relative w-64 h-64 lg:w-72 lg:h-72 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center border border-white/10 shadow-2xl overflow-hidden">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-display text-6xl font-bold text-white/90">
                  {profile.avatarInitials}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors animate-bounce"
      >
        <ArrowDown size={22} />
      </a>
    </section>
  );
}
