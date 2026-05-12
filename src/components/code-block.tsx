"use client";

import dynamic from "next/dynamic";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

const Impl = dynamic(() => import("./code-block-impl"), {
  ssr: false,
  loading: () => (
    <pre className="rounded-xl bg-slate-900/70 p-4 font-mono text-sm text-slate-300 overflow-x-auto border border-slate-800">
      <code>Yükleniyor...</code>
    </pre>
  ),
});

export function CodeBlock(props: CodeBlockProps) {
  return <Impl {...props} />;
}
