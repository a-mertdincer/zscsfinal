"use client";

import Link from "next/link";
import { ArrowLeft, AlertTriangle, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cheatsheet, trapWarnings, type CheatSection } from "@/content/cheatsheet";
import { cn } from "@/lib/utils";

const colorClasses: Record<CheatSection["color"], { text: string; border: string; bg: string }> = {
  emerald: { text: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/5" },
  sky: { text: "text-sky-400", border: "border-sky-500/30", bg: "bg-sky-500/5" },
  amber: { text: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/5" },
  violet: { text: "text-violet-400", border: "border-violet-500/30", bg: "bg-violet-500/5" },
  rose: { text: "text-rose-400", border: "border-rose-500/30", bg: "bg-rose-500/5" },
};

export default function CheatsheetPage() {
  const [query, setQuery] = useState("");

  const filtered = cheatsheet
    .map((section) => ({
      ...section,
      items: query
        ? section.items.filter(
            (it) =>
              it.code.toLowerCase().includes(query.toLowerCase()) ||
              (it.note ?? "").toLowerCase().includes(query.toLowerCase())
          )
        : section.items,
    }))
    .filter((s) => s.items.length > 0);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 mb-6">
        <ArrowLeft className="h-4 w-4" /> Dashboard
      </Link>

      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-100">Cheatsheet</h1>
        <p className="mt-1 text-slate-400">
          NumPy + Pandas + Matplotlib. Sınav anı sözlüğün.
        </p>
      </header>

      {/* Sticky warnings */}
      <div className="sticky top-[64px] z-20 -mx-2 mb-8 rounded-2xl border border-rose-500/30 bg-rose-500/5 p-5 backdrop-blur">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-5 w-5 text-rose-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-rose-300">
            En sık yapılan hatalar
          </h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-slate-200">
          {trapWarnings.map((t, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-rose-400" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ara: arange, loc, subplot..."
          className="w-full rounded-xl border border-slate-700 bg-slate-900/60 pl-10 pr-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500/40 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((section) => {
          const colors = colorClasses[section.color];
          return (
            <Card key={section.id} className={cn("h-fit", colors.border)}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="text-lg">{section.emoji}</span>
                  <span className={colors.text}>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex flex-col gap-0.5 rounded-lg border border-slate-800/50 px-3 py-2",
                      colors.bg
                    )}
                  >
                    <code className="font-mono text-xs text-slate-100 break-all">
                      {item.code}
                    </code>
                    {item.note && (
                      <span className="text-[11px] text-slate-500">// {item.note}</span>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center text-slate-400">
          "{query}" için sonuç yok.
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <Link href="/">
          <Button variant="secondary">Dashboard'a dön</Button>
        </Link>
      </div>
    </div>
  );
}
