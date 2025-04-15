
import React from 'react';
import MediaGallery, { MediaItem } from './MediaGallery';

const MediaGalleryExample: React.FC = () => {
  // Ejemplo de lista de contenido multimedia para primeros auxilios
  const mediaItems: MediaItem[] = [
    {
      id: '1',
      type: 'video',
      src: 'https://www.youtube.com/embed/FEaOPDrGytI',
      alt: 'Video tutorial RCP',
      title: 'Video tutorial: Aprende a realizar la RCP correctamente',
      caption: 'Técnicas básicas de reanimación cardiopulmonar',
      description: 'Este video muestra paso a paso cómo realizar correctamente la técnica de RCP en adultos.'
    },
    {
      id: '2',
      type: 'image',
      src: '/public/lovable-uploads/e2e52e18-89b1-4e08-b291-d95ba0905b9c.png',
      alt: 'Maniobra de Heimlich',
      title: 'Maniobra de Heimlich',
      caption: 'Técnica para atragantamientos',
      description: 'Imagen ilustrativa de cómo realizar la maniobra de Heimlich en caso de atragantamiento.'
    },
    {
      id: '3',
      type: 'infographic',
      src: '/public/lovable-uploads/dc722280-280d-4315-ba28-776a2b6b2889.png',
      alt: 'Señales de ataque cardíaco',
      title: 'Señales de ataque cardíaco',
      description: 'Infografía que muestra las principales señales de alerta de un ataque cardíaco.'
    },
    {
      id: '4',
      type: 'video',
      src: 'https://www.youtube.com/embed/xxxxx',
      alt: 'Cómo tratar quemaduras',
      title: 'Primeros auxilios para quemaduras',
      caption: 'Tratamiento inicial de quemaduras',
      description: 'Aprende cómo actuar correctamente ante diferentes tipos de quemaduras.'
    },
    {
      id: '5',
      type: 'image',
      src: '/public/lovable-uploads/c03ef8f0-debc-4d4a-82b9-f87b87fad2f5.png',
      alt: 'Posición lateral de seguridad',
      title: 'Posición lateral de seguridad',
      caption: 'Técnica de primeros auxilios',
      description: 'Guía visual sobre cómo colocar a una persona inconsciente en posición lateral de seguridad.'
    },
    {
      id: '6',
      type: 'infographic',
      src: '/public/lovable-uploads/00ffee74-5121-4d1b-a76a-9aca46e82be7.png',
      alt: 'Protocolo de emergencia',
      title: 'Protocolo para emergencias',
      description: 'Infografía con el paso a paso a seguir en situaciones de emergencia.'
    },
  ];

  return (
    <div className="auxilio-container py-8">
      <MediaGallery
        title="Recursos multimedia de primeros auxilios"
        description="Colección de videos, imágenes e infografías para aprender técnicas de primeros auxilios."
        items={mediaItems}
      />
    </div>
  );
};

export default MediaGalleryExample;
