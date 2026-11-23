import { getImageAbout } from "../utils/images";

const CV_URLS = {
  ES: "TU_ENLACE_DE_GOOGLE_DRIVE_CV_ES",
  EN: "TU_ENLACE_DE_GOOGLE_DRIVE_CV_EN",
};

export default function About({ lang = "ES" }) {
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const content = {
    ES: {
      index: "02 // SOBRE_MÍ",
      heading: "Sobre Mí",
      subtitle: "Enfoque claro, código limpio y aprendizaje constante.",
      idBadge: "ID_01 // DEV_PROFILE",
      roleBadge: "WEB & FULLSTACK_DEV",
      p1Prefix: "Hola, soy ",
      p1Name: "Marilyn Saravia",
      p1Rest:
        ", desarrolladora Full Stack junior. Me gusta convertir ideas en aplicaciones claras, bien estructuradas y fáciles de usar, cuidando tanto la lógica como la experiencia visual.",
      p2:
        "Estudié DAW y después profundicé por mi cuenta en frontend con React, TypeScript y Tailwind CSS. Mi proyecto final, una plataforma de seguimiento docente-alumno con PHP y MySQL, me permitió trabajar con roles, autenticación y una base de datos relacional de varias tablas.",
      p3:
        "Ahora me formo en desarrollo Full Stack con C# y .NET en Tajamar (Madrid) para reforzar el backend, el diseño de bases de datos y la arquitectura de aplicaciones. Busco mi primera oportunidad en un equipo donde aportar y seguir creciendo.",
      stackTitle: "STACK_PRINCIPAL",
      primaryCta: "VER PROYECTOS",
      secondaryCta: "DESCARGAR CV ↗",
    },
    EN: {
      index: "02 // ABOUT_ME",
      heading: "About Me",
      subtitle: "Clear focus, clean code, and continuous learning.",
      idBadge: "ID_01 // DEV_PROFILE",
      roleBadge: "WEB & FULLSTACK_DEV",
      p1Prefix: "Hi, I'm ",
      p1Name: "Marilyn Saravia",
      p1Rest:
        ", a junior Full Stack developer. I like turning ideas into clear, well-structured and easy-to-use applications, caring as much about the logic as about the visual experience.",
      p2:
        "I studied Web Application Development (DAW) and then deepened my frontend skills on my own with React, TypeScript and Tailwind CSS. My final project, a teacher-student tracking platform built with PHP and MySQL, let me work with roles, authentication and a relational database with multiple tables.",
      p3:
        "I'm now training in Full Stack development with C# and .NET at Tajamar (Madrid) to strengthen my backend skills, database design and application architecture. I'm looking for my first opportunity on a team where I can contribute and keep growing.",
      stackTitle: "CORE_STACK",
      primaryCta: "VIEW PROJECTS",
      secondaryCta: "DOWNLOAD CV ↗",
    },
  };

  const normalizedLang = lang === "EN" ? "EN" : "ES";
  const t = content[normalizedLang];
  const cvUrl = CV_URLS[normalizedLang];

  const stackItems = [
    "HTML & CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "PHP",
    "MySQL"
  ];

  return (
    <section
      id="about"
      className="w-full py-20 bg-[#080E1E] text-slate-100 border-b border-slate-800/90"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Cabecera */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800/90 pb-5">
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

        {/* Contenido principal con 12 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Columna izquierda (4 cols): Marco de foto */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="w-full max-w-xs border border-slate-800 bg-slate-900/70 p-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-4 font-mono text-[11px] text-slate-400">
                <span>{t.idBadge}</span>
                <span className="text-sky-400">● ACTIVE</span>
              </div>

              <div className="w-full aspect-square border border-slate-800 bg-[#0B1328] overflow-hidden">
                <img
                  src={getImageAbout("marilyn.png")}
                  alt="Marilyn Saravia"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between font-mono text-[11px] text-sky-400">
                <span>{t.roleBadge}</span>
              </div>
            </div>
          </div>

          {/* Columna derecha (8 cols): Bloque Texto + Stack + Acciones */}
          <div className="lg:col-span-8 border border-slate-800 bg-slate-900/40 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/90 pb-3 font-mono text-xs text-slate-400">
              <span>./bio/marilyn_saravia.md</span>
              <span className="text-sky-400">UTF-8</span>
            </div>

            <div className="space-y-4 text-slate-300 text-base md:text-lg leading-relaxed">
              <p>
                {t.p1Prefix}
                <span className="font-semibold text-white">{t.p1Name}</span>
                {t.p1Rest}
              </p>

              <p className="text-slate-400 text-base leading-relaxed">
                {t.p2}
              </p>

              <p className="text-slate-400 text-base leading-relaxed">
                {t.p3}
              </p>
            </div>

            {/* Stack */}
            <div className="pt-2">
              <h3 className="font-mono text-xs tracking-wider text-sky-400 mb-3">
                {t.stackTitle}
              </h3>

              <div className="flex flex-wrap gap-2">
                {stackItems.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 border border-slate-800 bg-[#080E1E] font-mono text-xs text-slate-200 hover:border-sky-400/60 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Acciones */}
            <div className="pt-4 border-t border-slate-800/90 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, "projects")}
                className="px-6 py-3 bg-sky-400 text-slate-950 font-mono text-xs sm:text-sm font-semibold tracking-wider hover:bg-sky-300 transition-colors cursor-pointer"
              >
                {t.primaryCta}
              </a>

              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-slate-700 bg-[#080E1E] text-slate-200 font-mono text-xs sm:text-sm tracking-wider hover:border-sky-400/70 hover:text-sky-400 transition-colors"
              >
                {t.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}