import About from "./About";
import SuggestionSample from "./SuggestionSample";
import Footer from "./Footer";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <section className=" mt-12  bg-blue-50/50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-extrabold text-sky-800 sm:text-5xl">
              Welcome to Digital Suggestion Box (DS-Box)
            </h1>

            <p className="mt-4 sm:text-xl/relaxed text-black font-extralight">
              Digitized Suggestion Box For University Of Rwanda College of Science and Technology.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
             <Link to="/signup"><a
                className="block w-full rounded-full bg-sky-800 px-12 py-3 text-sm font-medium text-white shadow hover:bg-white hover:text-sky-800 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                href="#"
              >
                Get Started
              </a>
              </Link> 
            </div>
          </div>
        </div>
      </section>

      <About />
      <SuggestionSample/>
      <Footer />
    </div>
  );
};

export default Home;
