import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'glass';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  text, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  className = '',
  icon
}) => {
  
  // Base classes for all buttons
  const baseClasses = "relative overflow-hidden rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:-translate-y-1";
  
  // Size classes
  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-5 py-2.5 text-base",
    large: "px-7 py-3.5 text-lg"
  };
  
  // Variant classes with more interesting styles
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-blue-500/50 focus:ring-blue-500",
    secondary: "bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg hover:shadow-gray-700/50 focus:ring-gray-500",
    accent: "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-purple-500/50 focus:ring-purple-500",
    glass: "backdrop-blur-md bg-white/10 border border-white/20 text-gray-100 shadow-lg hover:bg-white/20 focus:ring-white/50"
  };
  
  // Disabled style
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed transform-none hover:translate-y-0" : "cursor-pointer";
  
  return (
    <button 
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className} group`}
      onClick={onClick}
      disabled={disabled}
    >
      {/* Animated shine effect */}
      <span className="absolute top-0 left-0 w-full h-full bg-white/30 transform -translate-x-full skew-x-12 group-hover:animate-shine"></span>
      
      {/* Button content with optional icon */}
      <span className="flex items-center justify-center">
        {icon && <span className="mr-2">{icon}</span>}
        {text}
      </span>
    </button>
  );
};

// Add this to your globals.css or as a style tag
const ButtonStyles = () => (
  <style jsx global>{`
    @keyframes shine {
      100% {
        transform: translateX(100%) skew(-12deg);
      }
    }
    
    .animate-shine {
      animation: shine 0.85s ease;
    }
  `}</style>
);

export default Button;