import { profile, socials } from "../data/profile";

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-2">
          Contact
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
          Let's connect
        </h2>
        <p className="text-white/60 mt-4 max-w-lg mx-auto leading-relaxed">
          I'm always happy to talk about tech, collaborate on projects, or
          discuss new opportunities. Feel free to reach out through any of
          the platforms below.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {socials.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target={name !== "Email" ? "_blank" : undefined}
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 hover:border-violet-400/50 hover:bg-violet-500/10 transition-colors px-5 py-3 text-white/70 hover:text-white"
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{name}</span>
            </a>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-white/30 text-sm">
          © {new Date().getFullYear()} {profile.name}. Built with React &amp;
          Tailwind CSS.
        </div>
      </div>
    </section>
  );
}
