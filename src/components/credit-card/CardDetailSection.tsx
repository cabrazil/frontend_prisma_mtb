import { ReactNode } from "react";

const COLORS = {
  PRIMARY: '#1F3B4D',       
  SECUNDARY: '#d1d5db',    // Cinza-300
  HIGHLIGHT: '#4169e1',    // #FF9000
  BACKGROUND: '#F5F5F5',
  TEXT_PRIMARY: '#4b5563',  //#333333
  TEXT_SECONDARY: '#030712' //#666666
};

interface CardDetailSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

const CardDetailSection = ({ title, icon, children, className = '' }: CardDetailSectionProps) => (
  <div 
    className={`card-section p-2 rounded-lg mb-4 shadow-sm ${className}`}
    style={{ 
      backgroundColor: 'white', 
      borderLeftColor: COLORS.HIGHLIGHT,
      borderLeftWidth: '2px',
      borderBottomColor: COLORS.HIGHLIGHT,
      borderBottomWidth: '2px'
    }}
  >
    <div className="flex items-center mb-2">
      {icon}
      <h3 
        className="text-lg font-semibold ml-2"
        style={{ color: COLORS.TEXT_PRIMARY }}
      >
        {title}
      </h3>
    </div>
    {children}
  </div>
);

export default CardDetailSection;