import { useState } from 'react';
import Link from 'next/link';
import { FaLeaf, FaBars, FaTimes } from 'react-icons/fa';
import Button from '@/components/Button';
import ThemeToggle from '@/components/ThemeToggle';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900 shadow-sm z-50 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <FaLeaf className="text-brand-green-600 dark:text-brand-green-400 mr-2" />
              <span className="font-bold text-xl text-brand-green-700 dark:text-brand-green-300">OpenFirmaAI</span>
            </Link>
            <nav className="hidden md:flex ml-10 space-x-8">
              <Link href="#" className="hover:text-brand-green-600 dark:hover:text-brand-green-400 text-gray-800 dark:text-gray-200 px-3 py-2 text-sm font-medium transition-colors">
                Apps
              </Link>
              <Link href="#" className="hover:text-brand-green-600 dark:hover:text-brand-green-400 text-gray-800 dark:text-gray-200 px-3 py-2 text-sm font-medium transition-colors">
                Industries
              </Link>
              <Link href="#" className="hover:text-brand-green-600 dark:hover:text-brand-green-400 text-gray-800 dark:text-gray-200 px-3 py-2 text-sm font-medium transition-colors">
                Community
              </Link>
              <Link href="#" className="hover:text-brand-green-600 dark:hover:text-brand-green-400 text-gray-800 dark:text-gray-200 px-3 py-2 text-sm font-medium transition-colors">
                Help
              </Link>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/login" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-brand-green-600 dark:hover:text-brand-green-400 transition-colors">
              Sign in
            </Link>
            <Button href="/signup" variant="primary" size="md">
              Get Started
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              type="button"
              className="text-gray-500 dark:text-gray-400"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#" className="block px-3 py-2 text-base font-medium text-gray-800 dark:text-gray-200 hover:text-brand-green-600 dark:hover:text-brand-green-400 transition-colors">
              Apps
            </Link>
            <Link href="#" className="block px-3 py-2 text-base font-medium text-gray-800 dark:text-gray-200 hover:text-brand-green-600 dark:hover:text-brand-green-400 transition-colors">
              Industries
            </Link>
            <Link href="#" className="block px-3 py-2 text-base font-medium text-gray-800 dark:text-gray-200 hover:text-brand-green-600 dark:hover:text-brand-green-400 transition-colors">
              Community
            </Link>
            <Link href="#" className="block px-3 py-2 text-base font-medium text-gray-800 dark:text-gray-200 hover:text-brand-green-600 dark:hover:text-brand-green-400 transition-colors">
              Help
            </Link>
            <Link href="/login" className="block px-3 py-2 text-base font-medium text-gray-800 dark:text-gray-200 hover:text-brand-green-600 dark:hover:text-brand-green-400 transition-colors">
              Sign in
            </Link>
            <div className="px-3 py-2">
              <Button href="/signup" variant="primary" size="md" className="w-full text-center">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;