import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionobserver';
import { generateThumbnail, applyGrayscaleFilter } from '../utils/canvasUtils';

const PhotoCard = ({ photo, onPhotoUpdate }) => {
  const { isVisible, elementRef } = useIntersectionObserver();
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isVisible && !photo.thumbnail && !photo.processed) {
      setIsProcessing(true);
      generateThumbnail(photo.url)
        .then(thumbnail => {
          onPhotoUpdate({
            ...photo,
            thumbnail,
            processed: true,
          });
        })
        .catch(console.error)
        .finally(() => setIsProcessing(false));
    }
  }, [isVisible, photo, onPhotoUpdate]);

  const handleGrayscaleFilter = () => {
    setIsProcessing(true);
    applyGrayscaleFilter(photo.url)
      .then(filteredUrl => {
        onPhotoUpdate({
          ...photo,
          url: filteredUrl,
        });
      })
      .catch(console.error)
      .finally(() => setIsProcessing(false));
  };

  const getLocationText = () => {
    if (!photo.location) return 'No location';
    return `${photo.location.latitude.toFixed(4)}, ${photo.location.longitude.toFixed(4)}`;
  };

  return (
    <div
      ref={elementRef}
      className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg transition duration-300 border"
    >
      <div className="relative aspect-square bg-gray-100">
        {isVisible ? (
          <img
            src={photo.thumbnail || photo.url}
            alt="Photo"
            className={`w-full h-full object-cover rounded-t-2xl transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-t-2xl">
            <div className="animate-pulse bg-gray-300 w-full h-full" />
          </div>
        )}

        {isProcessing && (
          <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <button
          onClick={handleGrayscaleFilter}
          className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/80 hover:bg-white/90 shadow-sm text-gray-800 backdrop-blur-md transition"
          disabled={isProcessing}
          title="Apply Grayscale"
        >
          🎨
        </button>
      </div>

      <div className="p-3 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            📅 {new Date(photo.timestamp).toLocaleDateString()}
          </span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              photo.processed
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {photo.processed ? 'Processed' : 'Processing...'}
          </span>
        </div>
        <div className="text-sm text-gray-600">
          📍 {getLocationText()}
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
