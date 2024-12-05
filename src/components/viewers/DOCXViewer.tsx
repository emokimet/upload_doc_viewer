import React from 'react';

interface DOCXViewerProps {
  url: string;
}

export const DOCXViewer: React.FC<DOCXViewerProps> = ({ url }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Document Viewer</h2>
      <iframe
        src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(url)}`}
        width="100%"
        height="600px"
        frameBorder="0"
        title="DOCX Viewer"
      />
    </div>
  );
};
