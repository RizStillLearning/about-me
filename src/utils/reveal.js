// Fade + slide-up transition classes for elements that animate in on scroll,
// paired with the `useInView` hook. See components/About.jsx etc. for usage.
export function revealClass(inView) {
  return `transition-all duration-700 ease-out ${
    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`;
}

export function revealStyle(inView, delay = 0) {
  return { transitionDelay: inView ? `${delay}ms` : "0ms" };
}
