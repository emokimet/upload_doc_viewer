export type SupportedFileType = 
  | 'pdf' 
  | 'doc' 
  | 'docx' 
  | 'xls' 
  | 'xlsx' 
  | 'txt' 
  | 'png' 
  | 'js';

export interface Document {
  id: string;
  name: string;
  type: SupportedFileType;
  url: string;
}

export interface FileUploadError {
  message: string;
  code: 'FILE_TOO_LARGE' | 'UNSUPPORTED_TYPE' | 'UPLOAD_FAILED';
}