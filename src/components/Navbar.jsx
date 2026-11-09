import { useEffect, useState } from "react";
import Logo from '../assets/Navbar/logo.svg';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [lang, setLang] = useState("ES");

  const links = [
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" }
  ];

  // (optional) scroll-spy
  useEffect(() => {
    const sections = ["home", "about", ...links.map(l => l.id)];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0.1, 0.25, 0.5] }
    );
    sections.forEach(id => {
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
    setLang((prev) => (prev === "ES" ? "EN" : "ES"));
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
      {/* Centered container for both modes */}
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <img src={Logo} alt="Logo" className="w-8 h-8" />
        </a>
        {/* Navigate Desktop: Experience -> Projects -> About -> Contact -> ES */}
        <nav className="hidden md:flex items-center space-x-6">
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
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive
                    ? "text-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {l.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-full" />
                )}
              </a>
            );
          })}

          {/* Contact CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("contact");
            }}
            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-black transition-colors shadow-sm"
          >
            Contact
          </a>

          {/* Button language */}
          <button
            onClick={toggleLanguage}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200/60"
            aria-label="Cambiar idioma"
          >
            {lang}
          </button>
        </nav>

        {/* Controls Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold text-gray-700 bg-gray-100 border border-gray-200"
          >
            {lang}
          </button>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-gray-700 hover:text-black transition-colors"
          >
            <span className="text-xl">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Desplegable Mobile */}
      {open && (
        <div className="md:hidden border-b border-gray-100 bg-white/95 backdrop-blur-xl px-6 py-4">
          <ul className="space-y-3">
            {["home", ...links.map((l) => l.id), "contact"].map((id) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(id);
                    }}
                    className={`block py-2 text-base font-medium transition-colors ${
                      isActive ? "text-black font-semibold" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
