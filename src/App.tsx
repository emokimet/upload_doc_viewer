import React, { useState } from 'react';
import { FileText, Upload } from 'lucide-react';
import { Document } from './types';
import { DocumentViewer } from './components/DocumentViewer';
import { FileUploader } from './components/FileUploader';
import { MenuBar } from './components/MenuBar/MenuBar';

function App() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showUploader, setShowUploader] = useState(false);

  const handleFileSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    
    const newDocument: Document = {
      id: Date.now().toString(),
      name: file.name,
      type: fileExtension as Document['type'],
      url
    };

    setSelectedDocument(newDocument);
    setShowUploader(false);
  };

  const handleReset = () => {
    setSelectedDocument(null);
    if (selectedDocument?.url) {
      URL.revokeObjectURL(selectedDocument.url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MenuBar />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Document Viewer</h1>
            </div>
            {selectedDocument && (
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Upload Another Document
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {selectedDocument ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <DocumentViewer document={selectedDocument} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            {showUploader ? (
              <div className="w-full max-w-xl">
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Upload a Document
                </h2>
                <p className="text-gray-600 mb-6">
                  Support for PDF, Word, Excel, Text, Images, and JavaScript files
                </p>
                <button
                  onClick={() => setShowUploader(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Upload className="w-5 h-5" />
                  Select File
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;