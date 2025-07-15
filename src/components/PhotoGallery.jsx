import React, { useState, useEffect } from 'react';
import PhotoCard from './PhotoCard';
import { useGeolocation } from '../hooks/useGeolocation';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const { location } = useGeolocation();

  // Generate sample photos with location data
  useEffect(() => {
    const samplePhotos = [
      {
        id: '1',
        url: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
        location: location ? {
          latitude: location.latitude + 0.01,
          longitude: location.longitude + 0.01,
        } : { latitude: 40.7128, longitude: -74.0060 },
        timestamp: Date.now() - 86400000,
        processed: false,
      },
      {
        id: '2',
        url: 'https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg?auto=compress&cs=tinysrgb&w=800',
        location: location ? {
          latitude: location.latitude + 0.02,
          longitude: location.longitude - 0.01,
        } : { latitude: 40.7589, longitude: -73.9851 },
        timestamp: Date.now() - 172800000,
        processed: false,
      },
      {
        id: '3',
        url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
        location: location ? {
          latitude: location.latitude - 0.01,
          longitude: location.longitude + 0.02,
        } : { latitude: 40.6892, longitude: -74.0445 },
        timestamp: Date.now() - 259200000,
        processed: false,
      },
      {
        id: '4',
        url: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
        location: location ? {
          latitude: location.latitude + 0.005,
          longitude: location.longitude - 0.02,
        } : { latitude: 40.7505, longitude: -73.9934 },
        timestamp: Date.now() - 345600000,
        processed: false,
      },
      {
        id: '5',
        url: 'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=800',
        location: location ? {
          latitude: location.latitude - 0.02,
          longitude: location.longitude - 0.01,
        } : { latitude: 40.7282, longitude: -74.0776 },
        timestamp: Date.now() - 432000000,
        processed: false,
      },
      {
        id: '6',
        url: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=800',
        location: location ? {
          latitude: location.latitude + 0.03,
          longitude: location.longitude + 0.01,
        } : { latitude: 40.7614, longitude: -73.9776 },
        timestamp: Date.now() - 518400000,
        processed: false,
      },
    ];

    setPhotos(samplePhotos);
  }, [location]);

  const handlePhotoUpdate = (updatedPhoto) => {
    setPhotos(prev => 
      prev.map(photo => 
        photo.id === updatedPhoto.id ? updatedPhoto : photo
      )
    );
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto = {
          id: Date.now().toString() + Math.random(),
          url: e.target.result,
          location: location ? {
            latitude: location.latitude,
            longitude: location.longitude,
          } : null,
          timestamp: Date.now(),
          processed: false,
        };
        setPhotos(prev => [newPhoto, ...prev]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Smart Photo Gallery</h1>
          <label className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
            <span>📤</span>
            <span>Upload Photos</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
        
        <div className="text-sm text-gray-600 mb-4">
          {photos.length} photos • {photos.filter(p => p.processed).length} processed
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">🚀 Web APIs Used:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span><strong>Canvas API:</strong> Thumbnail generation & filters</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span><strong>Geolocation API:</strong> Location tagging</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span><strong>Intersection Observer:</strong> Lazy loading</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map(photo => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onPhotoUpdate={handlePhotoUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;