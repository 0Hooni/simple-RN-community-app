import { create } from 'zustand';

interface CommentStore {
  commentInputs: Record<string, string>; // postId별 댓글 입력값
  setCommentInput: (postId: string, value: string) => void;
  clearCommentInput: (postId: string) => void;
}

export const useCommentStore = create<CommentStore>((set) => ({
  commentInputs: {},
  setCommentInput: (postId, value) =>
    set((state) => ({
      commentInputs: { ...state.commentInputs, [postId]: value },
    })),
  clearCommentInput: (postId) =>
    set((state) => {
      const newInputs = { ...state.commentInputs };
      delete newInputs[postId];
      return { commentInputs: newInputs };
    }),
}));
