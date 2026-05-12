"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Eye,
  Lightbulb,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";
import { examQuestions, type ExamQuestion } from "@/content/exam-questions";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";

const categories = [
  { id: "sample-final", label: "Sample Final (Fall 2021)", variant: "rose" as const },
  { id: "review", label: "Review Questions", variant: "violet" as const },
];

export default function ExamPage() {
  const [active, setActive] = useState<string>(examQuestions[0].id);
  const current = examQuestions.find((q) => q.id === active)!;

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 mb-6">
        <ArrowLeft className="h-4 w-4" /> Dashboard
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100">Sınav Modu</h1>
        <p className="mt-1 text-slate-400">
          Sample final + 3 review question. Önce kendin dene, sonra hint'lerle aç.
        </p>
      </header>

      {/* Tabs */}
      <div className="mb-8 space-y-6">
        {categories.map((cat) => {
          const qs = examQuestions.filter((q) => q.category === cat.id);
          return (
            <div key={cat.id}>
              <div className="mb-3 flex items-center gap-2">
                <h2 className="text-sm font-medium uppercase tracking-wider text-slate-400">
                  {cat.label}
                </h2>
                <Badge variant={cat.variant}>{qs.length} soru</Badge>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {qs.map((q) => (
                  <ExamTab key={q.id} q={q} active={active === q.id} onClick={() => setActive(q.id)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <ExamView question={current} />
    </div>
  );
}

function ExamTab({ q, active, onClick }: { q: ExamQuestion; active: boolean; onClick: () => void }) {
  const completed = useStore((s) => s.examProgress[q.id]?.completed);
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition",
        active
          ? "border-emerald-500/50 bg-emerald-500/5"
          : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
      )}
    >
      <PlayCircle className={cn("mt-0.5 h-4 w-4 flex-shrink-0", active ? "text-emerald-400" : "text-slate-500")} />
      <div className="flex-1 min-w-0">
        <div className="font-medium text-slate-100 truncate">{q.title}</div>
        <div className="text-xs text-slate-500 truncate">{q.subtitle}</div>
      </div>
      {completed && <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />}
    </button>
  );
}

function ExamView({ question }: { question: ExamQuestion }) {
  const [openSteps, setOpenSteps] = useState<Record<string, "hint" | "solution" | undefined>>({});
  const [showFullSolution, setShowFullSolution] = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  const [tryingState, setTryingState] = useState(true);

  const useHint = useStore((s) => s.useHint);
  const markComplete = useStore((s) => s.markExamComplete);
  const progress = useStore((s) => s.examProgress[question.id]);

  const toggleStep = (label: string, kind: "hint" | "solution") => {
    setOpenSteps((prev) => {
      const cur = prev[label];
      if (cur === kind) {
        const { [label]: _, ...rest } = prev;
        return rest;
      }
      if (kind === "hint" && cur !== "hint") useHint(question.id);
      return { ...prev, [label]: kind };
    });
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">{question.title}</CardTitle>
              <CardDescription className="mt-1">{question.subtitle}</CardDescription>
            </div>
            {progress?.completed && (
              <Badge variant="emerald">
                <CheckCircle2 className="h-3 w-3" /> Tamamlandı
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
              Bağlam
            </div>
            <p className="text-slate-200">{question.context}</p>
          </div>

          <p className="text-slate-300 leading-relaxed">{question.intro}</p>

          {question.setupCode && <CodeBlock code={question.setupCode} />}

          {tryingState && (
            <div className="flex items-start gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4">
              <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
              <div className="flex-1">
                <div className="font-medium text-emerald-200">Önce kendin dene</div>
                <p className="mt-1 text-sm text-emerald-100/80">
                  Adımları görmeden önce 5 dakikalığına kafadan çözmeye çalış. Kalemle yaz.
                </p>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setTryingState(false)}>
                Devam et
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {!tryingState && (
        <Card>
          <CardHeader>
            <CardTitle>Adım adım</CardTitle>
            <CardDescription>
              Her adım için önce hint'i aç. Tıkanırsan çözümü göster.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.steps.map((step) => {
              const state = openSteps[step.label];
              return (
                <div
                  key={step.label}
                  className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"
                >
                  <div className="flex items-start gap-3">
                    <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-slate-500" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="font-mono text-sm font-semibold text-emerald-300">
                          {step.label}
                        </span>
                      </div>
                      <p className="mt-1 text-slate-200">{step.prompt}</p>

                      <div className="mt-3 flex gap-2">
                        <Button
                          size="sm"
                          variant={state === "hint" ? "primary" : "outline"}
                          onClick={() => toggleStep(step.label, "hint")}
                        >
                          <Lightbulb className="h-3.5 w-3.5" />
                          Hint
                        </Button>
                        <Button
                          size="sm"
                          variant={state === "solution" ? "primary" : "outline"}
                          onClick={() => toggleStep(step.label, "solution")}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Çözüm
                        </Button>
                      </div>

                      <AnimatePresence>
                        {state === "hint" && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-3 flex gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-100"
                          >
                            <Lightbulb className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-amber-400" />
                            {step.hint}
                          </motion.div>
                        )}
                        {state === "solution" && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-3"
                          >
                            <CodeBlock code={step.solution} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {!tryingState && (
        <Card>
          <CardHeader>
            <CardTitle>Tam çözüm</CardTitle>
            <CardDescription>
              {showFullSolution
                ? "İşte hepsi bir arada. Yan yana koy, kendi yazdığınla kıyasla."
                : "Adımların hepsini bir arada görmek istersen aç."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!showFullSolution ? (
              <Button onClick={() => setShowFullSolution(true)}>
                <Eye className="h-4 w-4" /> Tam çözümü göster
              </Button>
            ) : (
              <CodeBlock code={question.fullSolution} showLineNumbers />
            )}

            {showFullSolution && (
              <div>
                <button
                  type="button"
                  onClick={() => setShowWhy((w) => !w)}
                  className="flex w-full items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/40 p-3 text-left text-sm text-slate-200 hover:border-slate-600"
                >
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform", showWhy && "rotate-180")}
                  />
                  Neden böyle yazdık?
                </button>
                <AnimatePresence>
                  {showWhy && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 overflow-hidden"
                    >
                      <div className="rounded-xl border border-violet-500/30 bg-violet-500/5 p-4 text-sm text-violet-100/90 leading-relaxed">
                        {question.whyExplanation}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {!progress?.completed && (
              <Button variant="secondary" onClick={() => markComplete(question.id)}>
                <CheckCircle2 className="h-4 w-4" /> Bu soruyu çözdüm
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
