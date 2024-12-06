import React, { useState, useEffect } from 'react';
import mammoth from 'mammoth';

interface Props {
  file: File | null; // file prop, can be null if no file is provided
}

export const DocxViewer: React.FC<Props> = ({ file }) => {
  const [documentHtml, setDocumentHtml] = useState<string>('');

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          const arrayBuffer = e.target.result as ArrayBuffer;
          mammoth.convertToHtml({ arrayBuffer })
            .then((result) => {
              setDocumentHtml(result.value);
            })
            .catch((error) => {
              console.error('Error reading DOCX file:', error);
            });
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          border: '1px solid #ccc',
          maxHeight: '800px',
          width: "600px",
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          textAlign: 'left',
        }}
        dangerouslySetInnerHTML={{ __html: documentHtml }}
      />
    </div>
  );
};
