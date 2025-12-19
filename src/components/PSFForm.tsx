"use client";

import { useState } from "react";

type Tab = "summary" | "materials" | "bom" | "label" | "demand";

const BRANDS = ["Vital Nutrients", "Bariatric Fusion", "Fairhaven Health", "Unjury"];
const PRODUCT_TYPES = ["Insourcing", "New", "Change"];
const ROUTING_BLENDING = [
  "Routing-Blending PK20 4 hours",
  "Routing-Blending PK20 8 hours",
  "Routing-Blending PK5 4 hours",
  "Routing-Blending PK5 8 hours",
  "Routing-Blending Munson 8 hours",
  "Routing-Blending Munson 16 hours",
];
const ROUTING_ENCAPSULATE = [
  "Routing-Encapsulate 1505",
  "Routing-Encapsulate 2000",
  "Routing-Encapsulate 3005",
  "Routing-Encapsulate IMA",
  "Routing-Encapsule Ultra 8",
  "Routing-Tableting 27 Station D5 3/8",
  "Routing-Tableting 27 Station D5 7/16",
  "Routing-Tableting 27 Station D5 3/4",
];

export default function PSFForm() {
  const [activeTab, setActiveTab] = useState<Tab>("summary");
  
  // Product Summary
  const [sku, setSku] = useState("");
  const [salesDescription, setSalesDescription] = useState("");
  const [psfSubmittalDate, setPsfSubmittalDate] = useState("");
  const [psfRevision, setPsfRevision] = useState("");
  const [productType, setProductType] = useState("");
  const [brand, setBrand] = useState("");
  const [healthCategory, setHealthCategory] = useState("");
  const [nutrientType, setNutrientType] = useState("");
  const [therapeuticPlatform, setTherapeuticPlatform] = useState("");
  const [pilotRequired, setPilotRequired] = useState("");
  const [intendedReleaseDate, setIntendedReleaseDate] = useState("");
  
  // Raw Materials
  const [rawMaterials, setRawMaterials] = useState("");
  
  // Blending BOM
  const [blendingRouting, setBlendingRouting] = useState("");
  const [bulkBom, setBulkBom] = useState([
    { itemCode: "", description: "Blend Item", bomQty: "", units: "G" },
    { itemCode: "", description: "Capsule", bomQty: "1", units: "Each" },
  ]);
  
  // Encapsulate Routing
  const [encapsulateRouting, setEncapsulateRouting] = useState("");
  
  // Label
  const [labelItemCode, setLabelItemCode] = useState("");
  const [labelDescription, setLabelDescription] = useState("");
  const [labelUpc, setLabelUpc] = useState("");
  
  // Finished Goods BOM
  const [finishedGoodsBom, setFinishedGoodsBom] = useState([
    { item: "Bulk", description: "", bomQty: "", units: "each" },
    { item: "Bottle", description: "", bomQty: "1", units: "each" },
    { item: "Lid", description: "", bomQty: "1", units: "each" },
    { item: "Shrink", description: "", bomQty: "1", units: "each" },
    { item: "Label", description: "", bomQty: "1", units: "each" },
  ]);
  
  // Demand Planning
  const [forecastNext12, setForecastNext12] = useState("");
  const [requestedOrderQty, setRequestedOrderQty] = useState("");
  const [requestedOrderCapsules, setRequestedOrderCapsules] = useState("");
  const [monthsOnHand, setMonthsOnHand] = useState("");
  
  // Formulary Sheet
  const [formularySheet, setFormularySheet] = useState("");
  
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const updateBulkBom = (index: number, field: string, value: string) => {
    setBulkBom(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const updateFinishedGoodsBom = (index: number, field: string, value: string) => {
    setFinishedGoodsBom(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const formData = {
      type: "psf",
      productSummary: { sku, salesDescription, psfSubmittalDate, psfRevision, productType, brand, healthCategory, nutrientType, therapeuticPlatform, pilotRequired, intendedReleaseDate },
      rawMaterials,
      blending: { routing: blendingRouting, bulkBom },
      encapsulateRouting,
      label: { itemCode: labelItemCode, description: labelDescription, upc: labelUpc },
      finishedGoodsBom,
      demandPlanning: { forecastNext12, requestedOrderQty, requestedOrderCapsules, monthsOnHand },
      formularySheet,
    };

    try {
      const res = await fetch("/api/psf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) setMessage("PSF document saved!");
      else setMessage("Failed to save");
    } catch {
      setMessage("Error saving");
    } finally {
      setSaving(false);
    }
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "summary", label: "Product Summary" },
    { key: "materials", label: "Raw Materials" },
    { key: "bom", label: "Bill of Materials" },
    { key: "label", label: "Label & Finished Goods" },
    { key: "demand", label: "Demand Planning" },
  ];

  const inputClasses = "w-full border-2 border-gray-300 rounded-lg p-2 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none";
  const labelClasses = "block text-sm font-semibold text-gray-800 mb-1";
  const sectionClasses = "bg-white border-2 border-gray-300 rounded-lg p-6 space-y-4 shadow-sm";
  const textareaClasses = inputClasses + " min-h-[100px]";

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Setup Form (PSF)</h1>
      <p className="text-gray-600 mb-4">Blueroot Health</p>

      <div className="flex flex-wrap gap-1 mb-6 border-b-2 border-gray-200">
        {tabs.map((tab) => (
          <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-2 text-sm font-medium rounded-t-lg transition ${activeTab === tab.key ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {activeTab === "summary" && (
          <div className={sectionClasses}>
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Product Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelClasses}>SKU</label><input type="text" value={sku} onChange={(e) => setSku(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Sales Description</label><input type="text" value={salesDescription} onChange={(e) => setSalesDescription(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>PSF Submittal Date</label><input type="date" value={psfSubmittalDate} onChange={(e) => setPsfSubmittalDate(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>PSF Revision</label><input type="text" value={psfRevision} onChange={(e) => setPsfRevision(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Product Type</label>
                <select value={productType} onChange={(e) => setProductType(e.target.value)} className={inputClasses}>
                  <option value="">Select...</option>
                  {PRODUCT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div><label className={labelClasses}>Brand</label>
                <select value={brand} onChange={(e) => setBrand(e.target.value)} className={inputClasses}>
                  <option value="">Select...</option>
                  {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div><label className={labelClasses}>Health Category</label><input type="text" value={healthCategory} onChange={(e) => setHealthCategory(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Nutrient Type</label><input type="text" value={nutrientType} onChange={(e) => setNutrientType(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Therapeutic Platform</label><input type="text" value={therapeuticPlatform} onChange={(e) => setTherapeuticPlatform(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Pilot Required</label><input type="text" value={pilotRequired} onChange={(e) => setPilotRequired(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Intended Release Date (only for new)</label><input type="date" value={intendedReleaseDate} onChange={(e) => setIntendedReleaseDate(e.target.value)} className={inputClasses} /></div>
            </div>
          </div>
        )}


        {activeTab === "materials" && (
          <div className={sectionClasses}>
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Raw Materials</h2>
            <div><label className={labelClasses}>List all raw materials</label><textarea value={rawMaterials} onChange={(e) => setRawMaterials(e.target.value)} className={textareaClasses} placeholder="Enter raw materials..." /></div>
          </div>
        )}

        {activeTab === "bom" && (
          <div className="space-y-6">
            <div className={sectionClasses}>
              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Blending Bill of Materials</h2>
              <div><label className={labelClasses}>Routing (select one)</label>
                <select value={blendingRouting} onChange={(e) => setBlendingRouting(e.target.value)} className={inputClasses}>
                  <option value="">Select routing...</option>
                  {ROUTING_BLENDING.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <h3 className="font-semibold text-gray-800 mt-4">Bulk Bill of Materials</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-700 text-white">
                      <th className="border p-2">Item Code</th>
                      <th className="border p-2">Item Description</th>
                      <th className="border p-2">BOM Quantity</th>
                      <th className="border p-2">Units</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bulkBom.map((item, i) => (
                      <tr key={i} className="hover:bg-yellow-50">
                        <td className="border p-1"><input type="text" value={item.itemCode} onChange={(e) => updateBulkBom(i, "itemCode", e.target.value)} className="w-full p-1 border border-gray-300 rounded" /></td>
                        <td className="border p-1"><input type="text" value={item.description} onChange={(e) => updateBulkBom(i, "description", e.target.value)} className="w-full p-1 border border-gray-300 rounded" /></td>
                        <td className="border p-1"><input type="text" value={item.bomQty} onChange={(e) => updateBulkBom(i, "bomQty", e.target.value)} className="w-full p-1 border border-gray-300 rounded text-center" /></td>
                        <td className="border p-1"><input type="text" value={item.units} onChange={(e) => updateBulkBom(i, "units", e.target.value)} className="w-full p-1 border border-gray-300 rounded text-center" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={sectionClasses}>
              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Encapsulate/Tablet Routing</h2>
              <div><label className={labelClasses}>Routing (select one)</label>
                <select value={encapsulateRouting} onChange={(e) => setEncapsulateRouting(e.target.value)} className={inputClasses}>
                  <option value="">Select routing...</option>
                  {ROUTING_ENCAPSULATE.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === "label" && (
          <div className="space-y-6">
            <div className={sectionClasses}>
              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Label</h2>
              <div className="grid grid-cols-3 gap-4">
                <div><label className={labelClasses}>Label Item Code</label><input type="text" value={labelItemCode} onChange={(e) => setLabelItemCode(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Label Item Description & Size</label><input type="text" value={labelDescription} onChange={(e) => setLabelDescription(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>UPC</label><input type="text" value={labelUpc} onChange={(e) => setLabelUpc(e.target.value)} className={inputClasses} /></div>
              </div>
            </div>

            <div className={sectionClasses}>
              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Finished Goods Bill of Materials</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-700 text-white">
                      <th className="border p-2">Inventory Item</th>
                      <th className="border p-2">Item Description</th>
                      <th className="border p-2">BOM Qty</th>
                      <th className="border p-2">Units</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finishedGoodsBom.map((item, i) => (
                      <tr key={i} className={`hover:bg-yellow-50 ${i === 0 ? "bg-yellow-100" : ""}`}>
                        <td className="border p-2 font-semibold">{item.item}</td>
                        <td className="border p-1"><input type="text" value={item.description} onChange={(e) => updateFinishedGoodsBom(i, "description", e.target.value)} className="w-full p-1 border border-gray-300 rounded" /></td>
                        <td className="border p-1"><input type="text" value={item.bomQty} onChange={(e) => updateFinishedGoodsBom(i, "bomQty", e.target.value)} className="w-full p-1 border border-gray-300 rounded text-center" /></td>
                        <td className="border p-2 text-center">{item.units}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}


        {activeTab === "demand" && (
          <div className="space-y-6">
            <div className={sectionClasses}>
              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Demand Planning (first production only)</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClasses}>Forecast Next 12 Months (Quantity)</label><input type="text" value={forecastNext12} onChange={(e) => setForecastNext12(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Requested Order Quantity</label><input type="text" value={requestedOrderQty} onChange={(e) => setRequestedOrderQty(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Requested Order Capsules</label><input type="text" value={requestedOrderCapsules} onChange={(e) => setRequestedOrderCapsules(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Months on Hand of Requested Quantity</label><input type="text" value={monthsOnHand} onChange={(e) => setMonthsOnHand(e.target.value)} className={inputClasses} /></div>
              </div>
            </div>

            <div className={sectionClasses}>
              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Formulary Sheet</h2>
              <div><label className={labelClasses}>Paste Formulary</label><textarea value={formularySheet} onChange={(e) => setFormularySheet(e.target.value)} className={textareaClasses} placeholder="Paste formulary content here..." /></div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 mt-6">
          <button type="submit" disabled={saving} className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 shadow-md">
            {saving ? "Saving..." : "Save PSF Document"}
          </button>
          {message && <span className={`font-semibold ${message.includes("saved") ? "text-green-700" : "text-red-700"}`}>{message}</span>}
        </div>
      </form>
    </div>
  );
}
