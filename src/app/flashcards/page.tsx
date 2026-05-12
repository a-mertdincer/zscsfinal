"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCcw, Trophy, Flame } from "lucide-react";
import Link from "next/link";
import { Flashcard } from "@/components/flashcard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { flashcards, type FlashcardTopic } from "@/content/flashcards";
import { useStore } from "@/store";
import { isDue } from "@/lib/spaced-repetition";
import { cn } from "@/lib/utils";

const topicFilters: { id: FlashcardTopic | "all"; label: string; variant: "emerald" | "sky" | "amber" | "violet" | "slate" }[] = [
  { id: "all", label: "Hepsi", variant: "slate" },
  { id: "numpy", label: "NumPy", variant: "emerald" },
  { id: "pandas", label: "Pandas", variant: "sky" },
  { id: "matplotlib", label: "Matplotlib", variant: "amber" },
  { id: "general", label: "Genel", variant: "violet" },
];

export default function FlashcardsPage() {
  const [filter, setFilter] = useState<FlashcardTopic | "all">("all");
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const flashcardState = useStore((s) => s.flashcardState);
  const review = useStore((s) => s.reviewFlashcard);
  const resetAll = useStore((s) => s.resetFlashcards);
  const streak = useStore((s) => s.streak);

  useEffect(() => setHydrated(true), []);

  const pool = useMemo(() => {
    const filtered = filter === "all" ? flashcards : flashcards.filter((c) => c.topic === filter);
    const due = filtered.filter((c) => isDue(flashcardState[c.id]));
    const future = filtered.filter((c) => !isDue(flashcardState[c.id]));
    return due.length > 0 ? due : future;
  }, [filter, flashcardState]);

  useEffect(() => {
    setIndex(0);
  }, [filter]);

  useEffect(() => {
    if (streak > 0 && streak % 10 === 0) {
      setToast(`🔥 Üst üste ${streak} doğru, beynin ısındı.`);
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [streak]);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center text-slate-500">
        Yükleniyor...
      </div>
    );
  }

  if (pool.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold text-slate-100">Hiç kart kalmadı.</h2>
        <p className="mt-2 text-slate-400">Bu filtrede şu an gözden geçirilecek bir şey yok.</p>
        <Button className="mt-6" onClick={() => setFilter("all")}>
          Tümüne dön
        </Button>
      </div>
    );
  }

  const currentCard = pool[index % pool.length];

  const handleRate = (rating: "again" | "hard" | "easy") => {
    review(currentCard.id, rating);
    setIndex((i) => i + 1);
  };

  const progress = Math.min(index, pool.length);

  return (
    <div className="relative mx-auto max-w-3xl px-6 py-10">
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-full border border-amber-500/30 bg-amber-500/15 px-4 py-2 text-sm text-amber-200 backdrop-blur"
        >
          {toast}
        </motion.div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (confirm("Tüm flashcard ilerlemesi sıfırlansın mı?")) resetAll();
          }}
        >
          <RefreshCcw className="h-4 w-4" /> Sıfırla
        </Button>
      </div>

      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-100">Flashcards</h1>
        <p className="mt-1 text-slate-400">
          Kartı çevir, kendini değerlendir. Spaced repetition senin için sırayı tutar.
        </p>
      </header>

      {/* Topic filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {topicFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition",
              filter === f.id
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
            <span>İlerleme</span>
            <span className="font-mono">
              {progress} / {pool.length}
            </span>
          </div>
          <Progress value={progress} max={pool.length} />
        </div>
        {streak > 0 && (
          <Badge variant="amber">
            <Flame className="h-3 w-3" /> {streak} streak
          </Badge>
        )}
      </div>

      {index >= pool.length ? (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-10 text-center">
          <Trophy className="mx-auto h-12 w-12 text-emerald-400" />
          <h2 className="mt-4 text-2xl font-semibold text-slate-100">Tur tamam, Zeynep.</h2>
          <p className="mt-2 text-slate-400">
            Bu seansta {pool.length} kart gözden geçirdin. Sonraki günde tekrar bak.
          </p>
          <Button className="mt-6" onClick={() => setIndex(0)}>
            Baştan başla
          </Button>
        </div>
      ) : (
        <Flashcard card={currentCard} onRate={handleRate} />
      )}
    </div>
  );
}
