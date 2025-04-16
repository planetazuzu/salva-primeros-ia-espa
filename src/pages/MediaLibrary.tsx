
import React from 'react';
import Layout from '../components/layout/Layout';
import { MediaLibraryManager } from '../components/admin/MediaLibrary/index';

const MediaLibraryPage = () => {
  return (
    <Layout>
      <div className="auxilio-container py-8">
        <h1 className="text-3xl font-bold text-auxilio-azul mb-6">Biblioteca de Medios</h1>
        <MediaLibraryManager />
      </div>
    </Layout>
  );
};

export default MediaLibraryPage;
