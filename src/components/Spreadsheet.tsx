"use client";

import { useState, useEffect, useCallback } from "react";

export default function Spreadsheet() {
  const [data, setData] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/data");
      const json = await res.json();
      setData(json.data || []);
    } catch (error) {
      console.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleCellClick = (row: number, col: number, value: string) => {
    setEditingCell({ row, col });
    setEditValue(value || "");
  };

  const handleCellBlur = useCallback(async () => {
    if (!editingCell) return;

    const { row, col } = editingCell;
    const newData = [...data];
    newData[row] = [...newData[row]];
    newData[row][col] = editValue;
    setData(newData);
    setEditingCell(null);

    await fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ row, col, value: editValue }),
    });
  }, [editingCell, editValue, data]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCellBlur();
    } else if (e.key === "Escape") {
      setEditingCell(null);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-700">Loading spreadsheet...</div>;
  }

  return (
    <div className="overflow-auto max-h-[calc(100vh-120px)]">
      <table className="border-collapse text-xs">
        <thead className="sticky top-0 z-10">
          <tr>
            <th className="border-2 border-gray-400 px-1 py-1 bg-gray-700 text-white font-bold min-w-[40px]">#</th>
            {data[0]?.map((_, colIndex) => (
              <th key={colIndex} className="border-2 border-gray-400 px-2 py-1 bg-gray-700 text-white font-bold min-w-[80px]">
                {getColumnLetter(colIndex)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-blue-200">
              <td className="border-2 border-gray-400 px-1 py-1 bg-gray-200 text-gray-800 text-center font-bold">
                {rowIndex + 1}
              </td>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className="border border-gray-300 px-1 py-1 cursor-pointer bg-white text-gray-900 hover:bg-yellow-100 hover:border-blue-500"
                  onClick={() => handleCellClick(rowIndex, colIndex, cell)}
                >
                  {editingCell?.row === rowIndex && editingCell?.col === colIndex ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={handleCellBlur}
                      onKeyDown={handleKeyDown}
                      className="w-full px-1 py-0 border-2 border-blue-500 outline-none bg-yellow-50 text-gray-900"
                      autoFocus
                    />
                  ) : (
                    <span className="block truncate max-w-[150px]">{cell}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getColumnLetter(index: number): string {
  let letter = "";
  while (index >= 0) {
    letter = String.fromCharCode((index % 26) + 65) + letter;
    index = Math.floor(index / 26) - 1;
  }
  return letter;
}
