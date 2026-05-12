"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HintReveal } from "@/components/hint-reveal";
import { QuizQuestionView } from "@/components/quiz-question";
import { CodeBlock } from "@/components/code-block";
import { getTopic, TOPIC_COLOR_CLASSES } from "@/content/topics";
import { cn } from "@/lib/utils";

export default function PracticePage() {
  const params = useParams<{ topicId: string }>();
  const router = useRouter();
  const topic = getTopic(params.topicId);
  if (!topic) notFound();

  const colors = TOPIC_COLOR_CLASSES[topic.color];

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.push(`/learn/${topic.id}`)}>
          <ArrowLeft className="h-4 w-4" /> Konuya dön
        </Button>
        <Link href="/cheatsheet">
          <Button variant="ghost" size="sm">
            <BookOpen className="h-4 w-4" /> Cheatsheet
          </Button>
        </Link>
      </div>

      <header className="mb-8">
        <Badge variant={topic.color}>{topic.week}</Badge>
        <h1 className={cn("mt-3 text-3xl font-bold", colors.text)}>{topic.title}</h1>
        <p className="mt-2 text-slate-400">Alıştırmalar & quiz. Kafadan çözmeye çalış.</p>
      </header>

      {topic.exercises.length > 0 && (
        <section className="space-y-4 mb-12">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-400" />
            <h2 className="text-2xl font-semibold text-slate-100">Alıştırmalar</h2>
            <Badge variant="violet">{topic.exercises.length}</Badge>
          </div>
          {topic.exercises.map((ex, i) => (
            <Card key={ex.id}>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-300">
                    {i + 1}
                  </span>
                  <CardTitle className="text-base flex-1 font-normal text-slate-200">
                    {ex.prompt}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {ex.starter && <CodeBlock code={ex.starter} />}
                <HintReveal hints={ex.hints} solution={ex.solution} />
                {ex.expectedOutput && (
                  <div className="rounded-xl border border-slate-700/60 bg-black/40 p-3 font-mono text-xs text-emerald-300">
                    <div className="text-slate-500 mb-1">Beklenen çıktı:</div>
                    <pre className="whitespace-pre-wrap">{ex.expectedOutput}</pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </section>
      )}

      {topic.quiz.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-slate-100">Quiz</h2>
            <Badge variant="emerald">{topic.quiz.length} soru</Badge>
          </div>
          {topic.quiz.map((q, i) => (
            <QuizQuestionView key={q.id} question={q} index={i} />
          ))}
        </section>
      )}

      <div className="mt-12 flex justify-end">
        <Link href={`/learn/${topic.id}`}>
          <Button>
            Konuyu tekrar oku <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
