"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";
import { ThumbsDown, Brain, ThumbsUp } from "lucide-react";
import type { Flashcard as FlashcardType } from "@/content/flashcards";
import type { Rating } from "@/lib/spaced-repetition";

interface FlashcardProps {
  card: FlashcardType;
  onRate: (rating: Rating) => void;
}

const topicVariant: Record<FlashcardType["topic"], "emerald" | "sky" | "amber" | "violet"> = {
  numpy: "emerald",
  pandas: "sky",
  matplotlib: "amber",
  general: "violet",
};

const topicLabel: Record<FlashcardType["topic"], string> = {
  numpy: "NumPy",
  pandas: "Pandas",
  matplotlib: "Matplotlib",
  general: "Genel",
};

export function Flashcard({ card, onRate }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleRate = (rating: Rating) => {
    onRate(rating);
    setFlipped(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className="relative h-[360px] w-full cursor-pointer [perspective:1200px]"
        onClick={() => setFlipped((f) => !f)}
      >
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Front */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 rounded-2xl border border-slate-700 bg-slate-900/80 p-8 [backface-visibility:hidden] shadow-xl">
            <Badge variant={topicVariant[card.topic]}>{topicLabel[card.topic]}</Badge>
            <p className="text-center text-2xl font-medium text-slate-100 leading-relaxed">
              {card.front}
            </p>
            <span className="text-xs uppercase tracking-wide text-slate-500">
              Çevirmek için tıkla
            </span>
          </div>

          {/* Back */}
          <div className="absolute inset-0 flex flex-col gap-4 overflow-auto rounded-2xl border border-emerald-500/30 bg-slate-900/90 p-8 [backface-visibility:hidden] shadow-xl [transform:rotateY(180deg)]">
            <Badge variant={topicVariant[card.topic]} className="self-start">
              {topicLabel[card.topic]}
            </Badge>
            <p className="text-lg leading-relaxed text-slate-100">{card.back}</p>
            {card.codeExample && (
              <div className="mt-auto">
                <CodeBlock code={card.codeExample} />
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="danger" size="lg" onClick={() => handleRate("again")}>
              <ThumbsDown className="h-4 w-4" />
              Bilmedim
            </Button>
            <Button variant="secondary" size="lg" onClick={() => handleRate("hard")}>
              <Brain className="h-4 w-4" />
              Zor bildim
            </Button>
            <Button variant="primary" size="lg" onClick={() => handleRate("easy")}>
              <ThumbsUp className="h-4 w-4" />
              Kolay
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
