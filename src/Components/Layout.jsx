import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { useState, useEffect } from 'react';

const Layout = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />

      {/* Back to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50 rounded-full bg-sky-800 p-3 text-white shadow-lg transition hover:bg-white hover:text-sky-800"
        >
          <span className="sr-only">Back to top</span>
          <MdKeyboardArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default Layout;
