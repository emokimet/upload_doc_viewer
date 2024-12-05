import React, { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { FileUploadError } from '../types';
import { MAX_FILE_SIZE, isValidFileType, formatFileSize } from '../utils/fileHelpers';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<FileUploadError | null>(null);

  const validateFile = (file: File): FileUploadError | null => {
    if (file.size > MAX_FILE_SIZE) {
      return {
        message: `File size exceeds ${formatFileSize(MAX_FILE_SIZE)}`,
        code: 'FILE_TOO_LARGE'
      };
    }

    if (!isValidFileType(file.name)) {
      return {
        message: 'Unsupported file type',
        code: 'UNSUPPORTED_TYPE'
      };
    }

    return null;
  };

  const handleFile = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    onFileSelect(file);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-4 bg-red-50 rounded-lg flex items-center justify-between">
          <span className="text-red-700">{error.message}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-700 hover:text-red-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center ${dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          onChange={handleChange}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.png,.jpg,.jpeg,.gif,.ppt,.pptx,.webp,.java,.kt,.py"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop a file here, or click to select
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Supported formats: PDF, DOC, DOCX, XLS, XLSX, TXT, PNG, JPG, JPEG, GIF, PPT, PPTX, WEBP, JAVA, KT
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Maximum file size: {formatFileSize(MAX_FILE_SIZE)}
        </p>
      </div>
    </div>
  );
};