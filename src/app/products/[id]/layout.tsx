"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const productId = params.id as string;
  const [productName, setProductName] = useState("");

  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => setProductName(data.name || "Product"))
      .catch(() => {});
  }, [productId]);

  const tabs = [
    { href: `/products/${productId}/financial`, label: "Financial Projections" },
    { href: `/products/${productId}/gate2`, label: "Gate 2" },
    { href: `/products/${productId}/gate3`, label: "Gate 3" },
    { href: `/products/${productId}/psf`, label: "PSF" },
  ];

  return (
    <div>
      <div className="bg-slate-700 border-b border-gray-600 px-6 py-3">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <Link href="/products" className="text-blue-400 hover:text-blue-300">← Back to Products</Link>
            <h2 className="text-xl font-bold text-white">{productName}</h2>
          </div>
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-4 py-2 rounded-t-lg font-medium transition ${
                  pathname === tab.href
                    ? "bg-slate-800 text-white"
                    : "bg-slate-600 text-gray-300 hover:bg-slate-500"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
