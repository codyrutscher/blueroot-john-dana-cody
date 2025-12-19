import Link from "next/link";

export default function Home() {
  const sections = [
    {
      href: "/financial",
      title: "Financial Projections",
      desc: "Pricing inputs and 36-month spreadsheet with Revenue, COGS, Gross Margin, Cash Flow",
    },
    {
      href: "/gate2",
      title: "Gate 2 - Portfolio Entry",
      desc: "Product idea, positioning, competitive landscape, pricing, financials, promotion, risk assessment",
    },
    {
      href: "/gate3",
      title: "Gate 3 - Approval Sheet",
      desc: "Final product details, market preparation, label design, production planning, approvals",
    },
    {
      href: "/psf",
      title: "PSF - Product Setup Form",
      desc: "Product summary, raw materials, bill of materials, label, demand planning",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">New Product Development</h1>
      <p className="text-gray-600 mb-8">Select a section to begin:</p>

      <div className="grid grid-cols-2 gap-6">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="p-6 border-2 border-gray-300 rounded-lg bg-white hover:border-blue-600 hover:bg-blue-50 transition shadow-sm"
          >
            <h2 className="font-bold text-xl text-gray-900 mb-2">{s.title}</h2>
            <p className="text-gray-600 text-sm">{s.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
