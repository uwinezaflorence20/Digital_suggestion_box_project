import { CiMenuFries } from "react-icons/ci";
import { FaMoon, FaSun } from "react-icons/fa"; // Import the dark mode icons
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize dark mode state from localStorage or system preference
    return (
      localStorage.getItem("theme") === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  const location = useLocation(); // Get the current location

  useEffect(() => {
    // Apply the theme on initial render
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);

    // Save the user preference to localStorage
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const handleHover = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-blue-50/100 fixed top-0 w-full z-50 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="block text-teal-600 dark:text-white">
            <img src="/Component 1.svg" alt="Logo" />
          </Link>
          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-md font-sans">
                <li>
                  <Link
                    to="/"
                    onMouseEnter={() => handleHover("Home")}
                    className={`${
                      isActive("/") ? "text-white bg-sky-800" : "text-sky-800"
                    } rounded-full px-4 py-1 transition hover:text-cyan-300/75`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/suggestion"
                    onMouseEnter={() => handleHover("Suggestion")}
                    className={`${
                      isActive("/suggestion")
                        ? "text-white bg-sky-800"
                        : "text-sky-800"
                    } dark:text-white px-4 py-1 rounded-full transition hover:text-white hover:bg-sky-800`}
                  >
                    Suggestion
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    onMouseEnter={() => handleHover("About")}
                    className={`${
                      isActive("/about")
                        ? "text-white bg-sky-800"
                        : "text-sky-800"
                    } dark:text-white px-4 py-1 rounded-full transition hover:text-white hover:bg-sky-800`}
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="rounded-full p-2 transition hover:bg-gray-200 dark:hover:bg-gray-800"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <FaSun className="text-yellow-400" size={24} />
              ) : (
                <FaMoon className="text-gray-800 dark:text-gray-200" size={24} />
              )}
            </button>

            <Link
              to="/signin"
              onMouseEnter={() => handleHover("Sign in or Sign up")}
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
        <div className="fixed inset-0 z-50 bg-white/95 dark:bg-gray-900 p-6 md:hidden">
          <div className="flex items-center justify-between">
            <Link to="/" className="block text-teal-600 dark:text-white">
              <img src="/Component 1.png" alt="Logo" />
            </Link>
            <button
              onClick={toggleMenu}
              className="rounded bg-gray-100 p-2 text-gray-600 dark:text-gray-200"
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
                  onMouseEnter={() => handleHover("Home")}
                  className={`${
                    isActive("/") ? "text-white bg-sky-800" : "text-sky-800"
                  } rounded-full px-4 py-1 transition hover:text-cyan-300/75`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/suggestion"
                  onClick={toggleMenu}
                  onMouseEnter={() => handleHover("Suggestion")}
                  className={`${
                    isActive("/suggestion")
                      ? "text-white bg-sky-800"
                      : "text-sky-800"
                  } dark:text-white px-4 py-1 rounded-full transition hover:text-white hover:bg-sky-800`}
                >
                  Suggestion
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={toggleMenu}
                  onMouseEnter={() => handleHover("About")}
                  className={`${
                    isActive("/about")
                      ? "text-white bg-sky-800"
                      : "text-sky-800"
                  } dark:text-white px-4 py-1 rounded-full transition hover:text-white hover:bg-sky-800`}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>

          <div className="mt-8">
            <Link
              onMouseEnter={() => handleHover("Sign in or Sign up")}
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
