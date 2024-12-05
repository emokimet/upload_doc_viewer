import React, { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeViewerProps {
  url: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ url }) => {
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch(url)
      .then((response) => response.text())
      .then(setContent)
      .catch((err) => setError('Failed to load code content'));
  }, [url]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="w-full max-w-4xl">
      <SyntaxHighlighter 
        language="javascript" 
        style={github}
        className="rounded-lg shadow"
      >
        {content}
      </SyntaxHighlighter>
    </div>
  );
};