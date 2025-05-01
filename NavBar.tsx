import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClasses = 'text-gray-600 hover:text-gray-800';
  const activeLinkClasses = 'text-gray-800 font-medium';

  return (
    <nav className={`bg-white fixed w-full pt-2 top-0 z-50 transition-shadow ${scrolled ? 'border-b border-gray-200 shadow-sm' : ''}`}>
      <div className="max-w-screen-xl mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-6">
          <NavLink to="/" className="text-2xl font-bold text-sky-900">
            Model-View
          </NavLink>
          <NavLink
            to="/competitions"
            className={({ isActive }) =>
              isActive ? activeLinkClasses : linkClasses
            }
          >
            Competitions
          </NavLink>
          <NavLink
            to="/datasets"
            className={({ isActive }) =>
              isActive ? activeLinkClasses : linkClasses
            }
          >
            Datasets
          </NavLink>
          <NavLink
            to="/leaderboards"
            className={({ isActive }) =>
              isActive ? activeLinkClasses : linkClasses
            }
          >
            Leaderboard
          </NavLink>
        </div>
        <div className="space-x-6">
        <NavLink to="/authentication?mode=signin">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded hover:bg-sky-100/70 hover:shadow-sm shadow-none transition cursor-pointer">
            Sign In
          </button>
        </NavLink>
        <NavLink to="/authentication?mode=register">
          <button className="bg-sky-900 text-white px-4 py-2 rounded hover:bg-sky-800 hover:shadow-md shadow-none transition cursor-pointer">
            Register
          </button>
        </NavLink>
        </div>
      </div>
    </nav>
  );
}


export default NavBar;