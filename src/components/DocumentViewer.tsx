import React from 'react';
import { Document } from '../types';
import { PDFViewer } from './viewers/PDFViewer';
import { ImageViewer } from './viewers/ImageViewer';
import { TextViewer } from './viewers/TextViewer';
import { CodeViewer } from './viewers/CodeViewer';
import { SpreadsheetViewer } from './viewers/SpreadsheetViewer';

interface DocumentViewerProps {
  document: Document;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ document }) => {
  const renderViewer = () => {
    switch (document.type) {
      case 'pdf':
        return <PDFViewer url={document.url} />;
      case 'png':
        return <ImageViewer url={document.url} name={document.name} />;
      case 'txt':
        return <TextViewer url={document.url} />;
      case 'js':
        return <CodeViewer url={document.url} />;
      case 'xls':
      case 'xlsx':
        return <SpreadsheetViewer url={document.url} />;
      case 'doc':
      case 'docx':
        return (
          <div className="text-center p-4">
            <p className="text-gray-600">
              Preview not available for {document.type.toUpperCase()} files.
              Please download to view.
            </p>
          </div>
        );
      default:
        return (
          <div className="text-center p-4">
            <p className="text-red-500">Unsupported file type</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">{document.name}</h2>
      {renderViewer()}
    </div>
  );
};