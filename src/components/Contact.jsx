import { useState, useEffect, useRef } from "react";
import emoji from "../assets/Contact/emoji.png";


const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false); // Used to show/hide the avatar.
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const [isLangOpen, setIsLangOpen] = useState(false);


  const sectionRef = useRef(null);
  const langDropdownRef = useRef(null);

  const email = "goitiasaraviamarilyn@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error copying email:", err);
    }
  };

  // Tracks whether the section is on screen (threshold 0.2 = 20% visible)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasScrolledToBottom(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Closes the language dropdown when clicking anywhere outside of it.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const iconClasses = 
    "transition-all duration-700 text-gray-500 text-5xl md:text-6xl  " +
    "hover:text-transparent hover:bg-clip-text " +
    "hover:bg-gradient-to-b from-purple-400 to-blue-500";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full bg-white text-gray-800 pt-20 pb-12 px-8 md:px-20 relative overflow-hidden font-sans border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-12 items-start mb-16 relative z-10">
      
        {/* Colmun 1 */}
        <div className="flex flex-col gap-6 md:col-span-2">
          {/* Text */}
          <div>
            <h3 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-3">
              Get In Touch
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-md">
              I’m available for new collaborations, freelance projects, or opportunities. Feel free to email me or connect through my social networks.
            </p>
          </div>
          {/* RRSS */}
          <div className="flex flex-row items-center gap-8 md:gap-10 pt-2">
            <a href="https://github.com/marilynsaravia" target="_blank" rel="noopener noreferrer" className={iconClasses}>
              <i className="ri-github-fill" />
            </a>
            <a href="https://linkedin.com/in/marilynsaravia" target="_blank" rel="noopener noreferrer" className={iconClasses}>
              <i className="ri-linkedin-box-fill" />
            </a>
            <a href="https://codepen.io/marilynsaravia" target="_blank" rel="noopener noreferrer" className={iconClasses}>
              <i className="ri-codepen-fill" />
            </a>
            <button onClick={handleCopyEmail} className={`${iconClasses} relative cursor-pointer`}>
              <i className="ri-at-line" />
              {copied && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded-md shadow-lg animate-fade">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>
        {/* Colmun 2 */}     
        <div className="grid grid-cols-2 gap-8 w-full md:col-span-2">   
          {/* Others */}
          <div className="flex flex-col gap-3 text-sm text-gray-500">
            <h4 className="text-gray-900 font-bold mb-2 text-base">Others</h4>
            <a href="#privacy" className="hover:text-gray-950 hover:font-medium transition-colors">Privacy Policy</a>
            <a href="#cookies" className="hover:text-gray-950 hover:font-medium transition-colors">Cookies</a>
            <a href="#code" className="hover:text-gray-950 hover:font-medium transition-colors">Code of Conduct</a>
            <a href="#legal" className="hover:text-gray-950 hover:font-medium transition-colors">Legal Notice</a>
          </div>
          {/* Questions */}
          <div className="flex flex-col gap-3 text-sm text-gray-500">
            <h4 className="text-gray-900 font-bold mb-2 text-base">Questions</h4>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="hover:text-gray-950 hover:font-medium transition-colors">WhatsApp</a>
            <a href={`mailto:${email}`} className="hover:text-gray-950 hover:font-medium transition-colors">Contact</a>
            <a href="#info" className="hover:text-gray-950 hover:font-medium transition-colors">Request Info</a>
            <a href="#location" className="hover:text-gray-950 hover:font-medium transition-colors">Location</a>
            {/* Language */}
            <div className="mt-4 relative" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 border border-gray-200 bg-gray-50 px-4 py-2 rounded-lg text-sm text-gray-700 hover:border-gray-400 hover:text-gray-950 transition-colors cursor-pointer"
              >
                <span>{currentLanguage}</span>
                <i className={`ri-arrow-down-s-line transition-transform duration-300 ${isLangOpen ? "rotate-180" : ""}`} />
              </button>
              {isLangOpen && (
                <div className="absolute left-0 bottom-full mb-2 w-32 bg-gray-50 border border-gray-200 rounded-lg shadow-md overflow-hidden z-20 py-1">
                  <button
                    onClick={() => {
                      setCurrentLanguage("English");
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-4 py-1.5 text-sm transition-colors ${
                      currentLanguage === "English"
                        ? "text-gray-950 font-bold bg-gray-100"
                        : "text-gray-700 hover:text-gray-950 hover:bg-gray-100"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setCurrentLanguage("Spanish");
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-4 py-1.5 text-sm transition-colors ${
                      currentLanguage === "Spanish"
                        ? "text-gray-950 font-bold bg-gray-100"
                        : "text-gray-700 hover:text-gray-950 hover:bg-gray-100"
                    }`}
                  >
                    Spanish
                  </button>
                </div>
              )}
            </div>
          </div>
        </div> 
      </div>

      {/* 📄 Copyright */}
      <div className="max-w-7xl mx-auto border-t border-gray-100 pt-6 text-center text-xs text-gray-400 relative z-10">
        © {new Date().getFullYear()} Marilyn Saravia. All rights reserved. This information is not contractually binding.
      </div>
      {/* 👩🏽 Avatar */}
      <div
        className={`fixed bottom-0 left-0 z-50 flex items-end transition-all duration-700 ease-out pointer-events-none ${
          hasScrolledToBottom ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="relative flex items-end">

          {/* Decorative glow behind the avatar */}
          <div className="absolute -left-6 -bottom-6 w-48 h-48 bg-cyan-200/40 rounded-full blur-2xl pointer-events-none" />
          
          <div className="w-32 h-32 md:w-44 md:h-44 relative z-10 pointer-events-auto">
            <img
              src={emoji}
              alt="Marilyn Waving"
              className="w-full h-full object-cover object-top scale-110 -translate-x-2 translate-y-4"
            />
          </div>

          <div className="mb-6 -ml-2 z-10 pointer-events-auto bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-gray-100">
            <p className="text-gray-900 font-medium text-base md:text-lg leading-tight">
              Thanks for visiting! 🫶🏽
            </p>
            <p className="text-gray-500 text-xs md:text-sm">
              See you soon!
            </p>
          </div>
        </div>
      </div> 
    </section>
  );
};

export default Contact;
