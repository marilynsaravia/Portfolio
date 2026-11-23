import emoji from "../assets/Hero/emoji.png";

export default function Hero({ lang = "ES" }) {
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const content = {
    ES: {
      status: "SYS.STATUS: ONLINE // BUSCANDO OPORTUNIDAD FULL STACK JUNIOR",
      greeting: "HOLA, SOY",
      name: "MARILYN SARAVIA",
      role: "DESARROLLADORA FULL STACK JUNIOR // PHP, MySQL, React & C# .NET",
      description:
        "Construyo aplicaciones web completas: desde la base de datos hasta la interfaz. Estudié DAW, profundicé por mi cuenta en frontend con React, TypeScript y Tailwind, y ahora amplío mi stack con C# y .NET en Tajamar (Madrid). Busco mi primera oportunidad como desarrolladora Full Stack.",
      primaryCta: "VER PROYECTOS",
      secondaryCta: "DESCARGAR CV ↗",
      badgeLeft: "STACK // PHP · MySQL · REACT · TYPESCRIPT",
      badgeRight: "ESTILO // LIMPIO & MODULAR",
    },
    EN: {
      status: "SYS.STATUS: ONLINE // SEEKING JUNIOR FULL STACK OPPORTUNITY",
      greeting: "HI, I'M",
      name: "MARILYN SARAVIA",
      role: "JUNIOR FULL STACK DEVELOPER // PHP, MySQL, React & C# .NET",
      description:
        "I build complete web applications, from the database to the interface. I studied Web Application Development (DAW), then deepened my frontend skills on my own with React, TypeScript and Tailwind, and I'm now expanding my stack with C# and .NET at Tajamar (Madrid). I'm looking for my first opportunity as a Full Stack Developer.",
      primaryCta: "VIEW PROJECTS",
      secondaryCta: "DOWNLOAD CV ↗",
      badgeLeft: "STACK // PHP · MySQL · REACT · TYPESCRIPT",
      badgeRight: "STYLE // CLEAN & MODULAR",
    },
  };

  const t = content[lang] || content.ES;

  const stackItems = [
    "C#",
    "ASP.NET Core MVC",
    "SQL Server",
    "ADO.NET",
    "React",
    "Tailwind CSS",
    "JavaScript",
    "Bootstrap",
    "HTML & CSS",
  ];

  return (
    <section
      id="home"
      className="relative w-full bg-[#080E1E] text-slate-100 pt-28 pb-16 border-b border-slate-800/90 overflow-hidden"
    >
      {/* Fondo cuadrícula */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.04)_1px,transparent_1px)]
          bg-[size:32px_32px]
          pointer-events-none
        "
      />

      {/* Glow azul superior */}
      <div
        className="
          absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[220px]
          bg-sky-500/10 blur-3xl rounded-full pointer-events-none
        "
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Bloque principal en 2 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-14">
          {/* Columna izquierda (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Estado */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-sky-400/30 bg-sky-400/5 font-mono text-xs tracking-wider text-sky-400">
              <span className="w-2 h-2 bg-sky-400 inline-block" />
              <span>{t.status}</span>
            </div>

            {/* Título principal */}
            <div className="space-y-2">
              <p className="font-mono text-xs sm:text-sm tracking-widest text-slate-400">
                {t.greeting}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
                {t.name}
              </h1>
              <p className="font-mono text-sm sm:text-base text-sky-400 tracking-wide pt-1">
                {t.role}
              </p>
            </div>

            {/* Descripción */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              {t.description}
            </p>

            {/* Acciones */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, "projects")}
                className="px-6 py-3 bg-sky-400 text-slate-950 font-mono text-xs sm:text-sm font-semibold tracking-wider hover:bg-sky-300 transition-colors cursor-pointer"
              >
                {t.primaryCta}
              </a>

              <a
                href="/Marilyn_Saravia_CV.pdf"
                download
                className="px-6 py-3 border border-slate-700 bg-slate-900/80 text-slate-200 font-mono text-xs sm:text-sm tracking-wider hover:border-sky-400/70 hover:text-sky-400 transition-colors"
              >
                {t.secondaryCta}
              </a>
            </div>
          </div>

          {/* Columna derecha (5 cols): Eemoji */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5 font-mono text-[11px] text-slate-400">
                <span>ID // DEV_PROFILE</span>
                <span className="text-sky-400">2026</span>
              </div>

              <div className="flex items-center justify-center py-4">
                <img
                  src={emoji}
                  alt="Marilyn emoji"
                  className="w-40 h-40 sm:w-48 sm:h-48 object-contain transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="border-t border-slate-800 pt-3 mt-4 flex items-center justify-between font-mono text-[11px] text-slate-400">
                <span>{t.badgeLeft}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}