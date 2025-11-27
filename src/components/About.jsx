import { getImageAbout } from "../utils";

export default function About() {
  return (
    <section id="about" className="w-full pt-24 pb-24 bg-white text-gray-800">
      {/* 🌿 Title */}
      <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-800 tracking-wide mb-16">
        About Me
      </h2>

      <div className="max-w-5xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-[minmax(260px,320px)_1fr] gap-10 md:gap-14 items-center">
        {/* 📸 Photo */}
        <div className="justify-self-center md:justify-self-start">
          <div className="relative">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-gray-200/60 to-transparent blur-md" />
            <img
              src={getImageAbout("marilyn.png")}
              alt="Marilyn Saravia"
              className="relative z-[1] w-64 h-64 md:w-72 md:h-72 object-cover rounded-2xl ring-1 ring-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              loading="lazy"
            />
          </div>
        </div>

        {/* 📝 Text */}
        <div className="max-w-2xl">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Hi! I’m <span className="font-semibold text-gray-900">Marilyn Saravia</span>, a web
            developer focused on creating clean, responsive, and intuitive web applications.
            I love turning ideas into simple, elegant solutions and collaborating to craft meaningful
            digital experiences.
          </p>

          <p className="text-gray-600 text-base leading-relaxed mt-4">
            I hold a degree in Web Application Development and have hands-on experience with modern
            technologies. My goal is to build products that are visually clear, accessible, and
            functional — blending design with usability.
          </p>

          {/* 🧩 Visual stack consistent with the "Projects" section */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">Stack</h3>
            <p className="text-gray-600 text-sm md:text-base">
              {["React", "Tailwind CSS", "JavaScript", "TypeScript", "Next.js"].map((t, i, arr) => (
                <span key={t}>
                  {t}
                  {i < arr.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>

          {/* 🎯 Actions */}
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-800 hover:text-white transition-colors"
            >
              View Projects
            </a>
            <a
              href="/Marilyn_Saravia_CV.pdf"
              className="px-4 py-2 text-sm rounded-md text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-400 hover:to-purple-400 transition-colors duration-500"
              
            >    
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
