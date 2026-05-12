"use client";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

SyntaxHighlighter.registerLanguage("python", python);

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export default function CodeBlockImpl({
  code,
  language = "python",
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className={`relative group ${className ?? ""}`}>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-md bg-slate-800/80 px-2 py-1 text-xs text-slate-300 opacity-0 transition group-hover:opacity-100 hover:bg-slate-700"
        aria-label="Kodu kopyala"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Kopyalandı" : "Kopyala"}
      </button>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers={showLineNumbers}
        customStyle={{
          borderRadius: "0.75rem",
          padding: "1rem",
          fontSize: "0.875rem",
          margin: 0,
          background: "rgba(15, 23, 42, 0.7)",
        }}
        codeTagProps={{ style: { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" } }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
