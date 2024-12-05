import React, { useEffect, useState } from 'react';

interface TextViewerProps {
  url: string;
}

export const TextViewer: React.FC<TextViewerProps> = ({ url }) => {
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch(url)
      .then((response) => response.text())
      .then(setContent)
      .catch((err) => setError('Failed to load text content'));
  }, [url]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="w-full max-w-4xl">
      <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg shadow text-sm">
        {content}
      </pre>
    </div>
  );
};