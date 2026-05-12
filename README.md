# CS125 Final Prep — Zeynep

Yarınki CS125 finaline hazırlık. Tamamen lokal: backend yok, internet gerekmez. State `localStorage`'da.

## Çalıştır

```bash
npm install
npm run dev
```

Sonra: http://localhost:3000

## Yapı

- `/` — Dashboard (6 konu, flashcard, sınav simülasyonu)
- `/learn/[topicId]` — Konu anlatımı + örnek + tip + mini quiz
- `/practice/[topicId]` — Sadece alıştırma & quiz
- `/flashcards` — Spaced repetition (~40 kart)
- `/exam` — Sample Final Q1, Q2 + 3 Review question, adım adım hint
- `/cheatsheet` — Tek sayfada hızlı bakış

## Konu listesi

1. **NumPy Temelleri** (Hafta 9)
2. **Boolean Indexing** (Hafta 9)
3. **Pandas — Series & DataFrame** (Hafta 10)
4. **Pandas — loc, iloc, Filtreleme** (Hafta 11)
5. **Matplotlib** (Hafta 11-12)
6. **Tam Akış — Sınav Sorusu** (Hafta 13-14)

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind · Zustand (persist) · framer-motion · react-syntax-highlighter · lucide-react.

## Build

```bash
npm run build
npm start
```
