// Mendefinisikan interface untuk model Post
export interface PostModel {
  id: number;
  title: string;
  content: string;
}

// Mengekspor array posts dengan data awal
export const posts: PostModel[] = [
  { id: 1, title: "title 1", content: "body 1" },
  { id: 2, title: "title 2", content: "body 2" },
];
