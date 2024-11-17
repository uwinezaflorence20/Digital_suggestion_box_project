import { Link } from "react-router-dom";
const About = () => {
return (
    <section>
  <div className="mx-auto bg-white max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
        <img
          alt=""
          src="/img1.png"
          className="absolute inset-0 mt-20 h-full w-full object-cover"
        />
      </div>

      <div className="lg:py-24">
        <h2 className="text-3xl font-bold mt-12 text-sky-800 sm:text-4xl">Digital Suggestion Box</h2>

        <p className="mt-4 text-md text-black">
        DS-Box (Digital Suggestion Box) is an online platform designed for the University of Rwanda College of Science and Technology to collect, manage, 
        and respond to suggestions from students, staff, and faculty. It digitizes the traditional
         suggestion box, allowing users to submit their feedback, ideas, and concerns anonymously or openly through an easy-to-use web interface.
        </p>

       <Link to="/signup"> <a
          href="#"
          className="mt-8 inline-block rounded-full bg-sky-800 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
        >
          Get Started Today
        </a>
        </Link>
      </div>
    </div>
  </div>
</section>
);
}
export default About;