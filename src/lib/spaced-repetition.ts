export type Rating = "again" | "hard" | "easy";

export interface CardState {
  interval: number;
  ease: number;
  nextReview: string;
  reviewCount: number;
}

export const DEFAULT_STATE: CardState = {
  interval: 1,
  ease: 2.5,
  nextReview: new Date().toISOString(),
  reviewCount: 0,
};

export function reviewCard(state: CardState | undefined, rating: Rating): CardState {
  const s = state ?? { ...DEFAULT_STATE };
  let interval = s.interval;
  let ease = s.ease;

  if (rating === "again") {
    interval = 1;
    ease = Math.max(1.3, ease - 0.2);
  } else if (rating === "hard") {
    interval = Math.max(1, Math.round(interval * 1.2));
    ease = Math.max(1.3, ease - 0.05);
  } else {
    interval = Math.max(1, Math.round(interval * Math.max(1.3, ease)));
    ease = Math.min(5, ease + 0.1);
  }

  const next = new Date();
  next.setDate(next.getDate() + interval);

  return {
    interval,
    ease,
    nextReview: next.toISOString(),
    reviewCount: s.reviewCount + 1,
  };
}

export function isDue(state: CardState | undefined): boolean {
  if (!state) return true;
  return new Date(state.nextReview).getTime() <= Date.now();
}
