// Add new supported file types for images and PowerPoint files
export type SupportedFileType = 
  | 'pdf' 
  | 'doc' 
  | 'docx' 
  | 'xls' 
  | 'xlsx' 
  | 'txt' 
  | 'bmp' 
  | 'webp' 
  | 'java' 
  | 'kt' 
  | 'ts' 
  | 'json' 
  | 'png' 
  | 'jpg' 
  | 'jpeg' 
  | 'gif' 
  | 'ppt' 
  | 'pptx' 
  | 'py' 
  | 'js';

// The Document interface remains unchanged but supports new file types now
export interface Document {
  id: string;
  name: string;
  type: SupportedFileType;
  url: string;
  file: File;
}

// File upload error remains as is
export interface FileUploadError {
  message: string;
  code: 'FILE_TOO_LARGE' | 'UNSUPPORTED_TYPE' | 'UPLOAD_FAILED';
}
