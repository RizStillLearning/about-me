const stops = [
  // Hero
  "circle at 15% 6%, rgba(139,92,246,0.5), transparent 30%",
  "circle at 85% 4%, rgba(232,121,249,0.4), transparent 30%",
  "circle at 50% 16%, rgba(34,211,238,0.35), transparent 28%",
  // About
  "circle at 8% 36%, rgba(16,185,129,0.42), transparent 28%",
  "circle at 92% 42%, rgba(56,189,248,0.38), transparent 28%",
  "circle at 45% 48%, rgba(251,191,36,0.3), transparent 26%",
  // Projects
  "circle at 5% 60%, rgba(232,121,249,0.42), transparent 28%",
  "circle at 95% 66%, rgba(59,130,246,0.38), transparent 28%",
  "circle at 50% 74%, rgba(249,115,22,0.32), transparent 26%",
  // Contact
  "circle at 18% 86%, rgba(244,63,94,0.4), transparent 28%",
  "circle at 88% 92%, rgba(167,139,250,0.38), transparent 28%",
  "circle at 35% 100%, rgba(251,191,36,0.28), transparent 26%",
];

export default function GlobalBackground() {
  const backgroundImage = stops.map((s) => `radial-gradient(${s})`).join(", ");

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <div className="absolute inset-0" style={{ backgroundImage }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:32px_32px]" />
    </div>
  );
}
