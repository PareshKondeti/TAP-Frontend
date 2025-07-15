import React from 'react';
import PhotoGallery from './components/PhotoGallery';
import LocationInfo from './components/LocationInfo';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-semibold text-gray-900">📸 Smart Gallery</h1>
              <div className="hidden sm:flex items-center space-x-3 text-sm text-gray-500">
                <span>•</span>
                <span>Location-aware</span>
                <span>•</span>
                <span>Lazy loading</span>
                <span>•</span>
                <span>Canvas processing</span>
              </div>
            </div>
            <LocationInfo />
          </div>
        </div>
      </header>

      <main className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <PhotoGallery />
        </div>
      </main>

      <footer className="bg-white border-t mt-16 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500">
            Powered by Canvas, Geolocation & Intersection Observer APIs
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
