"use client";

import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  brand: string;
  financial?: {
    msrp?: number;
    quantities?: { year1: number; year2: number; year3: number };
    pricing?: Record<string, number>;
    channelWeights?: Record<string, number>;
  };
}

export default function SpreadsheetPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-8 text-white">Loading spreadsheet...</div>;
  }

  const months = Array.from({ length: 36 }, (_, i) => `M${i + 1}`);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Forecasting Spreadsheet</h1>
      <p className="text-gray-400 mb-6">36-month projections for all products</p>

      {products.length === 0 ? (
        <div className="text-gray-400 text-center py-12">
          No products yet. Create products to see forecasting data.
        </div>
      ) : (
        <div className="overflow-auto max-h-[calc(100vh-200px)]">
          <table className="border-collapse text-xs w-full">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-700">
                <th className="border border-gray-600 px-2 py-2 text-white font-bold sticky left-0 bg-gray-700 z-20">Product</th>
                <th className="border border-gray-600 px-2 py-2 text-white font-bold">Brand</th>
                <th className="border border-gray-600 px-2 py-2 text-white font-bold">MSRP</th>
                <th className="border border-gray-600 px-2 py-2 text-white font-bold">Y1 Qty</th>
                <th className="border border-gray-600 px-2 py-2 text-white font-bold">Y2 Qty</th>
                <th className="border border-gray-600 px-2 py-2 text-white font-bold">Y3 Qty</th>
                {months.map(m => (
                  <th key={m} className="border border-gray-600 px-2 py-1 text-white font-bold text-center">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const fin = product.financial;
                const y1 = fin?.quantities?.year1 || 0;
                const y2 = fin?.quantities?.year2 || 0;
                const y3 = fin?.quantities?.year3 || 0;
                const monthlyY1 = Math.round(y1 / 12);
                const monthlyY2 = Math.round(y2 / 12);
                const monthlyY3 = Math.round(y3 / 12);

                return (
                  <tr key={product.id} className="hover:bg-slate-700">
                    <td className="border border-gray-600 px-2 py-2 text-white font-semibold sticky left-0 bg-slate-800">{product.name}</td>
                    <td className="border border-gray-600 px-2 py-2 text-gray-300">{product.brand}</td>
                    <td className="border border-gray-600 px-2 py-2 text-green-400 font-mono">${fin?.msrp?.toFixed(2) || "0.00"}</td>
                    <td className="border border-gray-600 px-2 py-2 text-gray-300 text-center">{y1.toLocaleString()}</td>
                    <td className="border border-gray-600 px-2 py-2 text-gray-300 text-center">{y2.toLocaleString()}</td>
                    <td className="border border-gray-600 px-2 py-2 text-gray-300 text-center">{y3.toLocaleString()}</td>
                    {months.map((_, i) => {
                      let qty = 0;
                      if (i < 12) qty = monthlyY1;
                      else if (i < 24) qty = monthlyY2;
                      else qty = monthlyY3;
                      return (
                        <td key={i} className="border border-gray-600 px-1 py-1 text-gray-400 text-center font-mono">
                          {qty > 0 ? qty.toLocaleString() : "-"}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
