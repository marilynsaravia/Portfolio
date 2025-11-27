import emoji from "../assets/Hero/emoji.png";

export default function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        w-full
        bg-white text-gray-900
        pt-24 pb-20
        px-6
        overflow-hidden
      "
    >
      {/* Background pattern */}
      <div
        className="
          absolute inset-0 
          bg-[radial-gradient(circle,_rgba(0,0,0,0.06)_1px,_transparent_1px)]
          bg-[size:22px_22px]
          pointer-events-none
        "
      ></div>

      {/* Centered container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">

        {/* Emoji */}
        <div className="relative mb-12">
          <div className="relative z-[1] w-40 h-40 md:w-56 md:h-56 flex items-center justify-center transition-transform duration-300 hover:scale-105">
            <img
              src={emoji}
              alt="Marilyn emoji"
              className="w-36 h-36 md:w-52 md:h-52 object-contain"
              loading="lazy"
            />
          </div>
        </div>

       {/* Main title */}
        <h1 className="text-[28px] sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-2">
          Hi, my name is{" "}
          <span className="bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
            Marilyn
          </span>{" "}
          👋🏽
        </h1>

        {/* Subtitle: "I'm a Frontend Developer" */}
        <h2 className="text-gray-600 text-[28px] sm:text-4xl md:text-5xl  flex items-center justify-center gap-2 mb-4">
          I'm a
          <span className="font-semibold text-gray-900 flex items-center">
            <span className="hero-typing inline-block leading-none">
              Frontend Developer
            </span>
          </span>
        </h2>

        {/* Description */}
        <p className="text-gray-600 max-w-2xl text-base md:text-lg leading-relaxed mb-10">
          I build clean, responsive interfaces with a focus on accessibility, performance,
          and elegant UX. Always learning, always shipping.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#projects"
            className="px-6 py-3 rounded-md border bg-white border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white transition-colors text-sm md:text-base"
          >
            View Projects
          </a>
          <a
            href="/Marilyn_Saravia_CV.pdf"
            className="px-6 py-3 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-colors text-sm md:text-base"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
