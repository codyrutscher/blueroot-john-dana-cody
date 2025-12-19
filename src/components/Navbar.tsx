"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/products", label: "Products" },
    { href: "/spreadsheet", label: "Spreadsheet" },
  ];

  return (
    <nav className="bg-slate-900 text-white border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-14 gap-8">
          <Link href="/" className="font-semibold text-lg text-white hover:text-blue-300">
            Blueroot Health
          </Link>
          <div className="flex gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md transition ${
                  pathname.startsWith(link.href)
                    ? "bg-slate-700 text-white"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
