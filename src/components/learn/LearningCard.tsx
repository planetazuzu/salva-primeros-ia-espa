
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface LearningCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  linkTo: string;
  imageUrl?: string;
}

const LearningCard = ({ title, description, icon, linkTo, imageUrl }: LearningCardProps) => {
  return (
    <div className="auxilio-card flex flex-col h-full">
      {imageUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105" 
          />
        </div>
      )}
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center mb-3">
          <div className="rounded-full bg-blue-50 p-2 mr-3">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-auxilio-azul">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <Link 
          to={linkTo} 
          className="flex items-center text-auxilio-azul hover:text-blue-700 font-medium mt-auto"
        >
          Ver más <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default LearningCard;
