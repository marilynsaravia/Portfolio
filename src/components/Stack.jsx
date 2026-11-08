import { useState } from "react";
import { getImageSkills } from "../utils";

const allTechs = [
  { name: "JavaScript", file: "javascript.png", category: "Frontend" },
  { name: "TypeScript", file: "typescript.png", category: "Frontend" },
  { name: "React", file: "react.png", category: "Frontend" },
  { name: "Tailwind CSS", file: "tailwind.png", category: "Frontend" },
  { name: "Bootstrap", file: "bootstrap.png", category: "Frontend" },
  { name: "Figma", file: "figma.png", category: "Design Tools" },
  { name: "Node.js", file: "node.png", category: "Backend" },
  { name: "Php", file: "php.png", category: "Backend" },
  { name: "Git", file: "git.png", category: "Tools" },
  { name: "GitHub", file: "github.png", category: "Tools" },
];

export default function Stack() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allTechs.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allTechs.length) % allTechs.length);
  };

  const activeTech = allTechs[currentIndex];

  return (
    <section id="stack" className="w-full py-28 bg-white text-gray-900 font-manrope overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Título de la sección */}
        <h2 className="text-4xl md:text-5xl font-playfair font-semibold tracking-wide mb-16 text-gray-900">
          Stack
        </h2>

        {/* ── CONTENEDOR DEL EFECTO EN ARCO (ORBIT SLIDER) ── */}
        <div className="relative w-full h-48 md:h-56 flex items-center justify-center my-8">
          {allTechs.map((t, index) => {
            // Calcular la distancia relativa respecto al elemento activo actual
            const total = allTechs.length;
            let offset = (index - currentIndex + total) % total;
            
            // Ajustar para distribuir en un arco simétrico (ej: de -2 a +2 visibles)
            if (offset > total / 2) offset -= total;

            // Ocultar elementos que están muy lejos para mantener el diseño limpio
            if (Math.abs(offset) > 2) return null;

            // Posicionamiento dinámico en abanico/arco
            const translateX = offset * 250; // Espaciado horizontal entre tarjetas
            const translateY = Math.abs(offset) *75; // Curvatura vertical en arco
            const rotate = offset * 10; // Inclinación sutil estilo polaroid
            const scale = offset === 0 ? 1.15 : 1 - Math.abs(offset) * 0.15; // El del centro destaca más
            const opacity = offset === 0 ? 1 : 1 - Math.abs(offset) * 0.35; // Los laterales se desvanecen sutilmente
            const zIndex = 10 - Math.abs(offset);

            return (
              <div
                key={t.name}
                onClick={() => setCurrentIndex(index)}
                style={{
                  transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                  zIndex: zIndex,
                  opacity: opacity,
                }}
                className={`absolute transition-all duration-500 ease-out cursor-pointer p-5 bg-white rounded-2xl border shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center w-24 h-24 md:w-32 md:h-32 ${
                  offset === 0 ? "border-gray-100 shadow-xl" : "border-gray-200/80 hover:border-gray-400"
                }`}
              >
                <img
                  src={getImageSkills(t.file)}
                  alt={t.name}
                  className="w-10 h-10 md:w-12 md:h-12 object-contain pointer-events-none"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>

        {/* ── INFORMACIÓN CENTRAL (Nombre del Stack activo) ── */}
        <div className="mt-8 min-h-[100px] flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest text-teal-600 font-semibold mb-1">
            {activeTech.category}
          </span>
          <h3 className="text-3xl md:text-4xl font-manrope font-bold text-gray-900">
            {activeTech.name}
          </h3>
        </div>

        {/* ── CONTROLES DE NAVEGACIÓN (Flechas y estilo UFV) ── */}
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:border-gray-900 hover:text-black transition-colors shadow-sm"
            aria-label="Anterior"
          >
            ←
          </button>
          
          <div className="px-5 py-2 rounded-xl bg-gray-900 text-white text-xs font-semibold tracking-wider">
            {currentIndex + 1} / {allTechs.length}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:border-gray-900 hover:text-black transition-colors shadow-sm"
            aria-label="Siguiente"
          >
            →
          </button>
        </div>

      </div>
    </section>
  );
}