import { useEffect, useState } from "react";

export default function Navbar({ lang = "ES", setLang }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  const navItems = {
    ES: [
      { id: "home", label: "INICIO" },
      { id: "experience", label: "EXPERIENCIA" },
      { id: "projects", label: "PROYECTOS" },
      { id: "about", label: "SOBRE_MÍ" },
      { id: "contact", label: "CONTACTO" },
    ],
    EN: [
      { id: "home", label: "HOME" },
      { id: "experience", label: "EXPERIENCE" },
      { id: "projects", label: "PROJECTS" },
      { id: "about", label: "ABOUT_ME" },
      { id: "contact", label: "CONTACT" },
    ],
  };

  const links = navItems[lang] || navItems.ES;

  useEffect(() => {
    const sections = ["home", "experience", "projects", "about", "contact"];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const handleNavClick = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleLanguage = () => {
    if (typeof setLang === "function") {
      setLang((prev) => (prev === "ES" ? "EN" : "ES"));
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#080E1E]/90 backdrop-blur-md border-b border-slate-800/90 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 flex items-center justify-center border border-sky-400/50 bg-sky-400/10 text-sky-400 font-mono font-bold text-sm group-hover:bg-sky-400 group-hover:text-slate-950 transition-colors">
            M.
          </div>
          {/* Nombre */}
          <span className="text-sm font-semibold tracking-tight text-slate-100 group-hover:text-sky-400 transition-colors">
            Marilyn Saravia
          </span>
        </a>

        {/* Navegación Desktop */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(l.id);
                }}
                className={`px-2.5 py-1.5 font-mono text-xs tracking-wider transition-colors ${
                  isActive
                    ? "text-sky-400 bg-sky-400/10"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                <span className={isActive ? "text-sky-400" : "text-slate-600"}>[ </span>
                {l.label}
                <span className={isActive ? "text-sky-400" : "text-slate-600"}> ]</span>
              </a>
            );
          })}
        </nav>

        {/* LinkedIn */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/marilynsaravia/"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs tracking-wider text-slate-300 hover:text-sky-400 transition-colors flex items-center gap-1"
          >
            LINKEDIN <span className="text-sky-400">↗</span>
          </a>

          <span className="text-slate-800">|</span>
          {/* Idioma */}
          <button
            onClick={toggleLanguage}
            aria-label="Cambiar idioma"
            className="px-2.5 py-1 font-mono text-xs tracking-wider text-sky-400 border border-sky-400/30 bg-sky-400/5 hover:bg-sky-400/15 transition-colors cursor-pointer"
          >
            {lang}
          </button>
        </div>

        {/* Navegación Mobile */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            aria-label="Cambiar idioma"
            className="px-2.5 py-1 font-mono text-xs text-sky-400 border border-sky-400/30 bg-sky-400/5 cursor-pointer"
          >
            {lang}
          </button>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="px-2.5 py-1 font-mono text-xs text-slate-200 border border-slate-700 hover:border-sky-400 transition-colors cursor-pointer"
          >
            {open ? "[ ✕ ]" : "[ ≡ ]"}
          </button>
        </div>
      </div>

      {/* Desplegable Mobile */}
      {open && (
        <div className="lg:hidden border-b border-slate-800 bg-[#080E1E]/95 backdrop-blur-xl px-6 py-4">
          <ul className="space-y-2">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(l.id);
                    }}
                    className={`block py-2 font-mono text-xs tracking-wider transition-colors ${
                      isActive
                        ? "text-sky-400"
                        : "text-slate-400 hover:text-slate-100"
                    }`}
                  >
                    [ {l.label} ]
                  </a>
                </li>
              );
            })}
            <li className="pt-2 border-t border-slate-800/80">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 py-2 font-mono text-xs tracking-wider text-sky-400"
              >
                LINKEDIN ↗
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}