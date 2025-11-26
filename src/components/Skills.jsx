import { useEffect, useRef, useState } from "react";
import { getImageSkills } from "../utils";

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
  { name: "Php", file: "php.png" },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const speed = 0.6;

  // 🔁 Auto-scroll with a smooth infinite loop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // 1) Clone the children only once so we can create the loop

    if (el.dataset.cloned !== "true") {
      const children = Array.from(el.children);
      children.forEach((child) => el.appendChild(child.cloneNode(true)));
      el.dataset.cloned = "true";
    }

    let rafId;

    const tick = () => {
      if (isActive) {
        el.scrollLeft += speed;

        // 2) The real half of the content (original + clone)
        const half = el.scrollWidth / 2;

        // 3) When we go past the halfway point, we subtract half so it stays sequential.
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isActive, speed]);

  // Activate/Deactivate upon entering/exiting the section
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    const enter = () => setIsActive(true);
    const leave = () => setIsActive(false);

    sec.addEventListener("mouseenter", enter);
    sec.addEventListener("mouseleave", leave);

    return () => {
      sec.removeEventListener("mouseenter", enter);
      sec.removeEventListener("mouseleave", leave);
    };
  }, []);

  // Block arrows if they ever recive focus
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Allow mouse wheeel movemento (without preventDefault)
  const handleWheel = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft += e.deltaY || e.deltaX || 0;
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full py-20 bg-white text-gray-800 overflow-hidden"
    >
      <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-800 tracking-wide mb-16">
        Skills &amp; Tools
      </h2>

      <div
        ref={scrollRef}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        className="flex flex-nowrap gap-16 md:gap-20 px-8 md:px-12 py-2 overflow-hidden select-none cursor-default"
      >
        {techs.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className="inline-flex flex-col items-center justify-center flex-shrink-0"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border border-gray-200 bg-gray-50 shadow-[0_6px_20px_rgba(0,0,0,0.05)] flex items-center justify-center transition-transform duration-300 hover:scale-105">
              <img
                src={getImageSkills(t.file)}
                alt={t.name}
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
                loading="lazy"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
