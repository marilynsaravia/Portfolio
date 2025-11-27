const Contact = () => {
  return (
    <section
      id="contact"
      className="w-full pt-40 pb-4 px-8 md:px-16  text-gray-800 flex flex-col items-center"
    >
      {/* 🌿 Title */}
      <h2 className="text-center text-2xl md:text-3xl font-semibold tracking-wide mb-6">
        Get In <span className="text-gray-900">Touch</span>
      </h2>

      <p className="text-gray-600 text-center max-w-2xl mb-12 text-base md:text-lg leading-relaxed">
        I’d love to hear from you — whether you’re interested in collaborating,
        have a question, or just want to say hello. 👋
      </p>

      {/* 📬 Form */}
      <form className="w-full max-w-lg bg-gray-50 p-8 rounded-2xl shadow-[0_6px_24px_rgba(0,0,0,0.05)] space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 mb-2 text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your name"
            className="w-full border border-gray-300 text-gray-800 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 text-gray-800 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-700 mb-2 text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            rows="5"
            placeholder="Write your message..."
            className="w-full border border-gray-300 text-gray-800 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-800 resize-none transition"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Send Message
        </button>
      </form>

      {/* 🌐 RRSS */}
      <div className="flex gap-6 mt-10 text-2xl text-gray-500">
        
        {/* GitHub */}
        <a
          href="https://github.com/marilynsaravia"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 transition-colors"
        >
          <i className="ri-github-fill"></i>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/marilynsaravia"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 transition-colors"
        >
          <i className="ri-linkedin-box-fill"></i>
        </a>

        {/* CodePen */}
        <a
          href="https://codepen.io/marilynsaravia"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 transition-colors"
        >
          <i className="ri-codepen-fill"></i>
        </a>

      </div>

      {/* Footer */}
      <p className="text-gray-400 text-sm mt-12">
        © {new Date().getFullYear()} Marilyn Saravia. All rights reserved.
      </p>
    </section>
  );
};

export default Contact;
