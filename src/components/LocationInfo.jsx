import React from 'react';
import { useGeolocation } from '../hooks/useGeolocation';

const LocationInfo = () => {
  const { location, error, loading } = useGeolocation();

  const baseClasses = "inline-flex items-center space-x-2 px-3 py-1 text-sm rounded-full shadow-sm border bg-white";

  if (loading) {
    return (
      <div className={`${baseClasses} border-blue-200`}>
        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-gray-600">Getting location...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${baseClasses} border-red-200`}>
        <span className="text-red-500">📍</span>
        <span className="text-red-600">Location unavailable</span>
      </div>
    );
  }

  if (!location) return null;

  return (
    <div className={`${baseClasses} border-green-200`}>
      <span className="text-green-500">📍</span>
      <span className="text-gray-700">
        {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
      </span>
    </div>
  );
};

export default LocationInfo;
