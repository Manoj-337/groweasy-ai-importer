"use client";

import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";

interface CRMRecord {
  created_at?: string;
  name?: string;
  email?: string;
  country_code?: string;
  mobile_without_country_code?: string;
  company?: string;
  city?: string;
  state?: string;
  country?: string;
  lead_owner?: string;
  crm_status?: string;
  crm_note?: string;
  data_source?: string;
  possession_time?: string;
  description?: string;
}

interface Props {
  data: CRMRecord[];
}

const columns: {
  key: keyof CRMRecord;
  label: string;
}[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "mobile_without_country_code", label: "Mobile" },
  { key: "company", label: "Company" },
  { key: "city", label: "City" },
  { key: "country", label: "Country" },
  { key: "crm_status", label: "Status" },
  { key: "lead_owner", label: "Lead Owner" },
  { key: "data_source", label: "Source" },
];

function getStatusColor(status?: string) {
  switch (status) {
    case "SALE_DONE":
      return "bg-green-100 text-green-700";

    case "GOOD_LEAD_FOLLOW_UP":
      return "bg-blue-100 text-blue-700";

    case "BAD_LEAD":
      return "bg-red-100 text-red-700";

    case "DID_NOT_CONNECT":
      return "bg-yellow-100 text-yellow-700";

    default:
      return "bg-gray-100 text-gray-600";
  }
}

export default function ResultTable({ data }: Props) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((record) => {
      const name = record.name?.toLowerCase() || "";
      const email = record.email?.toLowerCase() || "";

      return (
        name.includes(search.toLowerCase()) ||
        email.includes(search.toLowerCase())
      );
    });
  }, [data, search]);

  const exportCSV = () => {
    if (!filteredData.length) return;

    const headers = columns.map((c) => c.label).join(",");

    const rows = filteredData.map((record) =>
      columns
        .map((column) => {
          const value = record[column.key] ?? "";
          return `"${String(value).replace(/"/g, '""')}"`;
        })
        .join(",")
    );

    const csv = [headers, ...rows].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "crm-results.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  if (!data.length) return null;

  return (
    <div className="mt-10 bg-white rounded-xl shadow border p-6">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h2 className="text-2xl font-bold">
            AI Extracted CRM Records
          </h2>

          <p className="text-gray-500 mt-1">
            {filteredData.length} of {data.length} records
          </p>
        </div>

        <div className="flex gap-3">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-72 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Download size={18} />
            Export
          </button>

        </div>

      </div>

      <div className="overflow-auto max-h-[600px] rounded-lg border">

        <table className="min-w-full text-sm">

          <thead className="sticky top-0 bg-blue-600 text-white">

            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left whitespace-nowrap"
                >
                  {column.label}
                </th>
              ))}
            </tr>

          </thead>

          <tbody>

            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-10 text-gray-500"
                >
                  No matching records found.
                </td>
              </tr>
            ) : (
              filteredData.map((record, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50 transition"
                >
                  {columns.map((column) => {
                    const value = record[column.key];

                    if (column.key === "crm_status") {
                      return (
                        <td
                          key={column.key}
                          className="px-4 py-3"
                        >
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              value
                            )}`}
                          >
                            {value || "N/A"}
                          </span>
                        </td>
                      );
                    }

                    return (
                      <td
                        key={column.key}
                        className="px-4 py-3 whitespace-nowrap"
                      >
                        {value ? (
                          value
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}