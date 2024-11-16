import { CiMenuFries } from "react-icons/ci";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-50/100 fixed top-0 w-full z-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a className="block text-teal-600" href="#">
              <span className="sr-only">Home</span>
              <img src="/Component 1.png" alt="Logo" />
            </a>
          </div>
          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-md font-sans">
                <li>
                 <Link to="/"><a
                    className="text-white bg-sky-800 rounded-full px-4 py-1 transition hover:text-cyan-300/75"
                    href="#"
                  >
                    Home
                  </a>
                   </Link> 
                </li>
                <li>
                  <a
                    className="text-sky-800 px-4 py-1 rounded-full transition hover:text-white hover:bg-sky-800"
                    href="#"
                  >
                    Suggestion
                  </a>
                </li>
                <li>
                <Link to="/about">  <a
                    className="text-sky-800 px-4 py-1 rounded-full transition hover:text-white hover:bg-sky-800"
                    href="#"
                  >
                    About
                  </a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

        
          <div className="flex items-center gap-4">
            <a
              className="rounded-full bg-sky-800 px-8 py-2.5 text-sm font-medium text-white shadow hover:bg-white hover:text-sky-800"
              href="#"
            >
              Login
            </a>

            <button
              onClick={toggleMenu}
              className="block md:hidden rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
            >
              <CiMenuFries size={24} />
            </button>
          </div>
        </div>
      </div>

   
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 p-6 md:hidden">
          <div className="flex items-center justify-between">
            <a className="block text-teal-600" href="#">
              <img src="/Component 1.png" alt="Logo" />
            </a>
            <button
              onClick={toggleMenu}
              className="rounded bg-gray-100 p-2 text-gray-600"
            >
              ✕
            </button>
          </div>

          <nav className="mt-8">
            <ul className="space-y-4 text-lg font-semibold">
            <li>
                  <a
                    className="text-white bg-sky-800 rounded-full px-4 py-1 transition hover:text-cyan-300/75"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="text-sky-800 px-4 py-1 rounded-full transition hover:text-white hover:bg-sky-800"
                    href="#"
                  >
                    Suggestion
                  </a>
                </li>
                <li>
                  <a
                    className="text-sky-800 px-4 py-1 rounded-full transition hover:text-white hover:bg-sky-800"
                    href="#"
                  >
                    About
                  </a>
                </li>
            </ul>
          </nav>

          <div className="mt-8">
          <a
              className="rounded-full bg-sky-800 px-8 py-2.5 text-sm font-medium text-white shadow hover:bg-white hover:text-sky-800"
              href="#"
            >
              Login
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
