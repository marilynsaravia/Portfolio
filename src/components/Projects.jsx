import { useEffect, useRef, useState } from "react";
import projects from "../data/projects.json";
import { getImageProjects } from "../utils";

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const [isActive, setIsActive] = useState(false);
  const speed = 0.15;

  // --- RAF controlled by isActive (RAF = requestAnimationFrame ) --- 
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let rafId;

    const tick = () => {
      if (isActive) {
        el.scrollLeft += speed;
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll) {
          el.scrollLeft = maxScroll;
          setIsActive(false);
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isActive, speed]);

  // --- hover on the entire section ---
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

  // --- pause when switching tabs ---
  useEffect(() => {
    const handler = () => {
      if (document.hidden) setIsActive(false);
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  // --- drag (mouse/touch) on the track ---
  const drag = useRef({ active: false, startX: 0, startLeft: 0, id: null });

  const onPointerDown = (e) => {
    const el = trackRef.current;
    if (!el) return;

    // ⛔ If the click starts on a link or button, do NOT activat drag
    const target = e.target;
    if (target.closest("a, button")) return;

    drag.current = {
      active: true,
      startX: e.clientX ?? (e.touches?.[0]?.clientX || 0),
      startLeft: el.scrollLeft,
      id: e.pointerId ?? null,
    };
    el.setPointerCapture?.(e.pointerId);
    setIsActive(false);
  };

  const onPointerMove = (e) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const x = e.clientX ?? (e.touches?.[0]?.clientX || 0);
    const dx = x - drag.current.startX;
    el.scrollLeft = drag.current.startLeft - dx;

    const half = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft < 0) el.scrollLeft = half + el.scrollLeft;
    if (el.scrollLeft >= half) el.scrollLeft = 0 + (el.scrollLeft + half);
  };

  const endDrag = () => {
    const el = trackRef.current;
    if (!el) return;
    drag.current.active = false;
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full py-12 overflow-hidden mb-16"
    >
      <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-800 mb-16 tracking-wide">
        Projects
      </h2>

      <div className="w-full">
        <div
          ref={trackRef}
          className="flex flex-nowrap gap-4 md:gap-6 px-4 md:px-6 overflow-hidden select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={endDrag}
        >
          {projects.map((p, i) => (
            <article
              key={`${p.title}-${i}`}
              className="
                inline-block
                w-[350px] sm:w-[520px] md:w-[520px] lg:w-[522px]
                flex-shrink-0
                overflow-hidden
                bg-white text-[#111827]
                rounded-xl
              "
            >
              <div className="relative w-full h-[293px] bg-[#111111] flex items-center justify-center overflow-hidden rounded-xl">
                <img
                  src={getImageProjects(p.imageSrc)}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  alt={p.title}
                  className="object-contain"
                />
              </div>

              <div className="py-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-[15px] md:text-base font-semibold text-gray-700">
                    {p.title}
                  </p>
                  <div className="flex gap-2">
                    <a
                      href={p.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 text-[16px] border border-gray-400 text-gray-700 rounded-md hover:bg-black hover:text-white transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 text-[16px] bg-black text-white rounded-md hover:bg-gray-900 transition-colors"
                    >
                      Demo
                    </a>
                  </div>
                </div>

                <div className="text-[14px] flex flex-wrap gap-1 pt-2 text-gray-600">
                  {p.skills?.map((tech, k) => (
                    <span key={k}>
                      {tech}
                      {k < p.skills.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
