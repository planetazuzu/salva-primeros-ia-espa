
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import MediaContent from './MediaContent';

interface Resource {
  type: 'image' | 'video' | 'infographic';
  src: string;
  alt: string;
  caption?: string;
}

interface ResourcesSidebarProps {
  title: string;
  resources: Resource[];
  infoBox?: {
    title: string;
    items: string[];
  };
  relatedLink?: {
    to: string;
    text: string;
  };
}

const ResourcesSidebar: React.FC<ResourcesSidebarProps> = ({
  title,
  resources,
  infoBox,
  relatedLink,
}) => {
  return (
    <Card className="sticky top-24">
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4 text-auxilio-azul">{title}</h3>
        
        <div className="space-y-4">
          {resources.map((resource, index) => (
            <MediaContent
              key={index}
              type={resource.type}
              src={resource.src}
              alt={resource.alt}
              caption={resource.caption}
            />
          ))}
          
          {infoBox && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-auxilio-azul mb-2">{infoBox.title}</h4>
              <ul className="text-sm list-disc pl-5">
                {infoBox.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          
          {relatedLink && (
            <Link to={relatedLink.to} className="block text-auxilio-azul hover:underline">
              {relatedLink.text} →
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourcesSidebar;
