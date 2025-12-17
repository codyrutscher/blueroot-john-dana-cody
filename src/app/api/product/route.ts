import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { loadCSV, saveData } from "@/lib/csvStore";

const PRODUCTS_PATH = path.join(process.cwd(), "products.json");

// Map form pricing keys to spreadsheet rows (0-indexed)
// Column 6 = MSRP column (G)
const PRICING_TO_CELL_MAP: Record<string, { row: number; col: number }> = {
  emersonFullscript: { row: 3, col: 6 },
  amazon: { row: 4, col: 6 },
  dtc: { row: 5, col: 6 },
  dtcAdjusted: { row: 5, col: 9 }, // Net Sales column for adjusted
  iherbAdjusted: { row: 6, col: 6 },
  domesticWholesaler: { row: 7, col: 6 },
  domesticDistributor: { row: 8, col: 6 },
  domesticETailer: { row: 9, col: 6 },
  internationalWholesaler: { row: 10, col: 6 },
  internationalDistributor: { row: 11, col: 6 },
  internationalETailer: { row: 12, col: 6 },
};

function loadProducts() {
  if (fs.existsSync(PRODUCTS_PATH)) {
    return JSON.parse(fs.readFileSync(PRODUCTS_PATH, "utf-8"));
  }
  return [];
}

function saveProducts(products: unknown[]) {
  fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(products, null, 2));
}

export async function GET() {
  try {
    const products = loadProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const product = await request.json();
    product.id = Date.now().toString();
    product.createdAt = new Date().toISOString();
    product.updatedAt = new Date().toISOString();

    // Save to products.json
    const products = loadProducts();
    products.push(product);
    saveProducts(products);

    // Update the spreadsheet with pricing data
    if (product.pricing) {
      const data = loadCSV();
      
      for (const [key, value] of Object.entries(product.pricing)) {
        const cellMap = PRICING_TO_CELL_MAP[key];
        if (cellMap && data[cellMap.row]) {
          // Format as currency
          const price = typeof value === 'number' ? `$${value.toFixed(2)}` : value;
          data[cellMap.row][cellMap.col] = price as string;
        }
      }
      
      saveData(data);
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Error saving product:", error);
    return NextResponse.json({ error: "Failed to save product" }, { status: 500 });
  }
}
