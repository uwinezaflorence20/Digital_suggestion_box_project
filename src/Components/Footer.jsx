import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
      

        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center text-teal-600 lg:justify-start">
              <a className="block text-teal-600" href="#">
                <span className="sr-only">Home</span>
                <img src="/Component 1.png" alt="Logo" />
              </a>
            </div>
          </div>
          <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
            Copyright &copy; 2024. All rights reserved.
          </p>
          <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
            <li>
           
              <Link
                to="/"
                className="text-white bg-sky-800 rounded-full px-4 py-1 transition hover:text-cyan-300/75"
              >
                Home
              </Link>
            </li>
            <li>
              {/* Suggestion Link */}
              <Link
                to="/suggestion"
                className="text-sky-800 px-4 py-1 rounded-full transition hover:text-white hover:bg-sky-800"
              >
                Suggestion
              </Link>
            </li>
            <li>
              {/* About Link */}
              <Link
                to="/about"
                className="text-sky-800 px-4 py-1 rounded-full transition hover:text-white hover:bg-sky-800"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
