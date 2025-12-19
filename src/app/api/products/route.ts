import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Use absolute path to avoid issues with spaces in directory names
const DATA_PATH = path.join(process.cwd(), "products.json");

export interface Product {
  id: string;
  name: string;
  brand: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  financial?: Record<string, unknown>;
  gate2?: Record<string, unknown>;
  gate3?: Record<string, unknown>;
  psf?: Record<string, unknown>;
  gate2Complete?: boolean;
  gate3Complete?: boolean;
  psfComplete?: boolean;
}

export function loadProducts(): Product[] {
  if (fs.existsSync(DATA_PATH)) {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  }
  return [];
}

export function saveProducts(products: Product[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2));
}

export function getProduct(id: string): Product | undefined {
  const products = loadProducts();
  return products.find(p => p.id === id);
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = loadProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  products[index] = { ...products[index], ...updates, updatedAt: new Date().toISOString() };
  saveProducts(products);
  return products[index];
}

export async function GET() {
  try {
    const products = loadProducts();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "Failed to load" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, brand } = await request.json();
    
    console.log("Creating product:", { name, brand });
    console.log("DATA_PATH:", DATA_PATH);
    console.log("CWD:", process.cwd());
    console.log("File exists:", fs.existsSync(DATA_PATH));
    
    // Ensure the file exists
    if (!fs.existsSync(DATA_PATH)) {
      console.log("Creating products.json file...");
      fs.writeFileSync(DATA_PATH, "[]");
    }
    
    const product: Product = {
      id: Date.now().toString(),
      name,
      brand,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      gate2Complete: false,
      gate3Complete: false,
      psfComplete: false,
    };

    const products = loadProducts();
    console.log("Loaded products:", products.length);
    
    products.push(product);
    saveProducts(products);
    
    console.log("Product saved successfully");

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Error creating product:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : "";
    return NextResponse.json({ 
      error: "Failed to create", 
      details: errorMessage,
      stack: errorStack,
      cwd: process.cwd(),
      dataPath: DATA_PATH
    }, { status: 500 });
  }
}
