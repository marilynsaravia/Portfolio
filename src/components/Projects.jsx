import { useRef, useState } from "react";
import projects from "../data/projects.json";
import { getImageProjects } from "../utils";

export default function Projects() {
  const trackRef = useRef(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = useRef({
    startX: 0,
    scrollLeft: 0,
  });

  // --- Manual Drag Logic (Mouse & Touch) ---
  const onPointerDown = (e) => {
    // If the gesture starts on a link or button, do NOT drag
    if (e.target.closest("a, button")) return;

    const el = trackRef.current;
    if (!el) return;

    setIsDragging(true);

    // Save initial click/touch position and current scroll
    dragInfo.current = {
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
    };

    // Disable smooth scroll during drag for instant response
    el.style.scrollBehavior = "auto";
    // Capture pointer to keep tracking even if the mouse leaves the area
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    
    e.preventDefault(); // Prevent accidental page scrolling/selection
    const el = trackRef.current;
    const x = e.pageX - el.offsetLeft;
    
    // Calculate movement distance (multiplied by 1.5 for better sensitivity)
    const walk = (x - dragInfo.current.startX) * 1.5; 
    el.scrollLeft = dragInfo.current.scrollLeft - walk;
  };

  const stopDragging = (e) => {
    setIsDragging(false);
    if (trackRef.current) {
      // Re-enable smooth scroll for keyboard/wheel navigation
      trackRef.current.style.scrollBehavior = "smooth";
      trackRef.current.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <section id="projects" className="w-full pt-12 overflow-hidden">
      {/* CSS to hide the scrollbar while keeping functionality */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-800 mb-16 tracking-wide">
        Projects
      </h2>

      <div className="w-full">
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDragging}
          onPointerLeave={stopDragging}
          onPointerCancel={stopDragging}
          className={`
            flex flex-nowrap gap-4 md:gap-6 px-8 md:px-16
            overflow-x-auto overflow-y-hidden
            no-scrollbar
            ${isDragging ? "cursor-grabbing" : "cursor-grab"}
            select-none touch-pan-y
          `}
          style={{ scrollBehavior: 'smooth' }}
        >
          {projects.map((p, i) => (
            <article
              key={`${p.title}-${i}`}
              className="inline-block w-[320px] sm:w-[500px] flex-shrink-0"
            >
              <div className="relative w-full h-[293px] bg-[#111111] flex items-center justify-center overflow-hidden rounded-xl">
                <img
                  src={getImageProjects(p.imageSrc)}
                  alt={p.title}
                  draggable={false} // Prevent browser default drag on images
                  className="object-contain pointer-events-none"
                />
              </div>

              <div className="py-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-[15px] md:text-base font-semibold text-gray-700">
                    {p.title}
                  </p>
                  <div className="flex gap-2">
                    <a href={p.source} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 text-sm border border-gray-400 rounded-md hover:bg-black hover:text-white transition-colors">GitHub</a>
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 text-sm bg-black text-white rounded-md">Demo</a>
                  </div>
                </div>
                {/* Technical skills used in the project */}
                <div className="text-[14px] text-gray-600">
                  {p.skills?.join(", ")}
                </div>
              </div>
            </article>
          ))}
          
          {/* Final spacer for correct padding at the end of the track */}
          <div className="flex-shrink-0 w-8 md:w-16" />
        </div>
      </div>
    </section>
  );
}