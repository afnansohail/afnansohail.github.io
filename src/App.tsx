import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
      </main>
      <Contact />
    </div>
  );
}
