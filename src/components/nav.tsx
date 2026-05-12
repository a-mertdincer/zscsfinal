"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Layers, FileText, Sparkles, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/flashcards", label: "Flashcards", icon: Layers },
  { href: "/exam", label: "Sınav Modu", icon: FileText },
  { href: "/cheatsheet", label: "Cheatsheet", icon: BookOpen },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/30 transition-all group-hover:bg-emerald-500/20">
            <Sparkles className="h-4 w-4 text-emerald-400" />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-100">CS125 Prep</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Final · Yarın</div>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-all",
                  active
                    ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
