"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, HelpCircle } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/content/topics";

interface QuizQuestionProps {
  question: QuizQuestion;
  index: number;
  onResult?: (correct: boolean) => void;
}

export function QuizQuestionView({ question, index, onResult }: QuizQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [textAnswer, setTextAnswer] = useState("");

  const isCorrect = (() => {
    if (!submitted) return false;
    if (question.type === "mcq") return selected === question.answerId;
    if (!question.expectedAnswer) return false;
    return textAnswer.trim().toLowerCase().includes(question.expectedAnswer.toLowerCase());
  })();

  const submit = () => {
    setSubmitted(true);
    onResult?.(isCorrectSync());
  };

  function isCorrectSync() {
    if (question.type === "mcq") return selected === question.answerId;
    if (!question.expectedAnswer) return false;
    return textAnswer.trim().toLowerCase().includes(question.expectedAnswer.toLowerCase());
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-300">
          {index + 1}
        </span>
        <div className="flex-1 space-y-3">
          <p className="font-medium text-slate-100 leading-relaxed">{question.question}</p>
          {question.code && <CodeBlock code={question.code} />}

          {question.type === "mcq" && question.choices && (
            <div className="space-y-2">
              {question.choices.map((c) => {
                const chosen = selected === c.id;
                const correct = submitted && c.id === question.answerId;
                const wrong = submitted && chosen && c.id !== question.answerId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    disabled={submitted}
                    onClick={() => setSelected(c.id)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all",
                      chosen && !submitted && "border-emerald-500/50 bg-emerald-500/10",
                      !chosen && !submitted && "border-slate-700 hover:border-slate-600 hover:bg-slate-800/50",
                      correct && "border-emerald-500/60 bg-emerald-500/20 text-emerald-100",
                      wrong && "border-rose-500/60 bg-rose-500/15 text-rose-100"
                    )}
                  >
                    <span className="font-mono text-xs text-slate-500">{c.id.toUpperCase()})</span>
                    <span className="flex-1">{c.label}</span>
                    {correct && <Check className="h-4 w-4 text-emerald-400" />}
                    {wrong && <X className="h-4 w-4 text-rose-400" />}
                  </button>
                );
              })}
            </div>
          )}

          {(question.type === "predict" || question.type === "find-error") && (
            <div>
              <input
                type="text"
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                disabled={submitted}
                placeholder="Cevabını yaz..."
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none disabled:opacity-60"
              />
              {submitted && (
                <p className="mt-2 text-xs text-slate-400">
                  Beklenen anahtar: <span className="text-slate-300">{question.expectedAnswer}</span>
                </p>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            {!submitted ? (
              <Button
                size="sm"
                onClick={submit}
                disabled={
                  (question.type === "mcq" && !selected) ||
                  ((question.type === "predict" || question.type === "find-error") && !textAnswer.trim())
                }
              >
                Kontrol et
              </Button>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setSubmitted(false);
                  setSelected(null);
                  setTextAnswer("");
                }}
              >
                Tekrar dene
              </Button>
            )}
          </div>

          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={cn(
                  "flex items-start gap-2 rounded-xl border p-3 text-sm",
                  isCorrect
                    ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-100"
                    : "border-amber-500/30 bg-amber-500/5 text-amber-100"
                )}
              >
                {isCorrect ? (
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                ) : (
                  <HelpCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
                )}
                <div>
                  <div className="font-medium">{isCorrect ? "Doğru" : "Yakın ama..."}</div>
                  <div className="mt-1 text-slate-200">{question.explanation}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
