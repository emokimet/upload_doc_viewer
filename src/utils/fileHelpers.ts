import { SupportedFileType } from '../types';

export const MAX_FILE_SIZE = 15 * 1024 * 1024; // 5MB

export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

export const isValidFileType = (filename: string): boolean => {
  const extension = getFileExtension(filename);
  const validTypes: SupportedFileType[] = [
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'png', 'jpg', 'jpeg', 'gif', 'ppt', 'pptx', 'js', 'py', 'bmp', 'gif', 'java', 'json', 'kt', 'ts', 'webp'
  ];
  return validTypes.includes(extension as SupportedFileType);
};

export const getFileType = (filename: string): SupportedFileType | null => {
  const extension = getFileExtension(filename);
  return isValidFileType(filename) ? extension as SupportedFileType : null;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};