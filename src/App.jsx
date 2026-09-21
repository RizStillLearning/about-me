import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Organizations from "./components/Organizations";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import GlobalBackground from "./components/GlobalBackground";

function App() {
  return (
    <div className="relative isolate overflow-hidden bg-[#05060a] min-h-screen">
      <GlobalBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Organizations />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
