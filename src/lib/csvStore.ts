import fs from "fs";
import path from "path";
import Papa from "papaparse";

const CSV_PATH = path.join(process.cwd(), "newProduct.csv");
const DATA_PATH = path.join(process.cwd(), "data.json");

export function loadCSV(): string[][] {
  // Check if we have saved JSON data first
  if (fs.existsSync(DATA_PATH)) {
    const json = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(json);
  }

  // Otherwise load from CSV
  const csvContent = fs.readFileSync(CSV_PATH, "utf-8");
  const result = Papa.parse<string[]>(csvContent, { header: false });
  return result.data;
}

export function saveData(data: string[][]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

export function updateCell(row: number, col: number, value: string): string[][] {
  const data = loadCSV();
  if (data[row]) {
    data[row][col] = value;
    saveData(data);
  }
  return data;
}

export function updateCells(updates: { row: number; col: number; value: string }[]): string[][] {
  const data = loadCSV();
  for (const { row, col, value } of updates) {
    if (data[row]) {
      data[row][col] = value;
    }
  }
  saveData(data);
  return data;
}
