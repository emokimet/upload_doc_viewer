import React from 'react';

interface ImageViewerProps {
  url: string;
  name: string;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ url, name }) => {
  return (
    <div className="flex flex-col items-center">
      <img src={url} alt={name} className="max-w-full h-auto rounded-lg shadow-lg" />
      <p className="mt-2 text-sm text-gray-600">{name}</p>
    </div>
  );
};