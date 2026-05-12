"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Layers, Sparkles, FileText, Trophy, Flame } from "lucide-react";
import { TopicCard } from "@/components/topic-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { topics } from "@/content/topics";
import { flashcards } from "@/content/flashcards";
import { examQuestions } from "@/content/exam-questions";
import { useStore } from "@/store";
import { isDue } from "@/lib/spaced-repetition";

const motivations = [
  "Panik yapma, içerik aslında 6 hafta. Sırayla gidelim.",
  "NumPy ve Pandas → sadece tablo ve liste. Felsefe okuyabilen biri bunu çözer.",
  "Bu app sınava kadar açık kalsın, takıldıkça aç.",
  "Bir filtre, bir döngü, bir grafik. Hepsi bu.",
];

export default function Dashboard() {
  const [motivation, setMotivation] = useState(motivations[0]);
  const flashcardState = useStore((s) => s.flashcardState);
  const examProgress = useStore((s) => s.examProgress);
  const topicProgress = useStore((s) => s.topicProgress);
  const streak = useStore((s) => s.streak);

  useEffect(() => {
    setMotivation(motivations[Math.floor(Math.random() * motivations.length)]);
  }, []);

  const dueCount = useMemo(
    () => flashcards.filter((c) => isDue(flashcardState[c.id])).length,
    [flashcardState]
  );

  const examDone = useMemo(
    () => examQuestions.filter((q) => examProgress[q.id]?.completed).length,
    [examProgress]
  );

  const totalSections = topics.reduce((sum, t) => sum + t.sections.length, 0);
  const completedSections = topics.reduce(
    (sum, t) => sum + (topicProgress[t.id]?.completed.length ?? 0),
    0
  );
  const totalProgress = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0;
  const allDone = totalProgress === 100;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <Badge variant="emerald" className="mb-4">
          <Sparkles className="h-3 w-3" /> Final · Yarın
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-50">
          CS125 Final —{" "}
          <span className="gradient-text-emerald">Yarın hallederiz Zeynep.</span>
        </h1>
        <p className="mt-4 text-lg text-slate-400">{motivation}</p>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-amber-400" />
            <span className="text-slate-300">
              Toplam ilerleme: <span className="font-semibold text-slate-100">{totalProgress}%</span>
            </span>
          </div>
          {streak > 0 && (
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-400" />
              <span className="text-slate-300">
                Streak: <span className="font-semibold text-slate-100">{streak}</span>
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {allDone && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 shadow-lg shadow-emerald-500/10"
        >
          <h2 className="text-xl font-semibold text-emerald-200">
            Zeynep, müfredatı kapattın.
          </h2>
          <p className="mt-1 text-emerald-100/80">
            Şimdi flashcard'larla pekiştir, sonra sınav simülasyonuna geç. Yarın senin günün.
          </p>
        </motion.div>
      )}

      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-slate-400">
          <BookOpen className="h-4 w-4" /> Konuları öğren
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </section>

      <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="transition-all hover:border-slate-700">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                <Layers className="h-5 w-5 text-violet-400" />
              </div>
              <Badge variant="violet">{dueCount} kart bekliyor</Badge>
            </div>
            <CardTitle className="mt-3">Flashcard çalış</CardTitle>
            <CardDescription>
              {flashcards.length} kart hazır. Spaced repetition ile beynin uzun süre tutsun.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/flashcards">
              <Button className="w-full">
                Başla
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="transition-all hover:border-slate-700">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10">
                <FileText className="h-5 w-5 text-rose-400" />
              </div>
              <Badge variant="rose">
                {examDone} / {examQuestions.length} tamamlandı
              </Badge>
            </div>
            <CardTitle className="mt-3">Sınav simülasyonu</CardTitle>
            <CardDescription>
              Sample final (2 soru) + 3 review question. Adım adım hint'lerle.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/exam">
              <Button variant="secondary" className="w-full">
                Sınavlara bak
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      <Link
        href="/cheatsheet"
        className="group flex items-center justify-between rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-6 transition-all hover:border-amber-500/40"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
            <BookOpen className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <div className="font-semibold text-slate-100">Cheatsheet'i aç</div>
            <div className="text-sm text-slate-400">
              Tek sayfada NumPy + Pandas + Matplotlib. Sınav anında bak, hatırla.
            </div>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-amber-400" />
      </Link>
    </div>
  );
}
