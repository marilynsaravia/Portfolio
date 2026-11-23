import { useEffect, useRef, useState } from "react";
import { getImageSkills } from "../utils/images";

const techs = [
  { name: "HTML", file: "html.png" },
  { name: "CSS", file: "css.png" },
  { name: "JavaScript", file: "javascript.png" },
  { name: "TypeScript", file: "typescript.png" },
  { name: "React", file: "react.png" },
  { name: "Tailwind CSS", file: "tailwind.png" },
  { name: "Bootstrap", file: "bootstrap.png" },
  { name: "Node.js", file: "node.png" },
  { name: "Git", file: "git.png" },
  { name: "GitHub", file: "github.png" },
  { name: "Figma", file: "figma.png" },
  { name: "PHP", file: "php.png" },
];

export default function Skills({ lang = "ES" }) {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const dragInfo = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });

  const speed = 0.65;

  const titles = {
    ES: {
      index: "01 // STACK_TÉCNICO",
      heading: "Skills & Tools",
      hint: "ARRASTRA O DESLIZA · BUCLE CONTINUO",
    },
    EN: {
      index: "01 // TECH_STACK",
      heading: "Skills & Tools",
      hint: "DRAG OR SCROLL · CONTINUOUS LOOP",
    },
  };

  const t = titles[lang] || titles.ES;

  // Activa/desactiva cuando la sección es visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsActive(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Bucle infinito suave de borde a borde
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (el.dataset.cloned !== "true") {
      const children = Array.from(el.children);
      children.forEach((child) => el.appendChild(child.cloneNode(true)));
      el.dataset.cloned = "true";
    }

    let rafId;
    const tick = () => {
      if (isActive && !dragInfo.current.isDragging) {
        el.scrollLeft += speed;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isActive, speed]);

  // Pausa/reanuda al pasar el ratón por encima de la cinta
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const enter = () => setIsActive(false);
    const leave = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsActive(inView);
      }
    };

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);

    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  // --- Arrastre manual (Mouse y Touch) ---
  const onPointerDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;

    dragInfo.current = {
      isDragging: true,
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
    };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragInfo.current.isDragging) return;

    const el = scrollRef.current;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragInfo.current.startX) * 1.5;
    el.scrollLeft = dragInfo.current.scrollLeft - walk;

    const half = el.scrollWidth / 2;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    if (el.scrollLeft <= 0) el.scrollLeft += half;
  };

  const stopDragging = (e) => {
    dragInfo.current.isDragging = false;
    if (scrollRef.current && e.pointerId !== undefined) {
      try {
        scrollRef.current.releasePointerCapture(e.pointerId);
      } catch {
        // Ignora si el pointer ya fue liberado
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleWheel = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft += e.deltaY || e.deltaX || 0;
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full py-16 bg-[#080E1E] text-slate-100 border-b border-slate-800/90 overflow-hidden"
    >
      {/* Cabecera */}
      <div className="max-w-7xl mx-auto px-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="font-mono text-xs tracking-widest text-sky-400 block mb-1">
            {t.index}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            {t.heading}
          </h2>
        </div>

        <span className="font-mono text-[11px] tracking-wider text-slate-400">
          {t.hint}
        </span>
      </div>

      {/* Banda infinita */}
      <div className="relative w-full border-y border-slate-800/80 bg-[#0B1328]/70 py-6">
        {/* Difuminado en los extremoss */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#080E1E] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#080E1E] to-transparent z-10" />

        <div
          ref={scrollRef}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          onWheel={handleWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          className="flex flex-nowrap gap-6 md:gap-8 px-6 overflow-hidden select-none cursor-grab active:cursor-grabbing touch-pan-y"
        >
          {techs.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="group inline-flex items-center gap-3.5 px-4 py-3 border border-slate-800 bg-slate-900/70 hover:border-sky-400/60 hover:bg-slate-900 transition-colors flex-shrink-0"
            >
              <div className="w-10 h-10 border border-slate-800 bg-[#080E1E] flex items-center justify-center flex-shrink-0">
                <img
                  src={getImageSkills(tech.file)}
                  alt={tech.name}
                  className="w-6 h-6 object-contain pointer-events-none"
                  loading="lazy"
                  draggable={false}
                />
              </div>

              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-sky-400/80 tracking-wider">
                  {String((i % techs.length) + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs sm:text-sm text-slate-200 group-hover:text-white whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}