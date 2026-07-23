import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import ClickSpark from "./components/react-bits/ClickSpark";
import { useLenis } from "./hooks/useLenis";
import { useMagneticFields } from "./hooks/useMagnetic";

export default function App() {
  useLenis();
  useMagneticFields();

  return (
    <ClickSpark
      sparkColor="#f2f207"
      sparkCount={10}
      sparkRadius={18}
      duration={420}
    >
      <div className="relative min-h-screen">
        <Loader />
        <CustomCursor />
        <ScrollProgress />
        <Header />
        <div className="flex flex-col" style={{ minHeight: "100svh" }}>
          <Hero />
        </div>
        <main>
          <Skills />
          <Experience />
          <Projects />
        </main>
        <Contact />
      </div>
    </ClickSpark>
  );
}
