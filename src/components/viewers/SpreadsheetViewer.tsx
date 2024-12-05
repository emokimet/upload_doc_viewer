import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

interface SpreadsheetViewerProps {
  url: string;
}

export const SpreadsheetViewer: React.FC<SpreadsheetViewerProps> = ({ url }) => {
  const [data, setData] = useState<any[][]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch(url)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
        setData(data);
      })
      .catch((err) => setError('Failed to load spreadsheet'));
  }, [url]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell: any, cellIndex: number) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};