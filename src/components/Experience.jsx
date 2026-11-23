import { useEffect, useRef, useState } from "react";
import experienceData from "../data/experience.json";
import { getImageExperience } from "../utils/images";
import { pickLang } from "../utils/languages";

const technicalMatrix = [
  "PHP",
  "MYSQL",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "REACT",
  "NEXT.JS",
  "TAILWIND_CSS",
  "HTML5_/_CSS3",
  "BOOTSTRAP_5",
  "GIT_/_GITHUB",
  "CONSUMO_DE_APIS",
  "NODE.JS",
  "FIGMA",
];

export default function ExperienceTimeline({ lang = "ES" }) {
  const sectionRef = useRef(null);
  const sectionTopRef = useRef(0);
  const sectionHeightRef = useRef(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedMatrix, setExpandedMatrix] = useState(false);

  const INITIAL_VISIBLE = 8;
  const hiddenCount = Math.max(0, technicalMatrix.length - INITIAL_VISIBLE);
  const visibleTechs = expandedMatrix
    ? technicalMatrix
    : technicalMatrix.slice(0, INITIAL_VISIBLE);

  const content = {
    ES: {
      index: "03 // CARRERA",
      heading: "Experiencia",
      subtitle: "Experiencia práctica y formación técnica estructurada.",
      leftHeader: "SYS.LOG :: CARRERA_LABORAL",
      rightHeader: "SYS.MAT :: STACK_TÉCNICO",
      expandLabel: `EXPANDIR_MATRIZ // +${hiddenCount}`,
      collapseLabel: "CONTRAER_MATRIZ",
    },
    EN: {
      index: "03 // CAREER",
      heading: "Experience",
      subtitle: "Hands-on experience and structured technical background.",
      leftHeader: "SYS.LOG :: WORK_HISTORY",
      rightHeader: "SYS.MAT :: TECH_STACK",
      expandLabel: `EXPAND_MATRIX // +${hiddenCount}`,
      collapseLabel: "COLLAPSE_MATRIX",
    },
  };

  const t = content[lang] || content.ES;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const updateMetrics = () => {
      const rect = el.getBoundingClientRect();
      sectionTopRef.current = rect.top + window.scrollY;
      sectionHeightRef.current = el.offsetHeight || 1;
    };

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      const raw =
        (scrollPos - sectionTopRef.current) / sectionHeightRef.current;
      const clamped = Math.min(1, Math.max(0, raw));
      setScrollProgress(clamped);
    };

    const handleResize = () => {
      updateMetrics();
      handleScroll();
    };

    updateMetrics();
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const lineHeightPercent = scrollProgress * 100;

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="w-full py-20 bg-[#080E1E] text-slate-100 border-b border-slate-800/90"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Cabecera */}
        <div className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800/90 pb-5">
          <div>
            <span className="font-mono text-xs tracking-widest text-sky-400 block mb-1">
              {t.index}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              {t.heading}
            </h2>
          </div>

          <span className="font-mono text-xs text-slate-400">
            {t.subtitle}
          </span>
        </div>

        {/* Grid principal: Izquierda timeline (8 cols) + Derecha Matrix Viewer (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* COLUMNA IZQUIERDA: SYS.LOG :: CARRERA_LABORAL */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-1 h-5 bg-sky-400 inline-block" />
              <h3 className="font-mono text-sm sm:text-base tracking-wider text-white">
                {t.leftHeader}
              </h3>
            </div>

            <div className="relative pl-8 sm:pl-10">
              {/* Línea vertical base */}
              <span className="pointer-events-none absolute left-[4px] top-1.5 bottom-2 w-px bg-slate-800" />

              {/* Línea vertical de progresso azul */}
              <span
                className="pointer-events-none absolute left-[3.5px] top-1.5 w-[2px] bg-sky-400 transition-all duration-150"
                style={{ height: `calc(${lineHeightPercent}% - 10px)` }}
              />

              <div className="space-y-12">
                {experienceData.map((exp, i) => {
                  const roleText = pickLang(exp.role, lang);
                  const countryText = pickLang(exp.country, lang);
                  const employmentText = pickLang(exp.employmentType, lang);
                  const startDateText = pickLang(exp.startDate, lang);
                  const endDateText = pickLang(exp.endDate, lang);
                  const summaryText = pickLang(exp.summary, lang);

                  return (
                    <article key={exp.id || i} className="relative">
                      {/* Cuadrado azul */}
                      <span className="absolute -left-[32px] sm:-left-[40px] top-1.5 w-2.5 h-2.5 bg-sky-400 block" />

                      {/* Fechas */}
                      <p className="font-mono text-xs tracking-widest text-slate-400 uppercase mb-1">
                        {startDateText} — {endDateText}
                      </p>

                      {/* Rol */}
                      <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        {roleText}
                      </h4>

                      {/* Organización // País // Modalidad */}
                      <div className="mt-1 mb-3 flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm text-sky-400 uppercase tracking-wide">
                        <span>{pickLang(exp.organisation, lang)}</span>
                        {countryText && (
                          <>
                            <span className="text-slate-600">//</span>
                            <span className="inline-flex items-center gap-1.5">
                              {exp.imageSrc && (
                                <img
                                  src={getImageExperience(exp.imageSrc)}
                                  alt={countryText}
                                  className="w-3.5 h-3.5 object-cover border border-slate-700"
                                  loading="lazy"
                                />
                              )}
                              <span>{countryText}</span>
                            </span>
                          </>
                        )}
                        {employmentText && (
                          <span className="text-sky-300/90">
                            ({employmentText})
                          </span>
                        )}
                      </div>

                      {/* Resumen */}
                      {summaryText ? (
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                          {summaryText}
                        </p>
                      ) : (
                        <ul className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-1.5 max-w-2xl">
                          {exp.experiences?.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="font-mono text-xs text-sky-400 mt-1">
                                &gt;
                              </span>
                              <span>{pickLang(item, lang)}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Skills de esa experiencia */}
                      {exp.skills && exp.skills.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {exp.skills.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 border border-slate-800 bg-slate-900/70 font-mono text-[11px] uppercase tracking-wider text-slate-300"
                            >
                              {pickLang(tag, lang)}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: SYS.MAT :: STACK_TÉCNICO */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-1 h-5 bg-blue-500 inline-block" />
              <h3 className="font-mono text-sm sm:text-base tracking-wider text-white">
                {t.rightHeader}
              </h3>
            </div>

            {/* Caja MATRIX_VIEWER */}
            <div className="border border-slate-800 bg-[#0A1124]">
              {/* Barra superior */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/60">
                <span className="font-mono text-[11px] text-slate-400">
                  MATRIX_VIEWER_v2
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-sky-400 inline-block" />
                  <span className="w-2 h-2 bg-blue-500/70 inline-block" />
                  <span className="w-2 h-2 bg-slate-600 inline-block" />
                </div>
              </div>

              {/* Desplegable */}
              {hiddenCount > 0 && (
                <button
                  type="button"
                  onClick={() => setExpandedMatrix((prev) => !prev)}
                  className="w-full px-4 py-3 border-b border-slate-800 bg-slate-900/30 hover:bg-sky-400/10 text-center font-mono text-xs tracking-wider text-slate-200 hover:text-sky-400 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    [{" "}
                    <span className="text-sky-400">
                      {expandedMatrix ? t.collapseLabel : t.expandLabel}
                    </span>{" "}
                    ]
                  </span>
                  <span
                    className={`text-sky-400 transition-transform duration-200 ${
                      expandedMatrix ? "rotate-180" : ""
                    }`}
                  >
                    ⌄
                  </span>
                </button>
              )}

              {/* Lista de tecnologías */}
              <ul className="divide-y divide-slate-800/60">
                {visibleTechs.map((tech) => (
                  <li
                    key={tech}
                    className="px-5 py-3 font-mono text-xs sm:text-sm tracking-wider text-slate-200 hover:bg-sky-400/5 hover:text-sky-400 transition-colors flex items-center justify-between group"
                  >
                    <span>{tech}</span>
                    <span className="text-[10px] text-slate-600 group-hover:text-sky-400 transition-colors">
                      [OK]
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}