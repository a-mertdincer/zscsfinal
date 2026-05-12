"use client";

import Link from "next/link";
import { Grid3x3, Filter, Database, Table2, BarChart3, Workflow, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TOPIC_COLOR_CLASSES, type Topic } from "@/content/topics";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";

const iconMap = {
  grid: Grid3x3,
  filter: Filter,
  database: Database,
  table: Table2,
  chart: BarChart3,
  workflow: Workflow,
};

interface TopicCardProps {
  topic: Topic;
}

export function TopicCard({ topic }: TopicCardProps) {
  const progress = useStore((s) => s.topicProgress[topic.id]);
  const completed = progress?.completed.length ?? 0;
  const total = topic.sections.length;
  const pct = total > 0 ? (completed / total) * 100 : 0;
  const isDone = completed === total && total > 0;

  const Icon = iconMap[topic.icon];
  const colors = TOPIC_COLOR_CLASSES[topic.color];

  const barColor =
    topic.color === "emerald"
      ? "bg-emerald-500"
      : topic.color === "sky"
      ? "bg-sky-500"
      : topic.color === "amber"
      ? "bg-amber-500"
      : "bg-violet-500";

  return (
    <Link href={`/learn/${topic.id}`} className="group block">
      <Card
        className={cn(
          "h-full transition-all duration-200 group-hover:border-slate-700 group-hover:bg-slate-900/70",
          isDone && "ring-1 ring-emerald-500/40"
        )}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", colors.bg)}>
              <Icon className={cn("h-5 w-5", colors.text)} />
            </div>
            {isDone ? (
              <Badge variant="emerald" className="animate-fade-in">
                <CheckCircle2 className="h-3 w-3" /> Tamamlandı
              </Badge>
            ) : (
              <Badge variant="slate">{topic.week}</Badge>
            )}
          </div>
          <CardTitle className="mt-3">{topic.title}</CardTitle>
          <CardDescription className="line-clamp-2">{topic.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>İlerleme</span>
            <span className="font-mono">
              {completed} / {total}
            </span>
          </div>
          <Progress value={completed} max={total} barClassName={barColor} />
        </CardContent>
      </Card>
    </Link>
  );
}
