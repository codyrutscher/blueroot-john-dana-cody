import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-white mb-2">New Product Development</h1>
      <p className="text-gray-300 mb-8">Manage products through the development pipeline</p>

      <div className="grid grid-cols-2 gap-6">
        <Link
          href="/products"
          className="p-6 border-2 border-gray-600 rounded-lg bg-slate-800 hover:border-blue-500 hover:bg-slate-700 transition shadow-sm"
        >
          <h2 className="font-bold text-xl text-white mb-2">📦 Products</h2>
          <p className="text-gray-400 text-sm">View all products, create new products, manage development stages</p>
        </Link>

        <Link
          href="/spreadsheet"
          className="p-6 border-2 border-gray-600 rounded-lg bg-slate-800 hover:border-blue-500 hover:bg-slate-700 transition shadow-sm"
        >
          <h2 className="font-bold text-xl text-white mb-2">📊 Forecasting Spreadsheet</h2>
          <p className="text-gray-400 text-sm">View 36-month projections for all products in spreadsheet format</p>
        </Link>
      </div>
    </main>
  );
}
