import React, { useState } from 'react';
import { Document } from '../types';
import { PDFViewer } from './viewers/PDFViewer';
import { ImageViewer } from './viewers/ImageViewer';
import { TextViewer } from './viewers/TextViewer';
import { CodeViewer } from './viewers/CodeViewer';
import { SpreadsheetViewer } from './viewers/SpreadsheetViewer';
import { DocxViewer } from './viewers/DOCXViewer';

interface DocumentViewerProps {
  document: Document;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ document }) => {

  const renderViewer = () => {
    const { type, url, name, file } = document;

    switch (type) {
      case 'pdf':
        return <PDFViewer url={url} />;
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'png':
      case 'bmp':
      case 'webp':
        return <ImageViewer url={url} name={name} />;
      case 'txt':
        return <TextViewer url={url} />;
      case 'py':
      case 'js':
      case 'java':
      case 'kt':
      case 'ts':
      case 'json':
        return <CodeViewer url={url} />;
      case 'xls':
      case 'xlsx':
        return <SpreadsheetViewer url={url} />;
      case 'ppt':
      case 'pptx':
      case 'docx':
      case 'doc':
        return <DocxViewer file={file}/>
      default:
        return (
          <div className="text-center p-4">
            <p className="text-red-500">Unsupported file type: {type}</p>
            <p>Please try uploading a supported format.</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 border rounded-lg bg-white shadow">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{document.name}</h2>
      </div>
      {renderViewer()}
    </div>
  );
};