import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, fetchPostDetail, createComment } from '@/src/lib/api';
import { CreateCommentRequest } from '@/src/lib/types';
import { Alert } from 'react-native';

// 포스트 목록 조회
export const usePostList = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 2 * 60 * 1000, // 2분
  });
};

// 포스트 상세 조회
export const usePostDetail = (postId: string | undefined) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostDetail(postId!),
    enabled: !!postId,
    staleTime: 2 * 60 * 1000, // 2분
  });
};

// 댓글 작성
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentRequest) => createComment(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['post', variables.post_id],
      });

      Alert.alert('성공', '댓글이 작성되었습니다.');
    },
    onError: () => {
      Alert.alert('실패', '댓글 작성에 실패했습니다.');
    },
  });
};
