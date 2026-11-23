import { useMemo, useState } from "react";
import projects from "../data/projects.json";
import { getImageProjects } from "../utils/images";
import { pickLang } from "../utils/languages";

export default function Projects({ lang = "ES" }) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const labels = {
    ES: {
      index: "04 // PROYECTOS",
      heading: "Proyectos",
      catalogTitle: "SYS.LIB :: CATÁLOGO",
      subtitle: "Maquetas en preparación mientras rehago los proyectos.",
      allFilter: "TODOS",
      featuredTag: "DESTACADO",
      projectCodePrefix: "PROYECTO",
      wireframeBadge: "MAQUETA // EN_REDISEÑO",
      codeBtn: "CÓDIGO ↗",
      demoBtn: "[ VER_DEMO ] ↗",
      repoBtn: "[ REPO ] ↗",
    },
    EN: {
      index: "04 // PROJECTS",
      heading: "Projects",
      catalogTitle: "SYS.LIB :: CATALOG",
      subtitle: "Wireframe slots while projects are being rebuilt.",
      allFilter: "ALL",
      featuredTag: "FEATURED",
      projectCodePrefix: "PROJECT",
      wireframeBadge: "WIREFRAME // IN_REWORK",
      codeBtn: "CODE ↗",
      demoBtn: "[ LIVE_DEMO ] ↗",
      repoBtn: "[ REPO ] ↗",
    },
  };

  const t = labels[lang] || labels.ES;

  const isSlotDraft = (project) => {
    const titleStr = String(pickLang(project.title, lang) || "");
    return Boolean(project.draft) || titleStr.toLowerCase().startsWith("slot-");
  };

  // Extrae categorías únicas desde el JSON si existen
  const categories = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => {
      if (Array.isArray(p.categories)) {
        p.categories.forEach((c) => {
          const val = pickLang(c, lang);
          if (val) set.add(String(val).toUpperCase());
        });
      } else if (p.category) {
        const val = pickLang(p.category, lang);
        if (val) set.add(String(val).toUpperCase());
      }
    });
    return ["ALL", ...Array.from(set)];
  }, [lang]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "ALL") return projects;
    return projects.filter((p) => {
      if (Array.isArray(p.categories)) {
        return p.categories.some(
          (c) => String(pickLang(c, lang)).toUpperCase() === selectedCategory
        );
      }
      if (p.category) {
        return String(pickLang(p.category, lang)).toUpperCase() === selectedCategory;
      }
      return false;
    });
  }, [selectedCategory, lang]);

  const [featuredProject, ...otherProjects] = filteredProjects;

  const formatIndex = (num) => String(num).padStart(2, "0");

  const renderWireframePreview = () => (
    <div className="w-full h-full p-5 flex flex-col justify-between bg-[#080E1E]/90 border border-dashed border-slate-700/80 m-3">
      <div className="flex items-center justify-between font-mono text-[10px] text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-sky-400/50 inline-block" />
          <span className="h-2 w-16 bg-slate-800 inline-block" />
        </div>
        <span>[ WIREFRAME ]</span>
      </div>

      <div className="space-y-2.5 my-auto">
        <div className="h-2.5 w-2/3 bg-slate-800" />
        <div className="h-2 w-1/2 bg-slate-800/70" />
        <div className="h-2 w-4/5 bg-slate-800/50" />
      </div>

      <div className="flex items-center justify-between font-mono text-[10px] text-sky-400/80">
        <span>{t.wireframeBadge}</span>
        <span>0%</span>
      </div>
    </div>
  );

  return (
    <section
      id="projects"
      className="w-full py-20 bg-[#080E1E] text-slate-100 border-b border-slate-800/90"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Cabecera */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800/90 pb-5">
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

        {/* Subcabecera SYS.LIB :: CATÁLOGO */}
        <div className="mb-6 flex items-center gap-3">
          <span className="w-1 h-5 bg-sky-400 inline-block" />
          <h3 className="font-mono text-sm sm:text-base tracking-wider text-white">
            {t.catalogTitle}
          </h3>
        </div>

        {/* Barra contador */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count =
                cat === "ALL"
                  ? projects.length
                  : projects.filter((p) => {
                      if (Array.isArray(p.categories)) {
                        return p.categories.some(
                          (c) => String(pickLang(c, lang)).toUpperCase() === cat
                        );
                      }
                      return (
                        String(pickLang(p.category, lang) || "").toUpperCase() ===
                        cat
                      );
                    }).length;

              const displayLabel = cat === "ALL" ? t.allFilter : cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 font-mono text-xs tracking-wider transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-sky-400 text-slate-950 font-semibold"
                      : "border border-slate-800 bg-slate-900/50 text-slate-300 hover:border-sky-400/60 hover:text-sky-400"
                  }`}
                >
                  [{" "}
                  <span>
                    {displayLabel} · {formatIndex(count)}
                  </span>{" "}
                  ]
                </button>
              );
            })}
          </div>

          <span className="font-mono text-xs tracking-wider text-slate-400">
            SHOW:{" "}
            <span className="text-sky-400">
              {formatIndex(filteredProjects.length)}
            </span>{" "}
            / {formatIndex(projects.length)}
          </span>
        </div>

        {/* Card destacada (estilo 01 con ancho completo) */}
        {featuredProject && (() => {
          const isDraft = isSlotDraft(featuredProject);
          const titleText = pickLang(featuredProject.title, lang);
          const descriptionText = pickLang(featuredProject.description, lang);
          const levelText = pickLang(featuredProject.level, lang);

          return (
            <article className="mb-8 border border-dashed border-slate-700/90 bg-[#0A1124] hover:border-sky-400/50 transition-colors grid grid-cols-1 lg:grid-cols-12">
              {/* Maqueta izquierda */}
              <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-slate-800 bg-[#070C1A] min-h-[260px] sm:min-h-[340px] flex items-center justify-center overflow-hidden">
                {isDraft ? (
                  renderWireframePreview()
                ) : featuredProject.imageSrc ? (
                  <img
                    src={getImageProjects(featuredProject.imageSrc)}
                    alt={titleText}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="font-mono text-xs text-slate-500">
                    NO_PREVIEW_IMAGE
                  </span>
                )}
              </div>

              {/* Información derecha */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  {/* Etiqueta superior */}
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 py-1 bg-sky-400 text-slate-950 font-semibold tracking-wider">
                      ■ {isDraft ? t.wireframeBadge : t.featuredTag}
                    </span>
                    <span className="text-sky-400 tracking-wider">
                      {t.projectCodePrefix}_01
                      {levelText ? ` // ${levelText}` : ""}
                    </span>
                  </div>

                  {/* Título */}
                  <h4 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white leading-tight">
                    {titleText}
                  </h4>

                  {/* Descripción */}
                  {descriptionText && (
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {descriptionText}
                    </p>
                  )}

                  {/* Stack */}
                  {featuredProject.skills && featuredProject.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {featuredProject.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 border border-slate-800 bg-[#080E1E] font-mono text-[11px] uppercase tracking-wider text-slate-300"
                        >
                          {pickLang(skill, lang)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Acciones (ocultas mientras están en modo maqueta) */}
                {!isDraft && (featuredProject.demo || featuredProject.source) && (
                  <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
                    {featuredProject.demo && (
                      <a
                        href={featuredProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-sky-400 text-slate-950 font-mono text-xs font-semibold tracking-wider hover:bg-sky-300 transition-colors"
                      >
                        {t.demoBtn}
                      </a>
                    )}

                    {featuredProject.source && (
                      <a
                        href={featuredProject.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 border border-slate-700 bg-[#080E1E] text-slate-200 font-mono text-xs tracking-wider hover:border-sky-400/70 hover:text-sky-400 transition-colors"
                      >
                        {t.repoBtn}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })()}

        {/* Cuadrícula de proyectos restantes (estilo 02, 03, 04...) */}
        {otherProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((p, idx) => {
              const cardNumber = formatIndex(idx + 2);
              const isDraft = isSlotDraft(p);
              const titleText = pickLang(p.title, lang);
              const descriptionText = pickLang(p.description, lang);
              const categoryText = p.category
                ? pickLang(p.category, lang)
                : Array.isArray(p.categories)
                ? p.categories.map((c) => pickLang(c, lang)).join(" · ")
                : t.wireframeBadge;

              return (
                <article
                  key={`${titleText}-${idx}`}
                  className="border border-dashed border-slate-700/90 bg-[#0A1124] hover:border-sky-400/60 transition-colors flex flex-col justify-between"
                >
                  <div>
                    {/* Cabecera enumerada de la card */}
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/50 font-mono text-xs">
                      <span className="text-sky-400 font-semibold">
                        {cardNumber}
                      </span>
                      <span className="text-slate-400 text-[11px] uppercase truncate max-w-[220px]">
                        {categoryText}
                      </span>
                    </div>

                    {/* maqueta */}
                    <div className="w-full h-48 border-b border-slate-800 bg-[#070C1A] overflow-hidden flex items-center justify-center">
                      {isDraft ? (
                        renderWireframePreview()
                      ) : p.imageSrc ? (
                        <img
                          src={getImageProjects(p.imageSrc)}
                          alt={titleText}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <span className="font-mono text-xs text-slate-500">
                          NO_PREVIEW_IMAGE
                        </span>
                      )}
                    </div>

                    {/* Contenido */}
                    <div className="p-5 space-y-3">
                      <h4 className="text-lg font-bold uppercase tracking-tight text-white leading-snug">
                        {titleText}
                      </h4>

                      {descriptionText && (
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                          {descriptionText}
                        </p>
                      )}

                      {p.skills && p.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {p.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 border border-slate-800 bg-[#080E1E] font-mono text-[10px] uppercase tracking-wider text-slate-300"
                            >
                              {pickLang(skill, lang)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pie de tarjeta con enlaces (ocultos mientras está en modo maqueta) */}
                  {!isDraft && (p.source || p.demo) && (
                    <div className="px-5 py-3.5 border-t border-slate-800/80 flex items-center justify-between gap-2 font-mono text-xs">
                      {p.source ? (
                        <a
                          href={p.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-300 hover:text-sky-400 transition-colors"
                        >
                          {t.codeBtn}
                        </a>
                      ) : (
                        <span />
                      )}

                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-sky-400 text-slate-950 font-semibold tracking-wider hover:bg-sky-300 transition-colors"
                        >
                          {t.demoBtn}
                        </a>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}