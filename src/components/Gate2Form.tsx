"use client";

import { useState } from "react";

type Tab = "product" | "positioning" | "competitive" | "pricing" | "promotion" | "production" | "risk" | "approvals";

const BRANDS = ["Vital Nutrients", "Bariatric Fusion", "Fairhaven Health", "Unjury"];
const LAUNCH_TYPES = ["New Product", "Line Extension", "Reformulation", "Repackaging"];
const RISK_LEVELS = ["Low", "Normal", "High"];

export default function Gate2Form() {
  const [activeTab, setActiveTab] = useState<Tab>("product");
  
  // Product Info
  const [productIdea, setProductIdea] = useState("");
  const [launchType, setLaunchType] = useState("");
  const [brand, setBrand] = useState("");
  const [targetedLaunchDate, setTargetedLaunchDate] = useState("");
  const [submittalDate, setSubmittalDate] = useState("");
  
  // Product Details
  const [supplementFacts, setSupplementFacts] = useState("");
  const [trademarkStatements, setTrademarkStatements] = useState("");
  const [bottleCount, setBottleCount] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [suggestedUse, setSuggestedUse] = useState("");
  const [deliveryFormat, setDeliveryFormat] = useState("");
  const [unitSize, setUnitSize] = useState("");
  const [bottle, setBottle] = useState("");
  const [lid, setLid] = useState("");
  const [label, setLabel] = useState("");
  const [otherPackaging, setOtherPackaging] = useState("");
  const [shelfLife, setShelfLife] = useState("");
  const [attributes, setAttributes] = useState("");
  const [veganVegetarian, setVeganVegetarian] = useState("");
  const [nonGmo, setNonGmo] = useState("");
  const [halalKosher, setHalalKosher] = useState("");
  const [otherLabelReq, setOtherLabelReq] = useState("");
  
  // Positioning
  const [problemSolving, setProblemSolving] = useState("");
  const [gapInMarket, setGapInMarket] = useState("");
  const [bigIdea, setBigIdea] = useState("");
  const [keyDifferentiators, setKeyDifferentiators] = useState("");
  const [consumerBenefits, setConsumerBenefits] = useState("");
  const [howProductWorks, setHowProductWorks] = useState("");
  const [structureClaims, setStructureClaims] = useState("");
  const [substantiation, setSubstantiation] = useState("");
  const [productInfoSheet, setProductInfoSheet] = useState("");

  
  // Competitive Landscape (up to 4 competitors)
  const [competitors, setCompetitors] = useState([
    { brand: "", product: "", msrp: "", count: "", servingSize: "", daySupply: "", perServing: "", perDay: "", website: "" },
    { brand: "", product: "", msrp: "", count: "", servingSize: "", daySupply: "", perServing: "", perDay: "", website: "" },
    { brand: "", product: "", msrp: "", count: "", servingSize: "", daySupply: "", perServing: "", perDay: "", website: "" },
    { brand: "", product: "", msrp: "", count: "", servingSize: "", daySupply: "", perServing: "", perDay: "", website: "" },
  ]);
  
  // Pricing
  const [pricingStrategy, setPricingStrategy] = useState("");
  const [msrp, setMsrp] = useState("");
  const [wsp, setWsp] = useState("");
  const [amazon, setAmazon] = useState("");
  const [emersonFullscript, setEmersonFullscript] = useState("");
  const [international, setInternational] = useState("");
  
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
  
  // Promotion
  const [promotionalEffort, setPromotionalEffort] = useState("");
  const [sampling, setSampling] = useState("");
  const [amazonKeywords, setAmazonKeywords] = useState("");
  const [advertisingPr, setAdvertisingPr] = useState("");
  const [directSelling, setDirectSelling] = useState("");
  const [digitalMarketing, setDigitalMarketing] = useState("");
  const [educationalProgramming, setEducationalProgramming] = useState("");
  const [marketingSynergies, setMarketingSynergies] = useState("");
  
  // Production
  const [manufacturer, setManufacturer] = useState("");
  const [leadTime, setLeadTime] = useState("");
  const [quantity, setQuantity] = useState("");
  const [costPerUnit, setCostPerUnit] = useState("");
  
  // Risk Assessment
  const [operationsRisk, setOperationsRisk] = useState("");
  const [operationsRiskDesc, setOperationsRiskDesc] = useState("");
  const [regulatoryRisk, setRegulatoryRisk] = useState("");
  const [regulatoryRiskDesc, setRegulatoryRiskDesc] = useState("");
  const [qualityRisk, setQualityRisk] = useState("");
  const [qualityRiskDesc, setQualityRiskDesc] = useState("");
  const [manufacturingRisk, setManufacturingRisk] = useState("");
  const [manufacturingRiskDesc, setManufacturingRiskDesc] = useState("");
  
  // Development Plan
  const [planDevComplete, setPlanDevComplete] = useState("");
  const [devComplete, setDevComplete] = useState("");
  const [marketPrepComplete, setMarketPrepComplete] = useState("");
  const [commercialRollout, setCommercialRollout] = useState("");
  const [targetedLaunch, setTargetedLaunch] = useState("");
  
  // Approvals
  const [approvals, setApprovals] = useState([
    { person: "Jane Pemberton", title: "Chief Executive Officer & President", signature: "", date: "" },
    { person: "Todd Walter", title: "Chief Financial & Operating Officer", signature: "", date: "" },
    { person: "John Troup", title: "Chief Science, Education, Quality & Regulatory Officer", signature: "", date: "" },
    { person: "Andrew O'Rourke", title: "Chief Strategy Officer", signature: "", date: "" },
    { person: "Florian Bernodat", title: "Chief Manufacturing Officer", signature: "", date: "" },
    { person: "Tom Houle", title: "VP of Sales", signature: "", date: "" },
    { person: "Meagan Purdy/Kristie Celentano", title: "Brand Manager", signature: "", date: "" },
  ]);
  
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const updateCompetitor = (index: number, field: string, value: string) => {
    setCompetitors(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const updateApproval = (index: number, field: string, value: string) => {
    setApprovals(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const totalInitialCost = (parseFloat(quantity) || 0) * (parseFloat(costPerUnit) || 0);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const formData = {
      type: "gate2",
      productIdea, launchType, brand, targetedLaunchDate, submittalDate,
      product: { supplementFacts, trademarkStatements, bottleCount, servingSize, suggestedUse, deliveryFormat, unitSize, bottle, lid, label, otherPackaging, shelfLife, attributes, veganVegetarian, nonGmo, halalKosher, otherLabelReq },
      positioning: { problemSolving, gapInMarket, bigIdea, keyDifferentiators, consumerBenefits, howProductWorks, structureClaims, substantiation, productInfoSheet },
      competitors,
      pricing: { pricingStrategy, msrp, wsp, amazon, emersonFullscript, international },
      financials: {
        year1: { bottles: year1Bottles, netSales: year1NetSales, cogs: year1Cogs, grossMargin: year1GrossMargin, gmPercent: year1GmPercent },
        year2: { bottles: year2Bottles, netSales: year2NetSales, cogs: year2Cogs, grossMargin: year2GrossMargin, gmPercent: year2GmPercent },
        year3: { bottles: year3Bottles, netSales: year3NetSales, cogs: year3Cogs, grossMargin: year3GrossMargin, gmPercent: year3GmPercent },
        assumptions,
      },
      promotion: { promotionalEffort, sampling, amazonKeywords, advertisingPr, directSelling, digitalMarketing, educationalProgramming, marketingSynergies },
      production: { manufacturer, leadTime, quantity, costPerUnit, totalInitialCost },
      risk: {
        operations: { level: operationsRisk, description: operationsRiskDesc },
        regulatory: { level: regulatoryRisk, description: regulatoryRiskDesc },
        quality: { level: qualityRisk, description: qualityRiskDesc },
        manufacturing: { level: manufacturingRisk, description: manufacturingRiskDesc },
      },
      developmentPlan: { planDevComplete, devComplete, marketPrepComplete, commercialRollout, targetedLaunch },
      approvals,
    };

    try {
      const res = await fetch("/api/gate2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) setMessage("Gate 2 document saved!");
      else setMessage("Failed to save");
    } catch {
      setMessage("Error saving");
    } finally {
      setSaving(false);
    }
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "product", label: "Product" },
    { key: "positioning", label: "Positioning" },
    { key: "competitive", label: "Competitive" },
    { key: "pricing", label: "Pricing & Financials" },
    { key: "promotion", label: "Promotion" },
    { key: "production", label: "Production" },
    { key: "risk", label: "Risk & Plan" },
    { key: "approvals", label: "Approvals" },
  ];

  const inputClasses = "w-full border-2 border-gray-300 rounded-lg p-2 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none";
  const labelClasses = "block text-sm font-semibold text-gray-800 mb-1";
  const sectionClasses = "bg-white border-2 border-gray-300 rounded-lg p-6 space-y-4 shadow-sm";
  const textareaClasses = inputClasses + " min-h-[80px]";


  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Gate 2 Approval (Portfolio Entry)</h1>
      <p className="text-gray-600 mb-4">REV01 – Date Effective 11.12.2024</p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 mb-6 border-b-2 border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-2 text-sm font-medium rounded-t-lg transition ${
              activeTab === tab.key ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Product Tab */}
        {activeTab === "product" && (
          <div className="space-y-6">
            <div className={sectionClasses}>
              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Product Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClasses}>Product Idea</label><input type="text" value={productIdea} onChange={(e) => setProductIdea(e.target.value)} className={inputClasses} /></div>
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
                <div><label className={labelClasses}>Targeted Launch Date</label><input type="date" value={targetedLaunchDate} onChange={(e) => setTargetedLaunchDate(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Submittal Date</label><input type="date" value={submittalDate} onChange={(e) => setSubmittalDate(e.target.value)} className={inputClasses} /></div>
              </div>
            </div>

            <div className={sectionClasses}>
              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Product Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClasses}>Supplement Facts</label><textarea value={supplementFacts} onChange={(e) => setSupplementFacts(e.target.value)} className={textareaClasses} /></div>
                <div><label className={labelClasses}>Required Trademark Statements</label><textarea value={trademarkStatements} onChange={(e) => setTrademarkStatements(e.target.value)} className={textareaClasses} /></div>
                <div><label className={labelClasses}>Bottle Count</label><input type="text" value={bottleCount} onChange={(e) => setBottleCount(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Serving Size</label><input type="text" value={servingSize} onChange={(e) => setServingSize(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Suggested Use</label><input type="text" value={suggestedUse} onChange={(e) => setSuggestedUse(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Delivery Format</label><input type="text" value={deliveryFormat} onChange={(e) => setDeliveryFormat(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Unit Size</label><input type="text" value={unitSize} onChange={(e) => setUnitSize(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Bottle</label><input type="text" value={bottle} onChange={(e) => setBottle(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Lid</label><input type="text" value={lid} onChange={(e) => setLid(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Label</label><input type="text" value={label} onChange={(e) => setLabel(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Other Packaging</label><input type="text" value={otherPackaging} onChange={(e) => setOtherPackaging(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Shelf Life</label><input type="text" value={shelfLife} onChange={(e) => setShelfLife(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Attributes (Free From)</label><input type="text" value={attributes} onChange={(e) => setAttributes(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Vegan/Vegetarian</label><input type="text" value={veganVegetarian} onChange={(e) => setVeganVegetarian(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Non GMO</label><input type="text" value={nonGmo} onChange={(e) => setNonGmo(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Halal/Kosher</label><input type="text" value={halalKosher} onChange={(e) => setHalalKosher(e.target.value)} className={inputClasses} /></div>
                <div className="col-span-2"><label className={labelClasses}>Other Label Requirements</label><input type="text" value={otherLabelReq} onChange={(e) => setOtherLabelReq(e.target.value)} className={inputClasses} /></div>
              </div>
            </div>
          </div>
        )}


        {/* Positioning Tab */}
        {activeTab === "positioning" && (
          <div className={sectionClasses}>
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Positioning</h2>
            <div className="space-y-4">
              <div><label className={labelClasses}>Problem We are Solving</label><textarea value={problemSolving} onChange={(e) => setProblemSolving(e.target.value)} className={textareaClasses} /></div>
              <div><label className={labelClasses}>Gap Being Filled in Market</label><textarea value={gapInMarket} onChange={(e) => setGapInMarket(e.target.value)} className={textareaClasses} /></div>
              <div><label className={labelClasses}>Big Idea</label><textarea value={bigIdea} onChange={(e) => setBigIdea(e.target.value)} className={textareaClasses} /></div>
              <div><label className={labelClasses}>Key Differentiators</label><textarea value={keyDifferentiators} onChange={(e) => setKeyDifferentiators(e.target.value)} className={textareaClasses} /></div>
              <div><label className={labelClasses}>Consumer Benefits</label><textarea value={consumerBenefits} onChange={(e) => setConsumerBenefits(e.target.value)} className={textareaClasses} /></div>
              <div><label className={labelClasses}>How the Product Works</label><textarea value={howProductWorks} onChange={(e) => setHowProductWorks(e.target.value)} className={textareaClasses} /></div>
              <div><label className={labelClasses}>Structure/Function Claims</label><textarea value={structureClaims} onChange={(e) => setStructureClaims(e.target.value)} className={textareaClasses} /></div>
              <div><label className={labelClasses}>Substantiation & References</label><textarea value={substantiation} onChange={(e) => setSubstantiation(e.target.value)} className={textareaClasses} /></div>
              <div><label className={labelClasses}>Product Information Sheet (link)</label><input type="text" value={productInfoSheet} onChange={(e) => setProductInfoSheet(e.target.value)} className={inputClasses} placeholder="Insert link to document" /></div>
            </div>
          </div>
        )}

        {/* Competitive Tab */}
        {activeTab === "competitive" && (
          <div className={sectionClasses}>
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Competitive Landscape</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-700 text-white">
                    <th className="border p-2">Brand</th>
                    <th className="border p-2">Product</th>
                    <th className="border p-2">MSRP</th>
                    <th className="border p-2">Count</th>
                    <th className="border p-2">Serving Size</th>
                    <th className="border p-2">Day Supply</th>
                    <th className="border p-2">$/Serving</th>
                    <th className="border p-2">$/Day</th>
                    <th className="border p-2">Website</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((comp, i) => (
                    <tr key={i} className="hover:bg-yellow-50">
                      {Object.keys(comp).map((field) => (
                        <td key={field} className="border p-1">
                          <input type="text" value={comp[field as keyof typeof comp]} onChange={(e) => updateCompetitor(i, field, e.target.value)} className="w-full p-1 border border-gray-300 rounded text-sm" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


        {/* Pricing & Financials Tab */}
        {activeTab === "pricing" && (
          <div className="space-y-6">
            <div className={sectionClasses}>
              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Price</h2>
              <div><label className={labelClasses}>Pricing Strategy & Justification</label><textarea value={pricingStrategy} onChange={(e) => setPricingStrategy(e.target.value)} className={textareaClasses} /></div>
              <div className="grid grid-cols-5 gap-4">
                <div><label className={labelClasses}>MSRP</label><input type="text" value={msrp} onChange={(e) => setMsrp(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>WSP</label><input type="text" value={wsp} onChange={(e) => setWsp(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Amazon</label><input type="text" value={amazon} onChange={(e) => setAmazon(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Emerson/Fullscript</label><input type="text" value={emersonFullscript} onChange={(e) => setEmersonFullscript(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>International</label><input type="text" value={international} onChange={(e) => setInternational(e.target.value)} className={inputClasses} /></div>
              </div>
            </div>

            <div className={sectionClasses}>
              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Financials</h2>
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
              <div><label className={labelClasses}>Assumptions (*Net Sales assumes Channel Mix weighted of...)</label><textarea value={assumptions} onChange={(e) => setAssumptions(e.target.value)} className={textareaClasses} placeholder="DTP: %, Amazon: %, EE/FS: %, DTC: %, International: %" /></div>
            </div>
          </div>
        )}


        {/* Promotion Tab */}
        {activeTab === "promotion" && (
          <div className={sectionClasses}>
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Promotion</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelClasses}>Promotional Effort ("A", "B", "C" launch)</label><input type="text" value={promotionalEffort} onChange={(e) => setPromotionalEffort(e.target.value)} className={inputClasses} /></div>
              <div><label className={labelClasses}>Sampling (if applicable)</label><input type="text" value={sampling} onChange={(e) => setSampling(e.target.value)} className={inputClasses} /></div>
              <div className="col-span-2"><label className={labelClasses}>Amazon Key Words</label><textarea value={amazonKeywords} onChange={(e) => setAmazonKeywords(e.target.value)} className={textareaClasses} /></div>
            </div>
            <div className="space-y-4 mt-4">
              <div><label className={labelClasses}>Advertising & PR</label><textarea value={advertisingPr} onChange={(e) => setAdvertisingPr(e.target.value)} className={textareaClasses} placeholder="Summarize the advertising and public relations content with the launch of this product" /></div>
              <div><label className={labelClasses}>Direct Selling Strategy</label><textarea value={directSelling} onChange={(e) => setDirectSelling(e.target.value)} className={textareaClasses} placeholder="Describe all of the materials to be created for sales team to sell this product and summarize strategy to penetrate direct sales channel" /></div>
              <div><label className={labelClasses}>Digital Marketing Strategy</label><textarea value={digitalMarketing} onChange={(e) => setDigitalMarketing(e.target.value)} className={textareaClasses} placeholder="Describe digital marketing content to be produced for launch of this product and summarize strategy to penetrate E-commerce channels" /></div>
              <div><label className={labelClasses}>Educational Programming</label><textarea value={educationalProgramming} onChange={(e) => setEducationalProgramming(e.target.value)} className={textareaClasses} placeholder="Summarize educational programming and timing to promote the product (e.g., webinars, poster presentations, etc.)" /></div>
              <div><label className={labelClasses}>Marketing Synergies</label><textarea value={marketingSynergies} onChange={(e) => setMarketingSynergies(e.target.value)} className={textareaClasses} placeholder="Summarize what other products that will be promoted and sold together with this launch" /></div>
            </div>
          </div>
        )}

        {/* Production Tab */}
        {activeTab === "production" && (
          <div className={sectionClasses}>
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Production</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-700 text-white">
                    <th className="border p-2">Manufacturer</th>
                    <th className="border p-2">Lead Time</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Cost/Unit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-yellow-50">
                    <td className="border p-1"><input type="text" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} className="w-full p-1 border border-gray-300 rounded" /></td>
                    <td className="border p-1"><input type="text" value={leadTime} onChange={(e) => setLeadTime(e.target.value)} className="w-full p-1 border border-gray-300 rounded" /></td>
                    <td className="border p-1"><input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full p-1 border border-gray-300 rounded" /></td>
                    <td className="border p-1"><input type="text" value={costPerUnit} onChange={(e) => setCostPerUnit(e.target.value)} className="w-full p-1 border border-gray-300 rounded" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <span className="font-semibold text-gray-800">Total Initial Cost:</span>
              <span className="ml-2 font-mono font-bold text-blue-800">${totalInitialCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        )}


        {/* Risk & Plan Tab */}
        {activeTab === "risk" && (
          <div className="space-y-6">
            <div className={sectionClasses}>
              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Risk Assessment & Mitigation</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-700 text-white">
                      <th className="border p-2 w-48">Risk Area</th>
                      <th className="border p-2 w-32">Level</th>
                      <th className="border p-2">Description & Mitigation Plan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-yellow-50">
                      <td className="border p-2 font-semibold">Operations</td>
                      <td className="border p-1">
                        <select value={operationsRisk} onChange={(e) => setOperationsRisk(e.target.value)} className="w-full p-1 border border-gray-300 rounded">
                          <option value="">Select...</option>
                          {RISK_LEVELS.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </td>
                      <td className="border p-1"><input type="text" value={operationsRiskDesc} onChange={(e) => setOperationsRiskDesc(e.target.value)} className="w-full p-1 border border-gray-300 rounded" /></td>
                    </tr>
                    <tr className="hover:bg-yellow-50">
                      <td className="border p-2 font-semibold">Regulatory</td>
                      <td className="border p-1">
                        <select value={regulatoryRisk} onChange={(e) => setRegulatoryRisk(e.target.value)} className="w-full p-1 border border-gray-300 rounded">
                          <option value="">Select...</option>
                          {RISK_LEVELS.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </td>
                      <td className="border p-1"><input type="text" value={regulatoryRiskDesc} onChange={(e) => setRegulatoryRiskDesc(e.target.value)} className="w-full p-1 border border-gray-300 rounded" /></td>
                    </tr>
                    <tr className="hover:bg-yellow-50">
                      <td className="border p-2 font-semibold">Quality</td>
                      <td className="border p-1">
                        <select value={qualityRisk} onChange={(e) => setQualityRisk(e.target.value)} className="w-full p-1 border border-gray-300 rounded">
                          <option value="">Select...</option>
                          {RISK_LEVELS.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </td>
                      <td className="border p-1"><input type="text" value={qualityRiskDesc} onChange={(e) => setQualityRiskDesc(e.target.value)} className="w-full p-1 border border-gray-300 rounded" /></td>
                    </tr>
                    <tr className="hover:bg-yellow-50">
                      <td className="border p-2 font-semibold">Manufacturing</td>
                      <td className="border p-1">
                        <select value={manufacturingRisk} onChange={(e) => setManufacturingRisk(e.target.value)} className="w-full p-1 border border-gray-300 rounded">
                          <option value="">Select...</option>
                          {RISK_LEVELS.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </td>
                      <td className="border p-1"><input type="text" value={manufacturingRiskDesc} onChange={(e) => setManufacturingRiskDesc(e.target.value)} className="w-full p-1 border border-gray-300 rounded" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={sectionClasses}>
              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">Development Plan</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClasses}>Plan Development Complete Date</label><input type="date" value={planDevComplete} onChange={(e) => setPlanDevComplete(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Development Complete Date</label><input type="date" value={devComplete} onChange={(e) => setDevComplete(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Market Preparedness Complete Date</label><input type="date" value={marketPrepComplete} onChange={(e) => setMarketPrepComplete(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Commercial Rollout Complete Date</label><input type="date" value={commercialRollout} onChange={(e) => setCommercialRollout(e.target.value)} className={inputClasses} /></div>
                <div><label className={labelClasses}>Targeted Launch Date</label><input type="date" value={targetedLaunch} onChange={(e) => setTargetedLaunch(e.target.value)} className={inputClasses} /></div>
              </div>
            </div>
          </div>
        )}


        {/* Approvals Tab */}
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

        {/* Submit */}
        <div className="flex items-center gap-4 mt-6">
          <button type="submit" disabled={saving} className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 shadow-md">
            {saving ? "Saving..." : "Save Gate 2 Document"}
          </button>
          {message && <span className={`font-semibold ${message.includes("saved") ? "text-green-700" : "text-red-700"}`}>{message}</span>}
        </div>
      </form>
    </div>
  );
}
