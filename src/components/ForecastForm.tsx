"use client";

import { useState } from "react";

type FormPath = "start" | "continue" | "review" | null;

const BRANDS = ["Vital Nutrients", "Bariatric Fusion", "Fairhaven Health", "Unjury"];
const FORMATS = ["capsule", "tablet", "powder", "sachet", "softgel", "stickpak", "quickmelt"];

const DEFAULT_PERCENTAGES = {
  dtcAdjusted: { percent: 100, adjustment: -5 },
  wsp: { percent: 50, adjustment: 0 },
  amazon: { percent: 59, adjustment: 0 },
  emersonFullscript: { percent: 75, adjustment: 0 },
  iherbAdjusted: { percent: 55, adjustment: -5 },
  domesticWholesaler: { percent: 50, adjustment: 0 },
  domesticDistributor: { percent: 50, adjustment: 0 },
  domesticETailer: { percent: 50, adjustment: 0 },
  internationalWholesaler: { percent: 50, adjustment: 0 },
  internationalDistributor: { percent: 50, adjustment: 0 },
  internationalETailer: { percent: 50, adjustment: 0 },
};

interface PricingConfig {
  percent: number;
  adjustment: number;
}

export default function ForecastForm() {
  const [path, setPath] = useState<FormPath>(null);
  const [brand, setBrand] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [targetedLaunchDate, setTargetedLaunchDate] = useState("");
  const [format, setFormat] = useState("");
  const [dtcPrice, setDtcPrice] = useState("");
  const [percentages, setPercentages] = useState<Record<string, PricingConfig>>(DEFAULT_PERCENTAGES);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const calculatePrice = (key: string): string => {
    const dtc = parseFloat(dtcPrice) || 0;
    if (dtc === 0) return "$0.00";
    const config = percentages[key];
    const price = (dtc * config.percent / 100) + config.adjustment;
    return `$${price.toFixed(2)}`;
  };

  const updatePercent = (key: string, value: number) => {
    setPercentages(prev => ({
      ...prev,
      [key]: { ...prev[key], percent: value }
    }));
  };

  const updateAdjustment = (key: string, value: number) => {
    setPercentages(prev => ({
      ...prev,
      [key]: { ...prev[key], adjustment: value }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const formData = {
      path,
      brand,
      productName,
      productDescription,
      targetedLaunchDate,
      format,
      pricing: {
        dtc: parseFloat(dtcPrice) || 0,
        dtcAdjusted: parseFloat(calculatePrice("dtcAdjusted").replace("$", "")),
        wsp: parseFloat(calculatePrice("wsp").replace("$", "")),
        amazon: parseFloat(calculatePrice("amazon").replace("$", "")),
        emersonFullscript: parseFloat(calculatePrice("emersonFullscript").replace("$", "")),
        iherbAdjusted: parseFloat(calculatePrice("iherbAdjusted").replace("$", "")),
        domesticWholesaler: parseFloat(calculatePrice("domesticWholesaler").replace("$", "")),
        domesticDistributor: parseFloat(calculatePrice("domesticDistributor").replace("$", "")),
        domesticETailer: parseFloat(calculatePrice("domesticETailer").replace("$", "")),
        internationalWholesaler: parseFloat(calculatePrice("internationalWholesaler").replace("$", "")),
        internationalDistributor: parseFloat(calculatePrice("internationalDistributor").replace("$", "")),
        internationalETailer: parseFloat(calculatePrice("internationalETailer").replace("$", "")),
      },
      percentages,
    };

    try {
      const res = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("Product saved successfully!");
      } else {
        setMessage("Failed to save product");
      }
    } catch (error) {
      setMessage("Error saving product");
    } finally {
      setSaving(false);
    }
  };

  // Path selection screen
  if (!path) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">New Product Development</h1>
        <p className="text-gray-700 mb-8">Select a path to continue:</p>
        
        <div className="space-y-4">
          <button
            onClick={() => setPath("start")}
            className="w-full p-4 text-left border-2 border-gray-300 rounded-lg bg-white hover:border-blue-600 hover:bg-blue-100 transition shadow-sm"
          >
            <div className="font-semibold text-lg text-gray-900">Start Development of New Product</div>
            <div className="text-gray-600 text-sm">Begin a new product from scratch</div>
          </button>
          
          <button
            onClick={() => setPath("continue")}
            className="w-full p-4 text-left border-2 border-gray-300 rounded-lg bg-white hover:border-blue-600 hover:bg-blue-100 transition shadow-sm"
          >
            <div className="font-semibold text-lg text-gray-900">Continue Development of New Product</div>
            <div className="text-gray-600 text-sm">Resume work on an existing product</div>
          </button>
          
          <button
            onClick={() => setPath("review")}
            className="w-full p-4 text-left border-2 border-gray-300 rounded-lg bg-white hover:border-blue-600 hover:bg-blue-100 transition shadow-sm"
          >
            <div className="font-semibold text-lg text-gray-900">Review Finalized New Product</div>
            <div className="text-gray-600 text-sm">View and approve a completed product</div>
          </button>
        </div>
      </div>
    );
  }


  const pricingRows = [
    { key: "dtcAdjusted", label: "DTC Adjusted", formula: "DTC - 5%" },
    { key: "wsp", label: "WSP", formula: "50% of DTC" },
    { key: "amazon", label: "Amazon", formula: "59% of DTC" },
    { key: "emersonFullscript", label: "Emerson/Fullscript", formula: "75% of DTC" },
    { key: "iherbAdjusted", label: "iHerb Adjusted", formula: "55% of DTC - 5%" },
    { key: "domesticWholesaler", label: "Domestic Wholesaler", formula: "50% of DTC" },
    { key: "domesticDistributor", label: "Domestic Distributor", formula: "50% of DTC" },
    { key: "domesticETailer", label: "Domestic eTailer", formula: "50% of DTC" },
    { key: "internationalWholesaler", label: "International Wholesaler", formula: "50% of DTC" },
    { key: "internationalDistributor", label: "International Distributor", formula: "50% of DTC" },
    { key: "internationalETailer", label: "International eTailer", formula: "50% of DTC" },
  ];

  const inputClasses = "w-full border-2 border-gray-300 rounded-lg p-2 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none";
  const labelClasses = "block text-sm font-semibold text-gray-800 mb-1";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setPath(null)}
          className="text-blue-700 font-medium hover:text-blue-900 hover:underline"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {path === "start" && "Start Development of New Product"}
          {path === "continue" && "Continue Development of New Product"}
          {path === "review" && "Review Finalized New Product"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Info Section */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6 space-y-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Product Information</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className={inputClasses}
                required
              >
                <option value="">Select brand...</option>
                {BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className={labelClasses}>Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className={inputClasses}
                required
              >
                <option value="">Select format...</option>
                {FORMATS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClasses}>Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className={labelClasses}>Product Description</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className={inputClasses}
              rows={3}
            />
          </div>

          <div>
            <label className={labelClasses}>Targeted Launch Date</label>
            <input
              type="date"
              value={targetedLaunchDate}
              onChange={(e) => setTargetedLaunchDate(e.target.value)}
              className={inputClasses}
            />
          </div>
        </div>


        {/* Pricing Section */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6 space-y-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Pricing</h2>
          
          <div className="mb-4">
            <label className={labelClasses}>DTC Price ($)</label>
            <input
              type="number"
              step="0.01"
              value={dtcPrice}
              onChange={(e) => setDtcPrice(e.target.value)}
              className="w-48 border-2 border-gray-300 rounded-lg p-2 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              placeholder="0.00"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="border-2 border-gray-500 p-2 text-left font-bold">Channel</th>
                  <th className="border-2 border-gray-500 p-2 text-left w-24 font-bold">% of DTC</th>
                  <th className="border-2 border-gray-500 p-2 text-left w-24 font-bold">Adjustment ($)</th>
                  <th className="border-2 border-gray-500 p-2 text-left w-32 font-bold">Calculated Price</th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row) => (
                  <tr key={row.key} className="hover:bg-yellow-100 bg-white">
                    <td className="border-2 border-gray-300 p-2">
                      <div className="font-semibold text-gray-900">{row.label}</div>
                      <div className="text-gray-500 text-xs">{row.formula}</div>
                    </td>
                    <td className="border-2 border-gray-300 p-1">
                      <input
                        type="number"
                        value={percentages[row.key].percent}
                        onChange={(e) => updatePercent(row.key, parseFloat(e.target.value) || 0)}
                        className="w-full p-1 border-2 border-gray-300 rounded text-center bg-white text-gray-900 focus:border-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="border-2 border-gray-300 p-1">
                      <input
                        type="number"
                        step="0.01"
                        value={percentages[row.key].adjustment}
                        onChange={(e) => updateAdjustment(row.key, parseFloat(e.target.value) || 0)}
                        className="w-full p-1 border-2 border-gray-300 rounded text-center bg-white text-gray-900 focus:border-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="border-2 border-gray-300 p-2 font-mono font-bold bg-green-100 text-green-800">
                      {calculatePrice(row.key)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 shadow-md"
          >
            {saving ? "Saving..." : "Save Product"}
          </button>

          {message && (
            <span className={`font-semibold ${message.includes("success") ? "text-green-700" : "text-red-700"}`}>
              {message}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
