import { useEffect, useRef, useState } from "react";
import experienceData from "../data/experience.json";
import { getImageExperience } from "../utils";

export default function ExperienceTimeline() {
  const sectionRef = useRef(null);
  const sectionTopRef = useRef(0);
  const sectionHeightRef = useRef(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const updateMetrics = () => {
      const rect = el.getBoundingClientRect();
      sectionTopRef.current = rect.top + window.scrollY;
      sectionHeightRef.current = el.offsetHeight || 1;
    };

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.3; // reference
      const raw =
        (scrollPos - sectionTopRef.current) / sectionHeightRef.current;
      const clamped = Math.min(1, Math.max(0, raw));
      setScrollProgress(clamped);
    };

    updateMetrics();
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => {
      updateMetrics();
      handleScroll();
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", () => {
        updateMetrics();
        handleScroll();
      });
    };
  }, []);

  const lineHeightPercent = scrollProgress * 100;

  return (
    <section
      id="experience"
      className="w-full py-24 bg-white text-gray-800"
      ref={sectionRef}
    >
      {/* Tittle */}
      <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-800 mb-16 tracking-wide">
        Experience
      </h2>

      <div className="max-w-4xl mx-auto px-6">
        {/* Timeline wrapper  */}
        <div className="relative pl-8 md:pl-16">
          {/* Gray baseline line */}
          <span className="pointer-events-none absolute left-[14px] top-0 bottom-0 w-px bg-gray-200" />

          {/* Gradient progress line that lights up on scroll */}
          <span
            className="pointer-events-none absolute left-[13px] top-0 w-[3px] rounded-full bg-gradient-to-b from-teal-400 via-purple-400 to-blue-500 transition-all duration-200"
            style={{ height: `${lineHeightPercent}%` }}
          />

          <div className="space-y-12">
            {experienceData.map((exp, i) => (
              <div key={i} className="relative flex gap-6">
                {/* Experience content */}
                <div className="flex-1">
                  {/* Role */}
                  <h3 className="text-base md:text-lg font-semibold leading-snug">
                    {exp.role}
                  </h3>

                  {/* Organization + country + employment type */}
                  <p className="text-gray-600 font-medium flex items-center gap-2">
                    {exp.organisation}

                    <span className="text-gray-400">•</span>

                    <img
                      src={getImageExperience(exp.imageSrc)}
                      alt={exp.country}
                      className="w-4 h-4 object-cover rounded-sm"
                    />

                    <span>{exp.country}</span>

                    <span className="text-gray-400">•</span>

                    <span>{exp.employmentType}</span>
                  </p>

                  {/* Dates */}
                  <p className="font-medium text-gray-500 mb-1  tracking-wide">
                    {exp.startDate} — {exp.endDate}
                  </p>

                  {/* Summary or bullet-less list */}
                  {exp.summary ? (
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed mt-2">
                      {exp.summary}
                    </p>
                  ) : (
                    <ul className="text-gray-700 text-sm md:text-base leading-relaxed mt-2 space-y-1">
                      {exp.experiences?.map((item, idx) => (
                        <li key={idx} className="flex gap-2">
                          {/* Rounded bullet dot */}
                          <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
