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
         
          <Link to="/" className="block text-teal-600">
            <img src="/Component 1.png" alt="Logo" />
          </Link>
          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-md font-sans">
                <li>
                  <Link
                    to="/"
                    className="text-white bg-sky-800 rounded-full px-4 py-1 transition hover:text-cyan-300/75"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/suggestion"
                    className="text-sky-800 px-4 py-1 rounded-full transition hover:text-white hover:bg-sky-800"
                  >
                    Suggestion
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-sky-800 px-4 py-1 rounded-full transition hover:text-white hover:bg-sky-800"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

         
          <div className="flex items-center gap-4">
  <Link
    to="/signin"
    className="hidden md:block rounded-full bg-sky-800 px-8 py-2.5 text-sm font-medium text-white shadow hover:bg-white hover:text-sky-800"
  >
    Sign up/Login
  </Link>

  
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
            <Link to="/" className="block text-teal-600">
              <img src="/Component 1.png" alt="Logo" />
            </Link>
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
                <Link
                  to="/"
                  onClick={toggleMenu}
                  className="text-white bg-sky-800 rounded-full px-4 py-1 transition hover:text-cyan-300/75"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/suggestion"
                  onClick={toggleMenu}
                  className="text-sky-800 px-4 py-1 rounded-full transition hover:text-white hover:bg-sky-800"
                >
                  Suggestion
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={toggleMenu}
                  className="text-sky-800 px-4 py-1 rounded-full transition hover:text-white hover:bg-sky-800"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>

          <div className="mt-8">
            <Link
              to="/signin"
              onClick={toggleMenu}
              className="rounded-full bg-sky-800 px-8 py-2.5 text-sm font-medium text-white shadow hover:bg-white hover:text-sky-800"
            >
              Sign up/Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
