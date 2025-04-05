import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card = ({ children, className = '', onClick, hover = true }: CardProps) => {
  const hoverStyles = hover ? 'transition-transform hover:transform hover:-translate-y-1' : '';
  
  return (
    <div 
      className={`bg-white rounded-lg p-4 shadow-sm ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};


export default Card;