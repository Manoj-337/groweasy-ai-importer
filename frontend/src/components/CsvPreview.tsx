"use client";

interface Props {
  data: any;
}

export default function CsvPreview({ data }: Props) {
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-4">
            <div>
                <h2 className="text-2xl font-bold">CSV Preview</h2>
                <p className="text-gray-500">
                    Review your uploaded data before importing.
                </p>
            </div>

            <div className="text-right">
                <p className="font-semibold">
                    {data.totalRows} Rows
                </p>
                <p className="text-gray-500">
                    {data.headers.length} Columns
                </p>
            </div>
        </div>

      <div className="overflow-auto rounded-xl border shadow bg-white max-h-[400px]">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-800 text-white sticky top-0">
            <tr>
              {data.headers.map((header: string) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.data.map((row: any, index: number) => (
              <tr
                key={index}
                className="border-b hover:bg-slate-50"
              >
                {data.headers.map((header: string) => (
                  <td
                    key={header}
                    className="px-4 py-3"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}