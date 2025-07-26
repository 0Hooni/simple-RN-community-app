import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchPosts,
  fetchPostDetail,
  createComment,
  createPost,
} from '@/src/lib/api';
import { CreateCommentRequest, CreatePostRequest } from '@/src/lib/types';
import { Alert } from 'react-native';
import { router } from 'expo-router';

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

// 게시글 작성
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostRequest) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });

      Alert.alert('성공', '게시글이 작성되었습니다.', [
        {
          text: '확인',
          onPress: () => router.back(),
        },
      ]);
    },
    onError: () => {
      Alert.alert('오류', '게시글 작성에 실패했습니다.');
    },
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
