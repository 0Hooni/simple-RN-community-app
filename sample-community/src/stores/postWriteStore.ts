import { create } from 'zustand';

interface PostWriteStore {
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  resetForm: () => void;
}

export const usePostWriteStore = create<PostWriteStore>((set) => ({
  title: '',
  content: '',
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  resetForm: () => set({ title: '', content: '' }),
}));
