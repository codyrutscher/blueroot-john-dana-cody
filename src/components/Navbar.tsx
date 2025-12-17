"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-14 gap-8">
          <span className="font-semibold text-lg">Blueroot Health</span>
          <div className="flex gap-1">
            <Link
              href="/spreadsheet"
              className={`px-4 py-2 rounded-md transition ${
                pathname === "/spreadsheet"
                  ? "bg-slate-600"
                  : "hover:bg-slate-700"
              }`}
            >
              Forecasting Sheet
            </Link>
            <Link
              href="/form"
              className={`px-4 py-2 rounded-md transition ${
                pathname === "/form" ? "bg-slate-600" : "hover:bg-slate-700"
              }`}
            >
              Form
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
