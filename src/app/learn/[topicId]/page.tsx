"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Circle, Lightbulb, Sparkles } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { OutputBlock } from "@/components/output-block";
import { QuizQuestionView } from "@/components/quiz-question";
import { HintReveal } from "@/components/hint-reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getTopic, TOPIC_COLOR_CLASSES, topics } from "@/content/topics";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";

export default function LearnPage() {
  const params = useParams<{ topicId: string }>();
  const router = useRouter();
  const topic = getTopic(params.topicId);
  if (!topic) notFound();

  const colors = TOPIC_COLOR_CLASSES[topic.color];
  const progress = useStore((s) => s.topicProgress[topic.id]);
  const mark = useStore((s) => s.markSectionComplete);
  const unmark = useStore((s) => s.unmarkSectionComplete);
  const setQuizResult = useStore((s) => s.setQuizResult);
  const completedSet = new Set(progress?.completed ?? []);

  const [quizAnswers, setQuizAnswers] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<string | null>(null);

  const handleQuizResult = (id: string, correct: boolean) => {
    setQuizAnswers((prev) => {
      const next = { ...prev, [id]: correct };
      const correctCount = Object.values(next).filter(Boolean).length;
      const answeredCount = Object.keys(next).length;
      setQuizResult(topic.id, correctCount, answeredCount);
      return next;
    });
  };

  const toggleSection = (sectionId: string) => {
    if (completedSet.has(sectionId)) {
      unmark(topic.id, sectionId);
    } else {
      mark(topic.id, sectionId);
      showToast("✨ Bir bölüm daha bitti. Devam Zeynep.");
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const totalSections = topic.sections.length;
  const completedCount = progress?.completed.length ?? 0;
  const allDone = completedCount === totalSections;

  const currentIdx = topics.findIndex((t) => t.id === topic.id);
  const nextTopic = topics[currentIdx + 1];
  const prevTopic = topics[currentIdx - 1];

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-10">
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-4 py-2 text-sm text-emerald-200 backdrop-blur"
        >
          {toast}
        </motion.div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
          <ArrowLeft className="h-4 w-4" /> Geri
        </Button>
        {allDone && (
          <Badge variant="emerald">
            <Check className="h-3 w-3" /> Tamamlandı
          </Badge>
        )}
      </div>

      <header className="mb-8">
        <Badge variant={topic.color}>{topic.week}</Badge>
        <h1 className={cn("mt-3 text-4xl font-bold tracking-tight", colors.text)}>
          {topic.title}
        </h1>
        <p className="mt-2 text-lg text-slate-400">{topic.subtitle}</p>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1">
            <Progress
              value={completedCount}
              max={totalSections}
              barClassName={
                topic.color === "emerald"
                  ? "bg-emerald-500"
                  : topic.color === "sky"
                  ? "bg-sky-500"
                  : topic.color === "amber"
                  ? "bg-amber-500"
                  : "bg-violet-500"
              }
            />
          </div>
          <span className="text-sm text-slate-400">
            {completedCount} / {totalSections}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 self-start h-fit">
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">
            Bölümler
          </div>
          <nav className="space-y-1">
            {topic.sections.map((section, idx) => {
              const done = completedSet.has(section.id);
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-400 transition hover:bg-slate-800/50 hover:text-slate-200"
                >
                  {done ? (
                    <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                  ) : (
                    <Circle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate-600" />
                  )}
                  <span>
                    <span className="font-mono text-xs text-slate-600">{idx + 1}.</span>{" "}
                    {section.title}
                  </span>
                </a>
              );
            })}
          </nav>

          <Link href={`/practice/${topic.id}`} className="block mt-6">
            <Button size="sm" className="w-full">
              Alıştırma & Quiz
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </aside>

        {/* Main */}
        <article className="space-y-10 min-w-0">
          {topic.sections.map((section, idx) => {
            const done = completedSet.has(section.id);
            return (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="scroll-mt-24"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2 className="text-2xl font-semibold text-slate-100">
                    <span className="text-slate-500 font-mono text-base mr-2">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </h2>
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className={cn(
                      "flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs transition",
                      done
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                        : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                    )}
                  >
                    {done ? (
                      <>
                        <Check className="h-3 w-3" /> Yaptım
                      </>
                    ) : (
                      <>
                        <Circle className="h-3 w-3" /> İşaretle
                      </>
                    )}
                  </button>
                </div>

                <div className="prose prose-invert max-w-none">
                  {section.explanation.split("\n\n").map((para, i) => (
                    <p key={i} className="text-slate-300 leading-relaxed whitespace-pre-line">
                      {renderInlineCode(para)}
                    </p>
                  ))}
                </div>

                {section.code && (
                  <div className="mt-4">
                    <CodeBlock code={section.code} />
                  </div>
                )}

                {section.output && (
                  <div className="mt-3">
                    <OutputBlock output={section.output} />
                  </div>
                )}

                {section.tip && (
                  <div className="mt-4 flex gap-3 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
                    <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-amber-300">
                        Sınav ipucu
                      </div>
                      <p className="mt-1 text-sm text-amber-100/90">{section.tip}</p>
                    </div>
                  </div>
                )}
              </motion.section>
            );
          })}

          {/* Mini exercises */}
          {topic.exercises.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-violet-400" />
                <h2 className="text-2xl font-semibold text-slate-100">Hadi sen dene</h2>
              </div>
              {topic.exercises.map((ex) => (
                <Card key={ex.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{ex.prompt}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {ex.starter && <CodeBlock code={ex.starter} />}
                    <HintReveal hints={ex.hints} solution={ex.solution} />
                  </CardContent>
                </Card>
              ))}
            </section>
          )}

          {/* Quiz */}
          {topic.quiz.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-100">Pekiştirme — kısa quiz</h2>
              <div className="space-y-3">
                {topic.quiz.map((q, i) => (
                  <QuizQuestionView
                    key={q.id}
                    question={q}
                    index={i}
                    onResult={(correct) => handleQuizResult(q.id, correct)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-800">
            {prevTopic ? (
              <Link href={`/learn/${prevTopic.id}`}>
                <Button variant="ghost">
                  <ArrowLeft className="h-4 w-4" /> {prevTopic.title}
                </Button>
              </Link>
            ) : (
              <div />
            )}
            {nextTopic && (
              <Link href={`/learn/${nextTopic.id}`}>
                <Button>
                  {nextTopic.title} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

function renderInlineCode(text: string): React.ReactNode {
  // Process **bold** and `code` inline.
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    const codeMatch = remaining.match(/`([^`]+)`/);

    const earliest = [
      boldMatch && { type: "bold" as const, m: boldMatch, idx: boldMatch.index! },
      codeMatch && { type: "code" as const, m: codeMatch, idx: codeMatch.index! },
    ]
      .filter((x): x is { type: "bold" | "code"; m: RegExpMatchArray; idx: number } => Boolean(x))
      .sort((a, b) => a.idx - b.idx)[0];

    if (!earliest) {
      parts.push(remaining);
      break;
    }

    if (earliest.idx > 0) parts.push(remaining.slice(0, earliest.idx));
    if (earliest.type === "bold") {
      parts.push(
        <strong key={key++} className="font-semibold text-slate-50">
          {earliest.m[1]}
        </strong>
      );
    } else {
      parts.push(
        <code
          key={key++}
          className="rounded bg-slate-800/80 px-1.5 py-0.5 font-mono text-[0.85em] text-emerald-300"
        >
          {earliest.m[1]}
        </code>
      );
    }
    remaining = remaining.slice(earliest.idx + earliest.m[0].length);
  }

  return parts;
}
