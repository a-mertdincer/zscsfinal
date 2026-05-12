"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb, CheckCircle2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

interface HintRevealProps {
  hints: string[];
  solution: string;
  onSolutionShown?: () => void;
}

export function HintReveal({ hints, solution, onSolutionShown }: HintRevealProps) {
  const [revealed, setRevealed] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const canRevealMore = revealed < hints.length;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setRevealed((r) => Math.min(r + 1, hints.length))}
          disabled={!canRevealMore}
        >
          <Lightbulb className="h-4 w-4 text-amber-400" />
          Hint {Math.min(revealed + 1, hints.length)} al
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            setShowSolution(true);
            onSolutionShown?.();
          }}
          disabled={showSolution}
        >
          <Eye className="h-4 w-4" />
          {showSolution ? "Çözüm açıldı" : "Çözümü göster"}
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {hints.slice(0, revealed).map((hint, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4"
          >
            <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
            <div>
              <div className="text-xs font-medium text-amber-300">Hint {idx + 1}</div>
              <p className="mt-1 text-sm text-slate-200">{hint}</p>
            </div>
          </motion.div>
        ))}

        {showSolution && (
          <motion.div
            key="solution"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              Çözüm
            </div>
            <CodeBlock code={solution} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
