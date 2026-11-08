import educationData from "../data/education.json";
import { getImageEducation } from "../utils";
import "flag-icons/css/flag-icons.min.css";

export default function EducationTimeline() {
  return (
    <section id="education" className="w-full py-24 bg-white text-gray-800">
      {/* Title */}
      <h2 className="text-center text-3xl font-bold text-gray-900 mb-16 tracking-tight">
        Experience
      </h2>

      <div className="mx-auto px-6">
        {/* Grid de cards con la estructura exacta de la imagen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experienceData.map((exp, i) => (
            <div 
              key={i} 
              className="group h-[380px] md:h-[420px] bg-white rounded-2xl p-8 shadow-xl border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="overflow-y-auto pr-1 custom-scrollbar">
                
                {/* Cabecera compacta con logo, rol, empresa y fechas arriba */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shadow-inner flex-shrink-0">
                    <img
                      src={getImageExperience(exp.imageSrc)}
                      alt={exp.organisation}
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-gray-950 group-hover:text-teal-600 transition-colors leading-tight truncate">
                        {exp.role}
                      </h3>
                      <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 flex-shrink-0">
                        {exp.employmentType}
                      </span>
                    </div>

                    <p className="text-gray-700 font-normal flex flex-wrap items-center gap-1.5 mt-1 text-sm">
                      <span className="font-semibold text-gray-900 truncate">{exp.organisation}</span>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center gap-1">
                        <span className={`fi fi-${exp.flag} h-3 w-4 rounded-sm`}></span>
                        <span className="text-gray-600 text-xs">{exp.country}</span>
                      </div>
                    </p>

                    {/* Fechas reubicadas justo debajo de la empresa */}
                    <p className="text-xs font-medium text-gray-400 mt-1">
                      {exp.startDate} — {exp.endDate}
                    </p>
                  </div>
                </div>

                {/* Summary o bullet list de lo que hiciste (ocupa el resto del espacio interior) */}
                <div className="">
                  {exp.summary ? (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {exp.summary}
                    </p>
                  ) : (
                    <ul className="text-gray-600 text-sm leading-relaxed space-y-2">
                      {exp.experiences?.map((item, idx) => (
                        <li key={idx} className="flex gap-2.5">
                          <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}