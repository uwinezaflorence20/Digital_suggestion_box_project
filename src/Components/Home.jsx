import About from "./About";
import SuggestionSample from "./SuggestionSample";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const handleHoverStart = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleHoverEnd = () => {
    speechSynthesis.cancel(); // Stops any ongoing speech synthesis
  };

  return (
    <div>
      {/* Section with Parallax Effect and Animated Elements */}
      <section className=" bg-blue-50/50 dark:bg-gray-800 dark:text-gray-200">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            {/* Title with Initial Fade-In and Upward Movement */}
            <motion.h1
              className="text-3xl font-extrabold dark:text-gray-400 text-sky-800 sm:text-5xl"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Welcome to Digital Suggestion Box (DS-Box)
            </motion.h1>

            {/* Description with Hover Text-to-Speech */}
            <motion.p
              onMouseEnter={() =>
                handleHoverStart(
                  "Digitized Suggestion Box For University Of Rwanda College of Science and Technology."
                )
              }
              onMouseLeave={handleHoverEnd}
              className="mt-4 sm:text-xl/relaxed dark:text-gray-200 text-black font-extralight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Digitized Suggestion Box For University Of Rwanda College of Science and Technology.
            </motion.p>

            {/* Button with Hover Scale Animation */}
            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <Link to="/signup">
                <motion.a
                  onMouseEnter={() => handleHoverStart("Get Started")}
                  onMouseLeave={handleHoverEnd}
                  className="block w-full rounded-full bg-sky-800 px-12 py-3 text-sm font-medium dark:bg-gray-900 dark:text-gray-200 text-white shadow hover:bg-white hover:text-sky-800 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                  whileHover={{ scale: 1.1 }}
                >
                  Get Started
                </motion.a>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section with Animation on Scroll */}
      <motion.div
        className="my-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <About />
      </motion.div>

      {/* Suggestion Sample Section with Floating Effect */}
      <motion.div
        className="my-16"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <SuggestionSample />
      </motion.div>

      {/* Footer Section with Slide-In Effect */}
      <motion.div
        className="my-16"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1, type: "spring" }}
      >
      
      </motion.div>

      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-20 left-20"
        animate={{ y: [0, -50, 50], x: [0, 50, 0] }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
      >
        <svg
          width="80"
          height="80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-sky-800"
        >
          <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="5" />
        </svg>
      </motion.div>

      {/* Another floating element */}
      <motion.div
        className="absolute top-48 right-10"
        animate={{ y: [0, 15, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      >
        <svg
          width="60"
          height="60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-sky-600"
        >
          <rect x="10" y="10" width="40" height="40" stroke="currentColor" strokeWidth="5" />
        </svg>
      </motion.div>
    </div>
  );
};

export default Home;
