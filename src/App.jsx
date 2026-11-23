import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import "./App.css";

function App() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("portfolio_lang") || "ES";
  });

  useEffect(() => {
    localStorage.setItem("portfolio_lang", lang);
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);

  return (
    <div className="min-h-screen bg-[#080E1E] text-slate-100">
      <Navbar lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <Skills lang={lang} />
        <About lang={lang} />
        <Experience lang={lang} />
        <Projects lang={lang} />
      </main>
      <Contact lang={lang} />
    </div>
  );
}

export default App;