"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";

interface Item {
  pain: string;
  solution: string;
}

const items: Item[] = [
  {
    pain: "Manual, repetitive workflows eat up hours each week",
    solution: "We automate the busy-work so your team focuses on high-value tasks",
  },
  {
    pain: "Sensitive data can't leave your premises for AI processing",
    solution: "Our on-device models give you ChatGPT-class power without cloud risk",
  },
  {
    pain: "No visibility into ROI of existing tools",
    solution: "Built-in dashboards show hours & £ saved in real-time",
  },
];

export default function PainSolution({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "relative py-20 md:py-28 bg-gradient-to-b from-black via-slate-950 to-black px-4",
        className,
      )}
    >
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          From Pain <span className="text-red-400">❌</span> to Relief <span className="text-green-400">✔</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl">
          We obsess over the friction points that slow you down — then engineer AI workflows that erase them.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <XCircle className="h-8 w-8 text-red-500 flex-shrink-0" />
              <p className="text-lg text-gray-300 leading-relaxed">{item.pain}</p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="h-8 w-8 text-green-400 flex-shrink-0" />
              <p className="text-lg text-white leading-relaxed">{item.solution}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 