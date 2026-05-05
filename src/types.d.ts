// src/types.ts
export type Chapter = {
  title: string;
  file: string;
  duration?: number;
};

export type Audiobook = {
  title: string;
  author: string;
  cover: string;
  chapters: Chapter[];
};
