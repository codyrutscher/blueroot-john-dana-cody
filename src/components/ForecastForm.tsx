"use client";

import { useState, useMemo } from "react";

type FormPath = "start" | "continue" | "review" | null;
type Tab = "info" | "pricing" | "quantities" | "channels" | "testing" | "pnl";

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

const DEFAULT_CHANNEL_WEIGHTS = {
  emersonFullscript: 64,
  amazon: 10,
  dtc: 11,
  iherb: 5,
  domesticWholesaler: 5,
  domesticDistributor: 5,
  domesticETailer: 0,
  internationalWholesaler: 0,
  internationalDistributor: 0,
  internationalETailer: 0,
};

interface PricingConfig {
  percent: number;
  adjustment: number;
}

export default function ForecastForm() {
  const [path, setPath] = useState<FormPath>(null);
  const [activeTab, setActiveTab] = useState<Tab>("info");
  
  // Product Info
  const [brand, setBrand] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [targetedLaunchDate, setTargetedLaunchDate] = useState("");
  const [format, setFormat] = useState("");
  
  // Pricing
  const [msrp, setMsrp] = useState("");
  const [percentages, setPercentages] = useState<Record<string, PricingConfig>>(DEFAULT_PERCENTAGES);
  
  // Quantities
  const [year1Qty, setYear1Qty] = useState("");
  const [year2Qty, setYear2Qty] = useState("");
  const [year3Qty, setYear3Qty] = useState("");
  
  // Channel Weights
  const [channelWeights, setChannelWeights] = useState<Record<string, number>>(DEFAULT_CHANNEL_WEIGHTS);
  
  // COGS & Gross Margins (5 options)
  const [gmOptions, setGmOptions] = useState(["65", "60", "55", "50", "45"]);
  
  // Testing
  const [hmMicrosTests, setHmMicrosTests] = useState("");
  const [hmMicrosCost, setHmMicrosCost] = useState("");
  const [assayTests, setAssayTests] = useState("");
  const [assayCost, setAssayCost] = useState("");
  const [allergensTests, setAllergensTests] = useState("");
  const [allergensCost, setAllergensCost] = useState("");
  const [stabilityCost, setStabilityCost] = useState("");
  
  // Targeted Formula Cost (3 GM options)
  const [targetedGmOptions, setTargetedGmOptions] = useState(["40", "35", "30"]);
  
  // Preliminary P&L
  const [formulaFreight, setFormulaFreight] = useState("");
  const [testingCostPerBottle, setTestingCostPerBottle] = useState("");
  const [expectedGm, setExpectedGm] = useState("65");
  
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");


  // Calculate channel price from MSRP
  const calculatePrice = (key: string): number => {
    const dtc = parseFloat(msrp) || 0;
    if (dtc === 0) return 0;
    const config = percentages[key];
    return (dtc * config.percent / 100) + config.adjustment;
  };

  // Calculate Average Sales Price (exclude WSP and DTC, include DTC adjusted)
  const averageSalesPrice = useMemo(() => {
    const dtc = parseFloat(msrp) || 0;
    if (dtc === 0) return 0;
    
    const prices = [
      calculatePrice("dtcAdjusted"),
      calculatePrice("amazon"),
      calculatePrice("emersonFullscript"),
      calculatePrice("iherbAdjusted"),
      calculatePrice("domesticWholesaler"),
      calculatePrice("domesticDistributor"),
      calculatePrice("domesticETailer"),
      calculatePrice("internationalWholesaler"),
      calculatePrice("internationalDistributor"),
      calculatePrice("internationalETailer"),
    ];
    
    return prices.reduce((a, b) => a + b, 0) / prices.length;
  }, [msrp, percentages]);

  // Testing calculations
  const hmMicrosTotal = (parseFloat(hmMicrosTests) || 0) * (parseFloat(hmMicrosCost) || 0);
  const assayTotal = (parseFloat(assayTests) || 0) * (parseFloat(assayCost) || 0);
  const allergensTotal = (parseFloat(allergensTests) || 0) * (parseFloat(allergensCost) || 0);
  const fullPanelTotal = hmMicrosTotal + assayTotal + allergensTotal;
  
  const totalQty = (parseFloat(year1Qty) || 0) + (parseFloat(year2Qty) || 0) + (parseFloat(year3Qty) || 0);
  const fullPanelPerBottle = (parseFloat(year1Qty) || 0) > 0 ? fullPanelTotal / parseFloat(year1Qty) : 0;
  const stabilityAmortized = totalQty > 0 ? (parseFloat(stabilityCost) || 0) / totalQty : 0;

  // Expected COGS calculation
  const expectedCogs = (parseFloat(formulaFreight) || 0) + (parseFloat(testingCostPerBottle) || 0);

  const updatePercent = (key: string, value: number) => {
    setPercentages(prev => ({ ...prev, [key]: { ...prev[key], percent: value } }));
  };

  const updateAdjustment = (key: string, value: number) => {
    setPercentages(prev => ({ ...prev, [key]: { ...prev[key], adjustment: value } }));
  };

  const updateChannelWeight = (key: string, value: number) => {
    setChannelWeights(prev => ({ ...prev, [key]: value }));
  };

  const updateGmOption = (index: number, value: string) => {
    setGmOptions(prev => { const n = [...prev]; n[index] = value; return n; });
  };

  const updateTargetedGmOption = (index: number, value: string) => {
    setTargetedGmOptions(prev => { const n = [...prev]; n[index] = value; return n; });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const formData = {
      path, brand, productName, productDescription, targetedLaunchDate, format,
      msrp: parseFloat(msrp) || 0,
      pricing: {
        dtcAdjusted: calculatePrice("dtcAdjusted"),
        wsp: calculatePrice("wsp"),
        amazon: calculatePrice("amazon"),
        emersonFullscript: calculatePrice("emersonFullscript"),
        iherbAdjusted: calculatePrice("iherbAdjusted"),
        domesticWholesaler: calculatePrice("domesticWholesaler"),
        domesticDistributor: calculatePrice("domesticDistributor"),
        domesticETailer: calculatePrice("domesticETailer"),
        internationalWholesaler: calculatePrice("internationalWholesaler"),
        internationalDistributor: calculatePrice("internationalDistributor"),
        internationalETailer: calculatePrice("internationalETailer"),
      },
      percentages,
      averageSalesPrice,
      quantities: {
        year1: parseFloat(year1Qty) || 0,
        year2: parseFloat(year2Qty) || 0,
        year3: parseFloat(year3Qty) || 0,
      },
      channelWeights,
      gmOptions: gmOptions.map(g => parseFloat(g) || 0),
      testing: {
        hmMicros: { tests: parseFloat(hmMicrosTests) || 0, cost: parseFloat(hmMicrosCost) || 0, total: hmMicrosTotal },
        assay: { tests: parseFloat(assayTests) || 0, cost: parseFloat(assayCost) || 0, total: assayTotal },
        allergens: { tests: parseFloat(allergensTests) || 0, cost: parseFloat(allergensCost) || 0, total: allergensTotal },
        fullPanelTotal,
        stabilityCost: parseFloat(stabilityCost) || 0,
        fullPanelPerBottle,
        stabilityAmortized,
      },
      targetedGmOptions: targetedGmOptions.map(g => parseFloat(g) || 0),
      preliminaryPnl: {
        formulaFreight: parseFloat(formulaFreight) || 0,
        testingCostPerBottle: parseFloat(testingCostPerBottle) || 0,
        expectedCogs,
        expectedGm: parseFloat(expectedGm) || 0,
      },
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
    } catch {
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
          {[
            { key: "start", title: "Start Development of New Product", desc: "Begin a new product from scratch" },
            { key: "continue", title: "Continue Development of New Product", desc: "Resume work on an existing product" },
            { key: "review", title: "Review Finalized New Product", desc: "View and approve a completed product" },
          ].map((p) => (
            <button
              key={p.key}
              onClick={() => setPath(p.key as FormPath)}
              className="w-full p-4 text-left border-2 border-gray-300 rounded-lg bg-white hover:border-blue-600 hover:bg-blue-100 transition shadow-sm"
            >
              <div className="font-semibold text-lg text-gray-900">{p.title}</div>
              <div className="text-gray-600 text-sm">{p.desc}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "info", label: "Product Info" },
    { key: "pricing", label: "Pricing" },
    { key: "quantities", label: "Quantities" },
    { key: "channels", label: "Channel Weights" },
    { key: "testing", label: "Testing" },
    { key: "pnl", label: "P&L" },
  ];

  const inputClasses = "w-full border-2 border-gray-300 rounded-lg p-2 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none";
  const labelClasses = "block text-sm font-semibold text-gray-800 mb-1";
  const sectionClasses = "bg-white border-2 border-gray-300 rounded-lg p-6 space-y-4 shadow-sm";


  const pricingRows = [
    { key: "dtcAdjusted", label: "DTC Adjusted", formula: "MSRP - 5%" },
    { key: "wsp", label: "WSP", formula: "50% of MSRP" },
    { key: "amazon", label: "Amazon", formula: "59% of MSRP" },
    { key: "emersonFullscript", label: "Emerson/Fullscript", formula: "75% of MSRP" },
    { key: "iherbAdjusted", label: "iHerb Adjusted", formula: "55% of MSRP - 5%" },
    { key: "domesticWholesaler", label: "Domestic Wholesaler", formula: "50% of MSRP" },
    { key: "domesticDistributor", label: "Domestic Distributor", formula: "50% of MSRP" },
    { key: "domesticETailer", label: "Domestic eTailer", formula: "50% of MSRP" },
    { key: "internationalWholesaler", label: "International Wholesaler", formula: "50% of MSRP" },
    { key: "internationalDistributor", label: "International Distributor", formula: "50% of MSRP" },
    { key: "internationalETailer", label: "International eTailer", formula: "50% of MSRP" },
  ];

  const channelRows = [
    { key: "emersonFullscript", label: "Emerson / Fullscript", priceKey: "emersonFullscript" },
    { key: "amazon", label: "Amazon", priceKey: "amazon" },
    { key: "dtc", label: "DTC", priceKey: "dtcAdjusted" },
    { key: "iherb", label: "iHerb", priceKey: "iherbAdjusted" },
    { key: "domesticWholesaler", label: "Domestic Wholesaler", priceKey: "domesticWholesaler" },
    { key: "domesticDistributor", label: "Domestic Distributor", priceKey: "domesticDistributor" },
    { key: "domesticETailer", label: "Domestic eTailer", priceKey: "domesticETailer" },
    { key: "internationalWholesaler", label: "International Wholesaler", priceKey: "internationalWholesaler" },
    { key: "internationalDistributor", label: "International Distributor", priceKey: "internationalDistributor" },
    { key: "internationalETailer", label: "International eTailer", priceKey: "internationalETailer" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => setPath(null)} className="text-blue-700 font-medium hover:text-blue-900 hover:underline">
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {path === "start" && "Start Development of New Product"}
          {path === "continue" && "Continue Development of New Product"}
          {path === "review" && "Review Finalized New Product"}
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b-2 border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-medium rounded-t-lg transition ${
              activeTab === tab.key
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Product Info Tab */}
        {activeTab === "info" && (
          <div className={sectionClasses}>
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Product Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Brand</label>
                <select value={brand} onChange={(e) => setBrand(e.target.value)} className={inputClasses} required>
                  <option value="">Select brand...</option>
                  {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClasses}>Format</label>
                <select value={format} onChange={(e) => setFormat(e.target.value)} className={inputClasses} required>
                  <option value="">Select format...</option>
                  {FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className={labelClasses}>Product Name</label>
              <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className={inputClasses} required />
            </div>
            <div>
              <label className={labelClasses}>Product Description</label>
              <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className={inputClasses} rows={3} />
            </div>
            <div>
              <label className={labelClasses}>Targeted Launch Date</label>
              <input type="date" value={targetedLaunchDate} onChange={(e) => setTargetedLaunchDate(e.target.value)} className={inputClasses} />
            </div>
          </div>
        )}


        {/* Pricing Tab */}
        {activeTab === "pricing" && (
          <div className={sectionClasses}>
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Pricing</h2>
            <div className="mb-4">
              <label className={labelClasses}>MSRP (DTC Price) ($)</label>
              <input type="number" step="0.01" value={msrp} onChange={(e) => setMsrp(e.target.value)} className="w-48 border-2 border-gray-300 rounded-lg p-2 bg-white text-gray-900 focus:border-blue-500 focus:outline-none" placeholder="0.00" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-700 text-white">
                    <th className="border-2 border-gray-500 p-2 text-left font-bold">Channel</th>
                    <th className="border-2 border-gray-500 p-2 text-left w-24 font-bold">% of MSRP</th>
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
                        <input type="number" value={percentages[row.key].percent} onChange={(e) => updatePercent(row.key, parseFloat(e.target.value) || 0)} className="w-full p-1 border-2 border-gray-300 rounded text-center bg-white text-gray-900 focus:border-blue-500 focus:outline-none" />
                      </td>
                      <td className="border-2 border-gray-300 p-1">
                        <input type="number" step="0.01" value={percentages[row.key].adjustment} onChange={(e) => updateAdjustment(row.key, parseFloat(e.target.value) || 0)} className="w-full p-1 border-2 border-gray-300 rounded text-center bg-white text-gray-900 focus:border-blue-500 focus:outline-none" />
                      </td>
                      <td className="border-2 border-gray-300 p-2 font-mono font-bold bg-green-100 text-green-800">
                        ${calculatePrice(row.key).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <span className="font-semibold text-gray-800">Average Sales Price:</span>
              <span className="ml-2 font-mono font-bold text-blue-800">${averageSalesPrice.toFixed(2)}</span>
              <span className="text-gray-600 text-sm ml-2">(excludes WSP and DTC, includes DTC Adjusted)</span>
            </div>
          </div>
        )}

        {/* Quantities Tab */}
        {activeTab === "quantities" && (
          <div className={sectionClasses}>
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Annual Quantities</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClasses}>Year 1 Quantity</label>
                <input type="number" value={year1Qty} onChange={(e) => setYear1Qty(e.target.value)} className={inputClasses} placeholder="0" />
              </div>
              <div>
                <label className={labelClasses}>Year 2 Quantity</label>
                <input type="number" value={year2Qty} onChange={(e) => setYear2Qty(e.target.value)} className={inputClasses} placeholder="0" />
              </div>
              <div>
                <label className={labelClasses}>Year 3 Quantity</label>
                <input type="number" value={year3Qty} onChange={(e) => setYear3Qty(e.target.value)} className={inputClasses} placeholder="0" />
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <span className="font-semibold text-gray-800">Total 3-Year Quantity:</span>
              <span className="ml-2 font-mono font-bold text-blue-800">{totalQty.toLocaleString()}</span>
            </div>
          </div>
        )}


        {/* Channel Weights Tab */}
        {activeTab === "channels" && (
          <div className={sectionClasses}>
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Channel Weights</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-700 text-white">
                    <th className="border-2 border-gray-500 p-2 text-left font-bold">Channel</th>
                    <th className="border-2 border-gray-500 p-2 text-left w-20 font-bold">%Wt</th>
                    <th className="border-2 border-gray-500 p-2 text-left w-28 font-bold">Sale Price</th>
                    <th className="border-2 border-gray-500 p-2 text-left w-24 font-bold">Qty (Yr1)</th>
                    <th className="border-2 border-gray-500 p-2 text-left w-28 font-bold">$ Revenue</th>
                    <th className="border-2 border-gray-500 p-2 text-left w-20 font-bold">%GM</th>
                  </tr>
                </thead>
                <tbody>
                  {channelRows.map((row) => {
                    const weight = channelWeights[row.key] || 0;
                    const salePrice = calculatePrice(row.priceKey);
                    const qty = Math.round((parseFloat(year1Qty) || 0) * weight / 100);
                    const revenue = salePrice * qty;
                    const gmPercent = qty > 0 && expectedCogs > 0 ? (1 - (expectedCogs / salePrice)) * 100 : 0;
                    
                    return (
                      <tr key={row.key} className="hover:bg-yellow-100 bg-white">
                        <td className="border-2 border-gray-300 p-2 font-semibold text-gray-900">{row.label}</td>
                        <td className="border-2 border-gray-300 p-1">
                          <input type="number" value={weight} onChange={(e) => updateChannelWeight(row.key, parseFloat(e.target.value) || 0)} className="w-full p-1 border-2 border-gray-300 rounded text-center bg-white text-gray-900 focus:border-blue-500 focus:outline-none" />
                        </td>
                        <td className="border-2 border-gray-300 p-2 font-mono bg-gray-50">${salePrice.toFixed(2)}</td>
                        <td className="border-2 border-gray-300 p-2 font-mono bg-gray-50">{qty.toLocaleString()}</td>
                        <td className="border-2 border-gray-300 p-2 font-mono bg-green-100 text-green-800">${revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td className="border-2 border-gray-300 p-2 font-mono bg-blue-100 text-blue-800">{gmPercent.toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
              <span className="font-semibold text-gray-800">Total Weight:</span>
              <span className={`ml-2 font-mono font-bold ${Object.values(channelWeights).reduce((a, b) => a + b, 0) === 100 ? "text-green-700" : "text-red-700"}`}>
                {Object.values(channelWeights).reduce((a, b) => a + b, 0)}%
              </span>
              {Object.values(channelWeights).reduce((a, b) => a + b, 0) !== 100 && (
                <span className="text-red-600 text-sm ml-2">(should equal 100%)</span>
              )}
            </div>
          </div>
        )}


        {/* Testing Tab */}
        {activeTab === "testing" && (
          <div className="space-y-6">
            {/* COGS & Gross Margins */}
            <div className={sectionClasses}>
              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">COGS & Gross Margins</h2>
              <p className="text-gray-600 text-sm mb-4">Enter 5 gross margin percentages to calculate corresponding COGS</p>
              <div className="overflow-x-auto">
                <table className="border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-700 text-white">
                      <th className="border-2 border-gray-500 p-2 font-bold">GM %</th>
                      <th className="border-2 border-gray-500 p-2 font-bold">Calculated COGS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gmOptions.map((gm, i) => {
                      const gmVal = parseFloat(gm) || 0;
                      const cogs = averageSalesPrice * (1 - gmVal / 100);
                      return (
                        <tr key={i} className="hover:bg-yellow-100 bg-white">
                          <td className="border-2 border-gray-300 p-1">
                            <input type="number" value={gm} onChange={(e) => updateGmOption(i, e.target.value)} className="w-20 p-1 border-2 border-gray-300 rounded text-center bg-white text-gray-900 focus:border-blue-500 focus:outline-none" />%
                          </td>
                          <td className="border-2 border-gray-300 p-2 font-mono bg-green-100 text-green-800">${cogs.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Testing Costs */}
            <div className={sectionClasses}>
              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Testing Costs</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-700 text-white">
                      <th className="border-2 border-gray-500 p-2 text-left font-bold">Testing</th>
                      <th className="border-2 border-gray-500 p-2 font-bold w-28"># of Tests</th>
                      <th className="border-2 border-gray-500 p-2 font-bold w-28">Cost</th>
                      <th className="border-2 border-gray-500 p-2 font-bold w-32">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-yellow-100 bg-white">
                      <td className="border-2 border-gray-300 p-2 font-semibold">HM & Micros</td>
                      <td className="border-2 border-gray-300 p-1"><input type="number" value={hmMicrosTests} onChange={(e) => setHmMicrosTests(e.target.value)} className="w-full p-1 border-2 border-gray-300 rounded text-center bg-white text-gray-900 focus:border-blue-500 focus:outline-none" /></td>
                      <td className="border-2 border-gray-300 p-1"><input type="number" step="0.01" value={hmMicrosCost} onChange={(e) => setHmMicrosCost(e.target.value)} className="w-full p-1 border-2 border-gray-300 rounded text-center bg-white text-gray-900 focus:border-blue-500 focus:outline-none" /></td>
                      <td className="border-2 border-gray-300 p-2 font-mono bg-green-100 text-green-800">${hmMicrosTotal.toFixed(2)}</td>
                    </tr>
                    <tr className="hover:bg-yellow-100 bg-white">
                      <td className="border-2 border-gray-300 p-2 font-semibold">Assay</td>
                      <td className="border-2 border-gray-300 p-1"><input type="number" value={assayTests} onChange={(e) => setAssayTests(e.target.value)} className="w-full p-1 border-2 border-gray-300 rounded text-center bg-white text-gray-900 focus:border-blue-500 focus:outline-none" /></td>
                      <td className="border-2 border-gray-300 p-1"><input type="number" step="0.01" value={assayCost} onChange={(e) => setAssayCost(e.target.value)} className="w-full p-1 border-2 border-gray-300 rounded text-center bg-white text-gray-900 focus:border-blue-500 focus:outline-none" /></td>
                      <td className="border-2 border-gray-300 p-2 font-mono bg-green-100 text-green-800">${assayTotal.toFixed(2)}</td>
                    </tr>
                    <tr className="hover:bg-yellow-100 bg-white">
                      <td className="border-2 border-gray-300 p-2 font-semibold">Allergens</td>
                      <td className="border-2 border-gray-300 p-1"><input type="number" value={allergensTests} onChange={(e) => setAllergensTests(e.target.value)} className="w-full p-1 border-2 border-gray-300 rounded text-center bg-white text-gray-900 focus:border-blue-500 focus:outline-none" /></td>
                      <td className="border-2 border-gray-300 p-1"><input type="number" step="0.01" value={allergensCost} onChange={(e) => setAllergensCost(e.target.value)} className="w-full p-1 border-2 border-gray-300 rounded text-center bg-white text-gray-900 focus:border-blue-500 focus:outline-none" /></td>
                      <td className="border-2 border-gray-300 p-2 font-mono bg-green-100 text-green-800">${allergensTotal.toFixed(2)}</td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="border-2 border-gray-300 p-2 font-bold">Full Panel</td>
                      <td colSpan={2} className="border-2 border-gray-300 p-2 text-center text-gray-500">Sum of above</td>
                      <td className="border-2 border-gray-300 p-2 font-mono font-bold bg-blue-100 text-blue-800">${fullPanelTotal.toFixed(2)}</td>
                    </tr>
                    <tr className="hover:bg-yellow-100 bg-white">
                      <td className="border-2 border-gray-300 p-2 font-semibold">Stability</td>
                      <td colSpan={2} className="border-2 border-gray-300 p-1"><input type="number" step="0.01" value={stabilityCost} onChange={(e) => setStabilityCost(e.target.value)} className="w-full p-1 border-2 border-gray-300 rounded text-center bg-white text-gray-900 focus:border-blue-500 focus:outline-none" placeholder="Total stability cost" /></td>
                      <td className="border-2 border-gray-300 p-2 font-mono bg-green-100 text-green-800">${(parseFloat(stabilityCost) || 0).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <div className="font-semibold text-gray-800">Full Panel Testing/Bottle Annual</div>
                  <div className="font-mono font-bold text-blue-800">${fullPanelPerBottle.toFixed(4)}</div>
                  <div className="text-gray-500 text-xs">Full Panel ÷ Year 1 Qty</div>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <div className="font-semibold text-gray-800">Stability Testing Amortized 3 Years</div>
                  <div className="font-mono font-bold text-blue-800">${stabilityAmortized.toFixed(4)}</div>
                  <div className="text-gray-500 text-xs">Stability ÷ Total 3-Year Qty</div>
                </div>
              </div>
            </div>


            {/* Targeted Formula Cost */}
            <div className={sectionClasses}>
              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Targeted Formula Cost</h2>
              <p className="text-gray-600 text-sm mb-4">Enter 3 gross margin percentages to calculate targeted formula cost</p>
              <div className="overflow-x-auto">
                <table className="border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-700 text-white">
                      <th className="border-2 border-gray-500 p-2 font-bold">GM %</th>
                      <th className="border-2 border-gray-500 p-2 font-bold">Targeted Formula Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {targetedGmOptions.map((gm, i) => {
                      const gmVal = parseFloat(gm) || 0;
                      const testingSum = (fullPanelPerBottle + stabilityAmortized) / 1.03;
                      const targetedCost = (averageSalesPrice * (1 - gmVal / 100)) - testingSum;
                      return (
                        <tr key={i} className="hover:bg-yellow-100 bg-white">
                          <td className="border-2 border-gray-300 p-1">
                            <input type="number" value={gm} onChange={(e) => updateTargetedGmOption(i, e.target.value)} className="w-20 p-1 border-2 border-gray-300 rounded text-center bg-white text-gray-900 focus:border-blue-500 focus:outline-none" />%
                          </td>
                          <td className="border-2 border-gray-300 p-2 font-mono bg-green-100 text-green-800">${targetedCost.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="text-gray-500 text-xs mt-2">
                Formula: (Avg Sales Price × (1 - GM%)) - ((Full Panel/Bottle + Stability Amortized) ÷ 1.03)
              </div>
            </div>
          </div>
        )}

        {/* P&L Tab */}
        {activeTab === "pnl" && (
          <div className={sectionClasses}>
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Preliminary P&L</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Formula + Freight ($)</label>
                <input type="number" step="0.01" value={formulaFreight} onChange={(e) => setFormulaFreight(e.target.value)} className={inputClasses} placeholder="0.00" />
              </div>
              <div>
                <label className={labelClasses}>Testing Cost/Bottle ($)</label>
                <input type="number" step="0.01" value={testingCostPerBottle} onChange={(e) => setTestingCostPerBottle(e.target.value)} className={inputClasses} placeholder="0.00" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-blue-100 rounded-lg">
                <div className="font-semibold text-gray-800">Expected COGS</div>
                <div className="font-mono font-bold text-2xl text-blue-800">${expectedCogs.toFixed(2)}</div>
                <div className="text-gray-500 text-xs">Formula + Freight + Testing Cost/Bottle</div>
              </div>
              <div>
                <label className={labelClasses}>Expected %GM</label>
                <input type="number" step="0.1" value={expectedGm} onChange={(e) => setExpectedGm(e.target.value)} className={inputClasses} placeholder="65" />
                <div className="text-gray-500 text-xs mt-1">Target gross margin percentage</div>
              </div>
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="flex items-center gap-4 mt-6">
          <button type="submit" disabled={saving} className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 shadow-md">
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
