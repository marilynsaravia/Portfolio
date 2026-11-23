import { useState, useEffect, useRef } from "react";
import emoji from "../assets/Contact/emoji.png";

const Contact = ({ lang = "ES" }) => {
  const [copied, setCopied] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);

  const sectionRef = useRef(null);
  const email = "goitiasaraviamarilyn@gmail.com";

  const content = {
    ES: {
      index: "05 // CONTACTO",
      heading: "Contacto",
      subtitle: "Abierta a colaboraciones, proyectos y oportunidades.",
      protocolTag: "[ REQUEST_CONNECTION ]",
      lead: "Disponible para nuevos proyectos, prácticas o colaboraciones en desarrollo web. Escríbeme por correo o conéctate por mis redes.",
      emailLabel: "E_MAIL",
      copyBtn: "COPIAR",
      copiedBtn: "COPIADO ✓",
      sendEmail: "ENVIAR CORREO ↗",
      linksTitle: "ENLACES_DIRECTOS",
      legalTitle: "INFORMACIÓN",
      thanksTitle: "¡Gracias por visitar!",
      thanksSub: "¡Nos vemos pronto!",
      rights: "Todos los derechos reservados.",
    },
    EN: {
      index: "05 // CONTACT",
      heading: "Contact",
      subtitle: "Open to collaborations, projects, and opportunities.",
      protocolTag: "[ REQUEST_CONNECTION ]",
      lead: "Available for new projects, roles, or collaborations in web development. Feel free to email me or reach out via my socials.",
      emailLabel: "E_MAIL",
      copyBtn: "COPY",
      copiedBtn: "COPIED ✓",
      sendEmail: "SEND EMAIL ↗",
      linksTitle: "DIRECT_LINKS",
      legalTitle: "INFORMATION",
      thanksTitle: "Thanks for visiting!",
      thanksSub: "See you soon!",
      rights: "All rights reserved.",
    },
  };

  const t = content[lang] || content.ES;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error copying email:", err);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowAvatar(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const socials = [
    {
      name: "GITHUB",
      href: "https://github.com/marilynsaravia",
      icon: "ri-github-fill",
    },
    {
      name: "LINKEDIN",
      href: "https://linkedin.com/in/marilynsaravia",
      icon: "ri-linkedin-box-fill",
    },
    {
      name: "CODEPEN",
      href: "https://codepen.io/marilynsaravia",
      icon: "ri-codepen-fill",
    },
    {
      name: "WHATSAPP",
      href: "https://wa.me/",
      icon: "ri-whatsapp-line",
    },
  ];

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="w-full bg-[#080E1E] text-slate-100 pt-20 pb-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
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

        {/* Rejilla principal: Contacto (7 cols) + Enlaces (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          {/* Bloque izquierdo: Correo + rrss */}
          <div className="lg:col-span-7 border border-slate-800 bg-[#0A1124] p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-sky-400">
                <span>{t.protocolTag}</span>
                <span className="text-slate-400">STATUS // READY</span>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                {t.lead}
              </p>

              {/* Bloque correo con acciones copiar y enviar */}
              <div className="border border-slate-800 bg-[#080E1E] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="min-w-0">
                  <span className="font-mono text-[11px] text-slate-400 block">
                    {t.emailLabel}
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-sky-400 break-all">
                    {email}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-3.5 py-2 border border-slate-700 bg-slate-900/70 hover:border-sky-400/70 hover:text-sky-400 font-mono text-xs tracking-wider text-slate-200 transition-colors cursor-pointer"
                  >
                    {copied ? t.copiedBtn : t.copyBtn}
                  </button>

                  <a
                    href={`mailto:${email}`}
                    className="px-4 py-2 bg-sky-400 text-slate-950 hover:bg-sky-300 font-mono text-xs font-semibold tracking-wider transition-colors"
                  >
                    {t.sendEmail}
                  </a>
                </div>
              </div>
            </div>

            {/*  RRSS */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
              {socials.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 border border-slate-800 bg-[#080E1E] hover:border-sky-400/60 hover:text-sky-400 font-mono text-xs tracking-wider text-slate-300 transition-colors"
                >
                  <i className={`${item.icon} text-base text-sky-400`} />
                  <span>{item.name}</span>
                  <span className="text-slate-500">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Bloque derecho: Navegación e informacióon */}
          <div className="lg:col-span-5 border border-slate-800 bg-[#0A1124] p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <h3 className="font-mono text-xs tracking-wider text-sky-400 border-b border-slate-800 pb-2">
                {t.linksTitle}
              </h3>
              <a
                href="#home"
                className="font-mono text-xs text-slate-300 hover:text-sky-400 transition-colors"
              >
                [ INICIO ]
              </a>
              <a
                href="#skills"
                className="font-mono text-xs text-slate-300 hover:text-sky-400 transition-colors"
              >
                [ SKILLS ]
              </a>
              <a
                href="#about"
                className="font-mono text-xs text-slate-300 hover:text-sky-400 transition-colors"
              >
                [ SOBRE_MÍ ]
              </a>
              <a
                href="#experience"
                className="font-mono text-xs text-slate-300 hover:text-sky-400 transition-colors"
              >
                [ EXPERIENCIA ]
              </a>
              <a
                href="#projects"
                className="font-mono text-xs text-slate-300 hover:text-sky-400 transition-colors"
              >
                [ PROYECTOS ]
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-mono text-xs tracking-wider text-sky-400 border-b border-slate-800 pb-2">
                {t.legalTitle}
              </h3>
              <a
                href="#privacy"
                className="font-mono text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                PRIVACY_POLICY
              </a>
              <a
                href="#cookies"
                className="font-mono text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                COOKIES
              </a>
              <a
                href="#code"
                className="font-mono text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                CODE_OF_CONDUCT
              </a>
              <a
                href="#legal"
                className="font-mono text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                LEGAL_NOTICE
              </a>
            </div>
          </div>
        </div>

        {/* Pie  */}
        <div className="border-t border-slate-800/90 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-slate-400">
          <span>
            © {new Date().getFullYear()} MARILYN SARAVIA · {t.rights}
          </span>
          <span className="text-sky-400/80">
            SYS.INIT // PORTFOLIO_V2
          </span>
        </div>
      </div>

      {/* Avatar flotante */}
      <div
        className={`fixed bottom-4 right-4 z-50 hidden sm:flex items-end transition-all duration-500 ease-out pointer-events-none ${
          showAvatar
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        <div className="flex items-end gap-2 bg-[#0A1124]/95 backdrop-blur-md border border-slate-800 px-3 py-2 pointer-events-auto">
          <img
            src={emoji}
            alt="Marilyn waving"
            className="w-12 h-12 object-contain flex-shrink-0"
            loading="lazy"
          />
          <div className="pr-1">
            <p className="font-mono text-xs text-white leading-tight">
              {t.thanksTitle}
            </p>
            <p className="font-mono text-[11px] text-sky-400">
              {t.thanksSub}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;