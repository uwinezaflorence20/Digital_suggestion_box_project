import About from "./About";
import SuggestionSample from "./SuggestionSample";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const handleHover = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <section className="mt-12 bg-blue-50/50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              className="text-3xl font-extrabold text-sky-800 sm:text-5xl"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Welcome to Digital Suggestion Box (DS-Box)
            </motion.h1>

            <motion.p
              onMouseEnter={() =>
                handleHover(
                  "Digitized Suggestion Box For University Of Rwanda College of Science and Technology."
                )
              }
              className="mt-4 sm:text-xl/relaxed text-black font-extralight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Digitized Suggestion Box For University Of Rwanda College of Science and Technology.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <Link to="/signup">
                <motion.a
                  onMouseEnter={() => handleHover("Get Started")}
                  className="block w-full rounded-full bg-sky-800 px-12 py-3 text-sm font-medium text-white shadow hover:bg-white hover:text-sky-800 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                  whileHover={{ scale: 1.1 }}
                >
                  Get Started
                </motion.a>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <About />
      <SuggestionSample />
      <Footer />
    </div>
  );
};

export default Home;
