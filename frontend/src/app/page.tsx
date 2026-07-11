"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import UploadCard from "@/components/UploadCard";
import CsvPreview from "@/components/CsvPreview";
import ConfirmImport from "@/components/ConfirmImport";
import StatsCards from "@/components/StatsCards";
import ResultTable from "@/components/ResultTable";

export default function Home() {
  const [previewData, setPreviewData] = useState<any>(null);
  const [crmData, setCrmData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  

  const [stats, setStats] = useState({
    imported: 0,
    skipped: 0,
  });

  return (
    <main className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-10 shadow-xl text-white mb-10">
          <h1 className="text-4xl md:text-5xl font-bold">
            AI Powered CSV Importer
          </h1>

          <p className="mt-4 text-lg text-blue-100 max-w-3xl">
            Upload any CRM CSV, preview the records, and let Gemini AI
            intelligently transform your data into the GrowEasy CRM format.
          </p>
        </div>

        {/* Upload */}
        <UploadCard setPreviewData={setPreviewData} />

        

        {/* CSV Preview */}
        {previewData && (
          <>
            <CsvPreview data={previewData} />

            <ConfirmImport
              previewData={previewData}
              setCRMData={setCrmData}
              setLoading={setLoading}
              setStats={setStats}
            />
          </>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <div className="animate-spin h-14 w-14 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>

            <h2 className="text-2xl font-semibold mt-6">
              Analyzing CSV with Gemini AI
            </h2>

            <p className="text-gray-500 mt-3">
              Please wait while we intelligently map your CRM fields...
            </p>
          </div>
        )}

        {/* Results */}
        {crmData.length > 0 && (
          <>
            <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-green-700 text-2xl font-semibold">
                ✅ Import Completed Successfully
              </h2>

              <p className="mt-2 text-green-600">
                Successfully imported{" "}
                <strong>{stats.imported}</strong> CRM records.
              </p>
            </div>

            <StatsCards
              imported={stats.imported}
              skipped={stats.skipped}
            />

            <ResultTable data={crmData} />
          </>
        )}
      </div>
    </main>
  );
}