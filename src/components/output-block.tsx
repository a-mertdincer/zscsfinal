import { Terminal } from "lucide-react";

interface OutputBlockProps {
  output: string;
  label?: string;
}

export function OutputBlock({ output, label = "output" }: OutputBlockProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-700/60 bg-black/60">
      <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-2 text-xs text-slate-400">
        <Terminal className="h-3.5 w-3.5" />
        <span>{label}</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-emerald-300">
        {output}
      </pre>
    </div>
  );
}
