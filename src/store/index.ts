"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { reviewCard as srReview, type CardState, type Rating } from "@/lib/spaced-repetition";

export interface TopicProgress {
  completed: string[];
  quizScore: number;
  quizAnswered: number;
}

export interface ExamProgress {
  hintsUsed: number;
  completed: boolean;
}

interface AppState {
  topicProgress: Record<string, TopicProgress>;
  flashcardState: Record<string, CardState>;
  examProgress: Record<string, ExamProgress>;
  theme: "dark" | "light";
  streak: number;

  markSectionComplete: (topicId: string, sectionId: string) => void;
  unmarkSectionComplete: (topicId: string, sectionId: string) => void;
  setQuizResult: (topicId: string, score: number, answered: number) => void;

  reviewFlashcard: (cardId: string, rating: Rating) => void;
  resetFlashcards: () => void;

  useHint: (examId: string) => void;
  markExamComplete: (examId: string) => void;

  toggleTheme: () => void;
  incStreak: () => void;
  resetStreak: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      topicProgress: {},
      flashcardState: {},
      examProgress: {},
      theme: "dark",
      streak: 0,

      markSectionComplete: (topicId, sectionId) =>
        set((state) => {
          const cur = state.topicProgress[topicId] ?? { completed: [], quizScore: 0, quizAnswered: 0 };
          if (cur.completed.includes(sectionId)) return state;
          return {
            topicProgress: {
              ...state.topicProgress,
              [topicId]: { ...cur, completed: [...cur.completed, sectionId] },
            },
          };
        }),

      unmarkSectionComplete: (topicId, sectionId) =>
        set((state) => {
          const cur = state.topicProgress[topicId];
          if (!cur) return state;
          return {
            topicProgress: {
              ...state.topicProgress,
              [topicId]: { ...cur, completed: cur.completed.filter((id) => id !== sectionId) },
            },
          };
        }),

      setQuizResult: (topicId, score, answered) =>
        set((state) => {
          const cur = state.topicProgress[topicId] ?? { completed: [], quizScore: 0, quizAnswered: 0 };
          return {
            topicProgress: {
              ...state.topicProgress,
              [topicId]: { ...cur, quizScore: score, quizAnswered: answered },
            },
          };
        }),

      reviewFlashcard: (cardId, rating) =>
        set((state) => {
          const next = srReview(state.flashcardState[cardId], rating);
          return {
            flashcardState: { ...state.flashcardState, [cardId]: next },
            streak: rating === "easy" ? state.streak + 1 : 0,
          };
        }),

      resetFlashcards: () => set({ flashcardState: {}, streak: 0 }),

      useHint: (examId) =>
        set((state) => {
          const cur = state.examProgress[examId] ?? { hintsUsed: 0, completed: false };
          return {
            examProgress: {
              ...state.examProgress,
              [examId]: { ...cur, hintsUsed: cur.hintsUsed + 1 },
            },
          };
        }),

      markExamComplete: (examId) =>
        set((state) => {
          const cur = state.examProgress[examId] ?? { hintsUsed: 0, completed: false };
          return {
            examProgress: {
              ...state.examProgress,
              [examId]: { ...cur, completed: true },
            },
          };
        }),

      toggleTheme: () => set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),

      incStreak: () => set((state) => ({ streak: state.streak + 1 })),
      resetStreak: () => set({ streak: 0 }),
    }),
    {
      name: "cs125-prep-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
