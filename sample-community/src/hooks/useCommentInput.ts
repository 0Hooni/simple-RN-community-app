import { useCommentStore } from '@/src/stores/commentStore';
import { useCreateComment } from './usePostQueries';
import { Alert } from 'react-native';

export const useCommentInput = (postId: string | undefined) => {
  const { commentInputs, setCommentInput, clearCommentInput } =
    useCommentStore();
  const createCommentMutation = useCreateComment();

  const comment = postId ? commentInputs[postId] || '' : '';

  const setComment = (value: string) => {
    if (postId) {
      setCommentInput(postId, value);
    }
  };

  const handleWriteComment = async () => {
    if (!comment.trim()) {
      Alert.alert('댓글을 입력해주세요.');
      return;
    }

    if (!postId) return;

    createCommentMutation.mutate(
      { post_id: postId, content: comment.trim() },
      {
        onSuccess: () => {
          clearCommentInput(postId);
        },
      },
    );

    return {
      comment,
      setComment,
      handleWriteComment,
      isSubmitting: createCommentMutation.isPending,
    };
  };
};
