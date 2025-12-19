"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/financial", label: "Financial Projections" },
    { href: "/gate2", label: "Gate 2" },
    { href: "/gate3", label: "Gate 3" },
    { href: "/psf", label: "PSF" },
  ];

  return (
    <nav className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-14 gap-8">
          <Link href="/" className="font-semibold text-lg hover:text-blue-300">
            Blueroot Health
          </Link>
          <div className="flex gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md transition ${
                  pathname.startsWith(link.href)
                    ? "bg-slate-600"
                    : "hover:bg-slate-700"
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
