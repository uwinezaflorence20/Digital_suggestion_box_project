import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import Suggestion from "./Suggestion";

const Student = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <header className="bg-white">
      <div className="w-full fixed top-0 bg-sky-100 z-50">
        <div className="flex h-16 items-center justify-between px-12">
          <div className="flex-1 flex items-center gap-4">
            <img src="/Component 1.png" alt="Logo" />
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-10 text-md">
                <li>
                  <a
                    className="text-sky-800 transition hover:text-gray-500/75"
                    href="#"
                  >
                    <IoIosAddCircleOutline className="text-2xl" />
                  </a>
                </li>
                <li>
                  <a
                    className="text-white bg-sky-800 rounded-full px-4 py-1 transition hover:text-gray-500/75"
                    href="#"
                  >
                    Queue
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 px-2 py-1 rounded-full transition hover:text-white hover:bg-sky-800"
                    href="#"
                  >
                    Pending
                  </a>
                </li>
                <li>
                  <a
                    className="transition px-2 py-1 rounded-full hover:text-white hover:bg-sky-800"
                    href="#"
                  >
                    Resolved
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex md:flex md:items-center md:gap-12">
            <div className="hidden md:relative md:block">
              <button
                type="button"
                className="overflow-hidden rounded-full border border-gray-300 shadow-inner"
                onClick={toggleMenu}
              >
                <span className="sr-only">Toggle dashboard menu</span>
                <h1 className="w-10 h-10 text-white pt-2 bg-sky-800">M</h1>
              </button>

              {isMenuOpen && (
                <div
                  className="absolute right-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border bg-white shadow-lg"
                  role="menu"
                >
                  <div className="p-2">
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50"
                      role="menuitem"
                    >
                      My profile
                    </a>
                  </div>

                  <div className="p-2">
                    <form method="POST" action="#">
                      <button
                        type="submit"
                        className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                        role="menuitem"
                      >
                        Logout
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>

            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <Suggestion />
        <Suggestion />
      </div>
    </header>
  );
};

export default Student;
