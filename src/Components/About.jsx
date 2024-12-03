import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  const handleHover = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const buttonVariants = {
    hover: { scale: 1.1 },
  };

  return (
    <motion.section 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.5 }}
      className="overflow-hidden"
    >
      <div className="mx-auto bg-white max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Image Section with Animation */}
          <motion.div
            variants={imageVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full"
          >
            <img
              alt=""
              src="/img1.png"
              className="absolute inset-0 mt-20 h-full w-full object-cover"
            />
          </motion.div>

          {/* Text Section with Animation */}
          <motion.div
            variants={textVariants}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:py-24"
          >
            <h2
              onMouseEnter={() => handleHover("Digital Suggestion Box")}
              className="text-3xl font-bold mt-12 text-sky-800 sm:text-4xl"
            >
              Digital Suggestion Box
            </h2>

            <p
              onMouseEnter={() =>
                handleHover(
                  "DS-Box is an online platform designed for the University of Rwanda College of Science and Technology to collect, manage, and respond to suggestions from students, staff, and faculty."
                )
              }
              className="mt-4 text-md text-black"
            >
              DS-Box (Digital Suggestion Box) is an online platform designed for
              the University of Rwanda College of Science and Technology to
              collect, manage, and respond to suggestions from students, staff,
              and faculty. It digitizes the traditional suggestion box,
              allowing users to submit their feedback, ideas, and concerns
              anonymously or openly through an easy-to-use web interface.
            </p>

            {/* Button with Hover Animation */}
            <Link to="/signup">
              <motion.a
                onMouseEnter={() => handleHover("Get Started Today")}
                whileHover="hover"
                variants={buttonVariants}
                transition={{ duration: 0.3 }}
                className="mt-8 inline-block rounded-full bg-sky-800 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Get Started Today
              </motion.a>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
