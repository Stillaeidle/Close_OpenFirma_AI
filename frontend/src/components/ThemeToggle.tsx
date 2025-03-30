import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Only show theme toggle after component is mounted (to prevent hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`w-10 h-10 rounded-full ${className}`} />; // Return empty placeholder with same size
  }

  return (
    <button
      type="button"
      aria-label={resolvedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`rounded-full w-10 h-10 flex items-center justify-center 
                 ${resolvedTheme === 'dark' 
                    ? 'bg-gray-800 text-yellow-300 border-gray-700' 
                    : 'bg-white text-gray-700 border-gray-200'} 
                 border shadow-sm hover:shadow transition-all ${className}`}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? (
        <FaSun className="h-4 w-4" />
      ) : (
        <FaMoon className="h-4 w-4" />
      )}
    </button>
  );
}