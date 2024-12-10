import React from 'react';
import { UploadSection } from '../components/UploadSection';

export function UploadPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-800 pt-20">
      <div className="container mx-auto px-4">
        {/* <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Upload Your Screenshot
        </h1> */}
        <UploadSection />
      </div>
    </main>
  );
}