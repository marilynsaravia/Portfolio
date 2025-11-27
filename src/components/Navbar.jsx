import { useEffect, useState } from "react";
import Logo from '../assets/Navbar/logo.svg';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  const links = [
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
    { id: "blog", label: "Blog" },
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
      { rootMargin: "-40% 0px -55% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
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

  return (
    <header className="fixed top-4 inset-x-0 z-50">
      {/* Centered container for both modes */}
      <div className="mx-auto max-w-[720px] px-4">
        {/* Desktop: centered pill-style menu */}
        <nav className="hidden md:flex items-center justify-center gap-8 bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm rounded-full px-8 py-3">
          {links.slice(0, 2).map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(l.id); }}
              className={`text-sm font-medium transition-colors ${
                active === l.id ? "text-black" : "text-gray-700 hover:text-black"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a href="#home" className="select-none cursor-pointer">
            <img src={Logo} alt="Marilyn Logo" className="w-9 h-9" />
          </a>
          {links.slice(2).map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(l.id); }}
              className={`text-sm font-medium transition-colors ${
                active === l.id ? "text-black" : "text-gray-700 hover:text-black"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile button (also centered and fixed) */}
        <div className="md:hidden flex justify-center">
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm rounded-full px-5 py-2 text-gray-800 text-base"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile dropdown anchored below the button, not at the bottom */ }
        {open && (
          <div className="md:hidden mt-3">
            <ul className="bg-white/95 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl overflow-hidden">
              {["home", "about", ...links.map(l => l.id)].map((id) => (
                <li key={id} className="border-b last:border-b-0 border-gray-100">
                  <a
                    href={`#${id}`}
                    onClick={(e) => { e.preventDefault(); handleNavClick(id); }}
                    className={`block px-5 py-3 text-sm font-medium transition-colors ${
                      active === id
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
