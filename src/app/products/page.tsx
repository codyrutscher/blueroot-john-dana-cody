"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  brand: string;
  status: string;
  createdAt: string;
  gate2Complete?: boolean;
  gate3Complete?: boolean;
  psfComplete?: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductBrand, setNewProductBrand] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async () => {
    if (!newProductName || !newProductBrand) {
      alert("Please fill in both product name and brand");
      return;
    }
    
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newProductName, brand: newProductBrand }),
      });
      if (res.ok) {
        setNewProductName("");
        setNewProductBrand("");
        setShowNewForm(false);
        fetchProducts();
      } else {
        const error = await res.text();
        console.error("Create failed:", error);
        alert("Failed to create product");
      }
    } catch (err) {
      console.error("Failed to create product:", err);
      alert("Failed to create product");
    }
  };

  const BRANDS = ["Vital Nutrients", "Bariatric Fusion", "Fairhaven Health", "Unjury"];

  return (
    <main className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="text-gray-400">Manage your product development pipeline</p>
        </div>
        <button
          onClick={() => setShowNewForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
        >
          + New Product
        </button>
      </div>

      {showNewForm && (
        <div className="bg-slate-800 border-2 border-gray-600 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4">Create New Product</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1">Product Name</label>
              <input
                type="text"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                className="w-full border-2 border-gray-600 rounded-lg p-2 bg-slate-700 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1">Brand</label>
              <select
                value={newProductBrand}
                onChange={(e) => setNewProductBrand(e.target.value)}
                className="w-full border-2 border-gray-600 rounded-lg p-2 bg-slate-700 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select brand...</option>
                {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={createProduct} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Create</button>
            <button onClick={() => setShowNewForm(false)} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-gray-400">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg mb-2">No products yet</p>
          <p className="text-sm">Click "New Product" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="bg-slate-800 border-2 border-gray-600 rounded-lg p-4 hover:border-blue-500 transition">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">{product.name}</h3>
                  <p className="text-gray-400">{product.brand}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${product.gate2Complete ? "bg-green-600" : "bg-gray-600"} text-white`}>Gate 2</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${product.gate3Complete ? "bg-green-600" : "bg-gray-600"} text-white`}>Gate 3</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${product.psfComplete ? "bg-green-600" : "bg-gray-600"} text-white`}>PSF</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Link href={`/products/${product.id}/financial`} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">Financial</Link>
                <Link href={`/products/${product.id}/gate2`} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">Gate 2</Link>
                <Link href={`/products/${product.id}/gate3`} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">Gate 3</Link>
                <Link href={`/products/${product.id}/psf`} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">PSF</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
