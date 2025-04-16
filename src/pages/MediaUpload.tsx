
import React from 'react';
import Layout from '../components/layout/Layout';
import { MediaUploadForm } from '../components/admin/MediaLibrary';

const MediaUploadPage = () => {
  return (
    <Layout>
      <div className="auxilio-container py-8">
        <MediaUploadForm />
      </div>
    </Layout>
  );
};

export default MediaUploadPage;
