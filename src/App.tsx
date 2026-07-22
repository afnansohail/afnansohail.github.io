import { MotionConfig } from "motion/react";
import Header, { HEADER_HEIGHT } from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { DURATION, EASE } from "./lib/motion";

export default function App() {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: DURATION, ease: EASE }}
    >
      <div className="relative min-h-screen">
        <Header />
        <div
          className="flex flex-col"
          style={{ minHeight: `calc(100dvh - ${HEADER_HEIGHT}px)` }}
        >
          <Hero />
        </div>
        <main>
          <Skills />
          <Experience />
          <Projects />
        </main>
        <Contact />
      </div>
    </MotionConfig>
  );
}
