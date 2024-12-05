import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

interface SpreadsheetViewerProps {
  url: string;
}

export const SpreadsheetViewer: React.FC<SpreadsheetViewerProps> = ({ url }) => {
  const [sheets, setSheets] = useState<string[]>([]);
  const [activeSheet, setActiveSheet] = useState<string>('');
  const [data, setData] = useState<any[][]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch(url)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheetNames = workbook.SheetNames;
        setSheets(sheetNames);

        if (sheetNames.length > 0) {
          const firstSheet = sheetNames[0];
          setActiveSheet(firstSheet);
          const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], { header: 1 });
          setData(sheetData);
        }
      })
      .catch((err) => setError('Failed to load spreadsheet'));
  }, [url]);

  const handleSheetChange = (sheetName: string) => {
    setActiveSheet(sheetName);
    fetch(url)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
        setData(sheetData);
      })
      .catch((err) => setError('Failed to switch sheet'));
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      {/* Tabs for switching between sheets */}
      <div className="mb-4 flex space-x-4">
        {sheets.map((sheetName) => (
          <button
            key={sheetName}
            onClick={() => handleSheetChange(sheetName)}
            className={`px-4 py-2 rounded ${
              sheetName === activeSheet
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {sheetName}
          </button>
        ))}
      </div>

      {/* Data Table */}
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
