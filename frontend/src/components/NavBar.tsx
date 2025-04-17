import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`bg-white fixed w-full pt-2 top-0 z-50 transition-shadow ${scrolled ? 'border-b border-gray-200 shadow-sm' : ''}`}>
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-2xl font-bold text-gray-800">Model-View</Link>
          <Link to="/competitions" className="text-gray-600 hover:text-gray-900">Competitions</Link>
          <Link to="/datasets" className="text-gray-600 hover:text-gray-900">Datasets</Link>
          <Link to="/leaderboards" className="text-gray-600 hover:text-gray-900">Leaderboard</Link>
        </div>
        <div className="space-x-4">
          <button className="text-gray-600 hover:text-gray-800 cursor-pointer">Sign In</button>
          <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer">
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;