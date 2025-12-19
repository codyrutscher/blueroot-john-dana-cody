"use client";

import { useState } from "react";

type Tab = "overview" | "market" | "product" | "production" | "financials" | "approvals";

const BRANDS = ["Vital Nutrients", "Bariatric Fusion", "Fairhaven Health", "Unjury"];
const LAUNCH_TYPES = ["New Product", "Line Extension", "Reformulation", "Repackaging"];

interface Props {
  productId?: string;
}

export default function Gate3Form({ productId }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  
  // Overview
  const [finalProductName, setFinalProductName] = useState("");
  const [launchType, setLaunchType] = useState("");
  const [brand, setBrand] = useState("");
  const [launchDate, setLaunchDate] = useState("");
  const [submittalDate, setSubmittalDate] = useState("");
  
  // Market Preparation
  const [inMarketPlan, setInMarketPlan] = useState("");
  const [collateral, setCollateral] = useState("");
  const [labelDesign, setLabelDesign] = useState<File | null>(null);
  
  // Product Information
  const [sku, setSku] = useState("");
  const [supplementFacts, setSupplementFacts] = useState("");
  const [trademarkStatements, setTrademarkStatements] = useState("");
  const [bottleCount, setBottleCount] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [suggestedUse, setSuggestedUse] = useState("");
  const [deliveryFormat, setDeliveryFormat] = useState("");
  const [unitSize, setUnitSize] = useState("");
  const [bottleSize, setBottleSize] = useState("");
  const [lidSize, setLidSize] = useState("");
  const [labelSize, setLabelSize] = useState("");
  const [upc, setUpc] = useState("");
  const [shelfLife, setShelfLife] = useState("");
  const [attributes, setAttributes] = useState("");
  const [veganVegetarian, setVeganVegetarian] = useState("");
  const [halalKosher, setHalalKosher] = useState("");
  const [otherLabelReq, setOtherLabelReq] = useState("");
  
  // Production Planning
  const [manufacturer, setManufacturer] = useState("");
  const [productionDates, setProductionDates] = useState("");
  const [onShelfDate, setOnShelfDate] = useState("");
  const [manufacturingOrder, setManufacturingOrder] = useState("");
  const [costPerUnit, setCostPerUnit] = useState("");
  const [initialPurchaseOrder, setInitialPurchaseOrder] = useState("");
  const [leadTime, setLeadTime] = useState("");
  
  // Financials
  const [year1Bottles, setYear1Bottles] = useState("");
  const [year2Bottles, setYear2Bottles] = useState("");
  const [year3Bottles, setYear3Bottles] = useState("");
  const [year1NetSales, setYear1NetSales] = useState("");
  const [year2NetSales, setYear2NetSales] = useState("");
  const [year3NetSales, setYear3NetSales] = useState("");
  const [year1Cogs, setYear1Cogs] = useState("");
  const [year2Cogs, setYear2Cogs] = useState("");
  const [year3Cogs, setYear3Cogs] = useState("");
  const [year1GrossMargin, setYear1GrossMargin] = useState("");
  const [year2GrossMargin, setYear2GrossMargin] = useState("");
  const [year3GrossMargin, setYear3GrossMargin] = useState("");
  const [year1GmPercent, setYear1GmPercent] = useState("");
  const [year2GmPercent, setYear2GmPercent] = useState("");
  const [year3GmPercent, setYear3GmPercent] = useState("");
  const [assumptions, setAssumptions] = useState("");
  
  // Approvals
  const [approvals, setApprovals] = useState([
    { person: "Todd Walter", title: "Chief Financial & Operating Officer", signature: "", date: "" },
    { person: "John Troup", title: "Chief Science, Education, Quality & Regulatory Officer", signature: "", date: "" },
    { person: "Andrew O'Rourke", title: "Chief Strategy Officer", signature: "", date: "" },
    { person: "Florian Bernodat", title: "Chief Manufacturing Officer", signature: "", date: "" },
    { person: "Lester Meeks", title: "Chief Technology Officer", signature: "", date: "" },
  ]);
  
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const updateApproval = (index: number, field: string, value: string) => {
    setApprovals(prev => {
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
      type: "gate3",
      overview: { finalProductName, launchType, brand, launchDate, submittalDate },
      marketPreparation: { inMarketPlan, collateral },
      product: { sku, supplementFacts, trademarkStatements, bottleCount, servingSize, suggestedUse, deliveryFormat, unitSize, bottleSize, lidSize, labelSize, upc, shelfLife, attributes, veganVegetarian, halalKosher, otherLabelReq },
      production: { manufacturer, productionDates, onShelfDate, manufacturingOrder, costPerUnit, initialPurchaseOrder, leadTime },
      financials: {
        year1: { bottles: year1Bottles, netSales: year1NetSales, cogs: year1Cogs, grossMargin: year1GrossMargin, gmPercent: year1GmPercent },
        year2: { bottles: year2Bottles, netSales: year2NetSales, cogs: year2Cogs, grossMargin: year2GrossMargin, gmPercent: year2GmPercent },
        year3: { bottles: year3Bottles, netSales: year3NetSales, cogs: year3Cogs, grossMargin: year3GrossMargin, gmPercent: year3GmPercent },
        assumptions,
      },
      approvals,
    };

    try {
      const url = productId ? `/api/products/${productId}` : "/api/gate3";
      const method = productId ? "PATCH" : "POST";
      const body = productId ? { gate3: formData, gate3Complete: true } : formData;
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) setMessage("Gate 3 document saved!");
      else setMessage("Failed to save");
    } catch {
      setMessage("Error saving");
    } finally {
      setSaving(false);
    }
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "market", label: "Market Prep" },
    { key: "product", label: "Product Info" },
    { key: "production", label: "Production" },
    { key: "financials", label: "Financials" },
    { key: "approvals", label: "Approvals" },
  ];

  const inputClasses = "w-full border-2 border-gray-300 rounded-lg p-2 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none";
  const labelClasses = "block text-sm font-semibold text-gray-800 mb-1";
  const sectionClasses = "bg-white border-2 border-gray-300 rounded-lg p-6 space-y-4 shadow-sm";
  const textareaClasses = inputClasses + " min-h-[80px]";

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Gate 3 Approval Sheet</h1>
      <p className="text-gray-600 mb-4">REV00 – Date Effective 9.6.24</p>

      <div className="flex flex-wrap gap-1 mb-6 border-b-2 border-gray-200">
        {tabs.map((tab) => (
          <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-2 text-sm font-medium rounded-t-lg transition ${activeTab === tab.key ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {activeTab === "overview" && (
          <div className={sectionClasses}>
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Product Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelClasses}>Final Product Name</label><input type="text" value={finalProductName} onChange={(e) => setFinalProductName(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Product Launch Type</label>
                <select value={launchType} onChange={(e) => setLaunchType(e.target.value)} className={inputClasses}>
                  <option value="">Select...</option>
                  {LAUNCH_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div><label className={labelClasses}>Brand</label>
                <select value={brand} onChange={(e) => setBrand(e.target.value)} className={inputClasses}>
                  <option value="">Select...</option>
                  {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div><label className={labelClasses}>Launch Date</label><input type="date" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Submittal Date</label><input type="date" value={submittalDate} onChange={(e) => setSubmittalDate(e.target.value)} className={inputClasses} /></div>
            </div>
          </div>
        )}


        {activeTab === "market" && (
          <div className="space-y-6">
            <div className={sectionClasses}>
              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Market Preparation</h2>
              <div><label className={labelClasses}>Describe the in-market plan and rollout</label><textarea value={inMarketPlan} onChange={(e) => setInMarketPlan(e.target.value)} className={textareaClasses} /></div>
              <div><label className={labelClasses}>List collateral developed and approved by regulatory</label><textarea value={collateral} onChange={(e) => setCollateral(e.target.value)} className={textareaClasses} /></div>
            </div>
            <div className={sectionClasses}>
              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Approved Label Design</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input type="file" accept="image/*" onChange={(e) => setLabelDesign(e.target.files?.[0] || null)} className="hidden" id="labelUpload" />
                <label htmlFor="labelUpload" className="cursor-pointer">
                  <div className="text-gray-500 mb-2">Click to upload label design image</div>
                  <div className="text-sm text-gray-400">{labelDesign ? labelDesign.name : "PNG, JPG, or PDF"}</div>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === "product" && (
          <div className={sectionClasses}>
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Product Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelClasses}>SKU</label><input type="text" value={sku} onChange={(e) => setSku(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Supplements Facts</label><textarea value={supplementFacts} onChange={(e) => setSupplementFacts(e.target.value)} className={textareaClasses} /></div>
              <div><label className={labelClasses}>Required Trademark Statements</label><textarea value={trademarkStatements} onChange={(e) => setTrademarkStatements(e.target.value)} className={textareaClasses} /></div>
              <div><label className={labelClasses}>Bottle Count</label><input type="text" value={bottleCount} onChange={(e) => setBottleCount(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Serving Size</label><input type="text" value={servingSize} onChange={(e) => setServingSize(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Suggested Use</label><input type="text" value={suggestedUse} onChange={(e) => setSuggestedUse(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Delivery Format</label><input type="text" value={deliveryFormat} onChange={(e) => setDeliveryFormat(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Unit Size</label><input type="text" value={unitSize} onChange={(e) => setUnitSize(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Bottle Size</label><input type="text" value={bottleSize} onChange={(e) => setBottleSize(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Lid Size</label><input type="text" value={lidSize} onChange={(e) => setLidSize(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Label Size</label><input type="text" value={labelSize} onChange={(e) => setLabelSize(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>UPC</label><input type="text" value={upc} onChange={(e) => setUpc(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Shelf Life</label><input type="text" value={shelfLife} onChange={(e) => setShelfLife(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Attributes</label><input type="text" value={attributes} onChange={(e) => setAttributes(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Vegan/Vegetarian</label><input type="text" value={veganVegetarian} onChange={(e) => setVeganVegetarian(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Halal/Kosher</label><input type="text" value={halalKosher} onChange={(e) => setHalalKosher(e.target.value)} className={inputClasses} /></div>
              <div className="col-span-2"><label className={labelClasses}>Other Label Requirements</label><input type="text" value={otherLabelReq} onChange={(e) => setOtherLabelReq(e.target.value)} className={inputClasses} /></div>
            </div>
          </div>
        )}


        {activeTab === "production" && (
          <div className={sectionClasses}>
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Production Planning</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelClasses}>Manufacturer</label><input type="text" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Production Dates</label><input type="text" value={productionDates} onChange={(e) => setProductionDates(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>On Shelf Date</label><input type="date" value={onShelfDate} onChange={(e) => setOnShelfDate(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Manufacturing Order</label><input type="text" value={manufacturingOrder} onChange={(e) => setManufacturingOrder(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Cost Per Unit</label><input type="text" value={costPerUnit} onChange={(e) => setCostPerUnit(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Initial Purchase Order</label><input type="text" value={initialPurchaseOrder} onChange={(e) => setInitialPurchaseOrder(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Lead Time</label><input type="text" value={leadTime} onChange={(e) => setLeadTime(e.target.value)} className={inputClasses} /></div>
            </div>
          </div>
        )}

        {activeTab === "financials" && (
          <div className={sectionClasses}>
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Finalized Financials</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-700 text-white">
                    <th className="border p-2 text-left">Year</th>
                    <th className="border p-2">Year 1</th>
                    <th className="border p-2">Year 2</th>
                    <th className="border p-2">Year 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-yellow-50">
                    <td className="border p-2 font-semibold">Est. Bottles Sold</td>
                    <td className="border p-1"><input type="text" value={year1Bottles} onChange={(e) => setYear1Bottles(e.target.value)} className="w-full p-1 border border-gray-300 rounded text-center" /></td>
                    <td className="border p-1"><input type="text" value={year2Bottles} onChange={(e) => setYear2Bottles(e.target.value)} className="w-full p-1 border border-gray-300 rounded text-center" /></td>
                    <td className="border p-1"><input type="text" value={year3Bottles} onChange={(e) => setYear3Bottles(e.target.value)} className="w-full p-1 border border-gray-300 rounded text-center" /></td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="border p-2 font-semibold">Net Sales*</td>
                    <td className="border p-1"><input type="text" value={year1NetSales} onChange={(e) => setYear1NetSales(e.target.value)} className="w-full p-1 border border-gray-300 rounded text-center" /></td>
                    <td className="border p-1"><input type="text" value={year2NetSales} onChange={(e) => setYear2NetSales(e.target.value)} className="w-full p-1 border border-gray-300 rounded text-center" /></td>
                    <td className="border p-1"><input type="text" value={year3NetSales} onChange={(e) => setYear3NetSales(e.target.value)} className="w-full p-1 border border-gray-300 rounded text-center" /></td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="border p-2 font-semibold">COGS</td>
                    <td className="border p-1"><input type="text" value={year1Cogs} onChange={(e) => setYear1Cogs(e.target.value)} className="w-full p-1 border border-gray-300 rounded text-center" /></td>
                    <td className="border p-1"><input type="text" value={year2Cogs} onChange={(e) => setYear2Cogs(e.target.value)} className="w-full p-1 border border-gray-300 rounded text-center" /></td>
                    <td className="border p-1"><input type="text" value={year3Cogs} onChange={(e) => setYear3Cogs(e.target.value)} className="w-full p-1 border border-gray-300 rounded text-center" /></td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="border p-2 font-semibold">Gross Margin</td>
                    <td className="border p-1"><input type="text" value={year1GrossMargin} onChange={(e) => setYear1GrossMargin(e.target.value)} className="w-full p-1 border border-gray-300 rounded text-center" /></td>
                    <td className="border p-1"><input type="text" value={year2GrossMargin} onChange={(e) => setYear2GrossMargin(e.target.value)} className="w-full p-1 border border-gray-300 rounded text-center" /></td>
                    <td className="border p-1"><input type="text" value={year3GrossMargin} onChange={(e) => setYear3GrossMargin(e.target.value)} className="w-full p-1 border border-gray-300 rounded text-center" /></td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="border p-2 font-semibold">% Gross Margin</td>
                    <td className="border p-1"><input type="text" value={year1GmPercent} onChange={(e) => setYear1GmPercent(e.target.value)} className="w-full p-1 border border-gray-300 rounded text-center" /></td>
                    <td className="border p-1"><input type="text" value={year2GmPercent} onChange={(e) => setYear2GmPercent(e.target.value)} className="w-full p-1 border border-gray-300 rounded text-center" /></td>
                    <td className="border p-1"><input type="text" value={year3GmPercent} onChange={(e) => setYear3GmPercent(e.target.value)} className="w-full p-1 border border-gray-300 rounded text-center" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div><label className={labelClasses}>Assumptions (*Net Sales assumes Channel Mix weighted of...)</label><textarea value={assumptions} onChange={(e) => setAssumptions(e.target.value)} className={textareaClasses} placeholder="Practitioner: %, Consumer: %, International: %, Based on MSRP xx, WSP xx, Amazon xx, EE/FS xx" /></div>
          </div>
        )}

        {activeTab === "approvals" && (
          <div className={sectionClasses}>
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Approvals</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-700 text-white">
                    <th className="border p-2 text-left">Person</th>
                    <th className="border p-2 text-left">Title</th>
                    <th className="border p-2 w-48">Signature</th>
                    <th className="border p-2 w-32">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {approvals.map((approval, i) => (
                    <tr key={i} className="hover:bg-yellow-50">
                      <td className="border p-2 font-semibold">{approval.person}</td>
                      <td className="border p-2 text-gray-600">{approval.title}</td>
                      <td className="border p-1"><input type="text" value={approval.signature} onChange={(e) => updateApproval(i, "signature", e.target.value)} className="w-full p-1 border border-gray-300 rounded" /></td>
                      <td className="border p-1"><input type="date" value={approval.date} onChange={(e) => updateApproval(i, "date", e.target.value)} className="w-full p-1 border border-gray-300 rounded" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 mt-6">
          <button type="submit" disabled={saving} className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 shadow-md">
            {saving ? "Saving..." : "Save Gate 3 Document"}
          </button>
          {message && <span className={`font-semibold ${message.includes("saved") ? "text-green-700" : "text-red-700"}`}>{message}</span>}
        </div>
      </form>
    </div>
  );
}
