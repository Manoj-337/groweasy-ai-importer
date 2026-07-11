"use client";

import { CheckCircle, XCircle, Database } from "lucide-react";

interface Props {
  imported: number;
  skipped: number;
}

export default function StatsCards({ imported, skipped }: Props) {
  const cards = [
    {
      title: "Imported",
      value: imported,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Skipped",
      value: skipped,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      title: "Total Records",
      value: imported + skipped,
      icon: Database,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-md border p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">{card.title}</p>

                <h2 className="text-4xl font-bold mt-3">
                  {card.value}
                </h2>
              </div>

              <div className={`${card.bg} p-3 rounded-full`}>
                <Icon className={card.color} size={30} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}