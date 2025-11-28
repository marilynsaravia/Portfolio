import { useState } from "react";

const Contact = () => {
  const [copied, setCopied] = useState(false);
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

  const iconClasses = 
    "transition-all duration-700 text-gray-500   " +
    "hover:text-transparent hover:bg-clip-text " +
    "hover:bg-gradient-to-b from-purple-400 to-blue-500";

  return (
    <section
      id="contact"
      className="w-full  pt-40 pb-4 px-8 md:px-16 text-gray-800 flex flex-col items-center"
    >
      {/* 🌿 Title */}
      <h2 className="text-center text-2xl md:text-3xl font-semibold tracking-wide mb-8">
        Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-teal-500 to-blue-500">Touch</span>
      </h2>

      <p className="text-gray-600 text-center max-w-2xl mb-12 text-base md:text-lg leading-relaxed">
        I’m available for new collaborations, freelance projects, or opportunities.
        <br />
        Feel free to email me or connect through my social networks. 🚀
       
      </p>

      {/* 🌐 RRSS + Email */}
      <div className="flex gap-6 mt-6 text-gray-500 relative text-3xl md:text-4xl">
        
        {/* GitHub */}
        <a
          href="https://github.com/marilynsaravia"
          target="_blank"
          rel="noopener noreferrer"
          className={iconClasses}
        >
          <i className="ri-github-fill" />
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/marilynsaravia"
          target="_blank"
          rel="noopener noreferrer"
          className={iconClasses}
        >
          <i className="ri-linkedin-box-fill" />
        </a>

        {/* CodePen */}
        <a
          href="https://codepen.io/marilynsaravia"
          target="_blank"
          rel="noopener noreferrer"
          className={iconClasses}
        >
          <i className="ri-codepen-fill" />
        </a>

        {/* Email (copy) */}
        <button
          onClick={handleCopyEmail}
          className={`${iconClasses} relative cursor-pointer`} 
        >
          <i className="ri-at-line" />

          {/* Tooltip */}
          {copied && (
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded-md shadow-lg animate-fade">
              Copied!
            </span>
          )}
        </button>

      </div>

      {/* Footer */}
      <p className="text-gray-400 text-sm mt-12">
        © {new Date().getFullYear()} Marilyn Saravia. All rights reserved.
      </p>
    </section>
  );
};

export default Contact;
