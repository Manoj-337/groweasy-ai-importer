"use client";

import { Database, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <Database className="text-blue-600" size={30} />

          <div>
            <h1 className="font-bold text-xl">
              GrowEasy AI Importer
            </h1>

            <p className="text-gray-500 text-sm">
              AI Powered CRM Data Extraction
            </p>
          </div>
        </div>

        <Sparkles className="text-yellow-500" />
      </div>
    </header>
  );
}