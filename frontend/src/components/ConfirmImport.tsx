"use client";

import api from "@/services/api";

interface Props {
  previewData: any;
  setCRMData: (data: any[]) => void;
  setLoading: (loading: boolean) => void;
  setStats: (stats: {
    imported: number;
    skipped: number;
  }) => void;
}

export default function ConfirmImport({
  previewData,
  setCRMData,
  setLoading,
  setStats,
}: Props) {
  const handleImport = async () => {
    try {
      setLoading(true);

      const response = await api.post("/import", {
        records: previewData.data,
      });

      console.log("Import Response:", response.data);

      setCRMData(response.data.records);

      setStats({
        imported: response.data.totalImported ?? 0,
        skipped: response.data.totalSkipped ?? 0,
      });
    } catch (error:any) {
      console.error("Import failed:", error);
      console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);
      alert(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Import failed."
        );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-end mt-6">
      <button
        onClick={handleImport}
        className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg font-semibold shadow-md disabled:opacity-50"
        disabled={previewData?.data?.length === 0}
      >
        Confirm Import
      </button>
    </div>
  );
}