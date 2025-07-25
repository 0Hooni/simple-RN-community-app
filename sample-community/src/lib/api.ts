import { supabase } from './supabase';
import {
  Post,
  PostListItem,
  PostDetail,
  CommentWithAuthor,
  CreatePostRequest,
  CreateCommentRequest,
} from './types';

// 게시글 목록 조회 (최신순 정렬)
export const fetchPosts = async (): Promise<PostListItem[]> => {
  try {
    // 1. 게시글 목록 조회
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('id, title, author_id, created_at')
      .order('created_at', { ascending: false });

    if (postsError) throw postsError;
    if (!posts || posts.length === 0) return [];

    // 2. 작성자 정보 조회
    const authorIds = [...new Set(posts.map((post) => post.author_id))];
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, nickname')
      .in('id', authorIds);

    if (profilesError) throw profilesError;

    // 3. 데이터 결합
    return posts.map((post) => ({
      ...post,
      profiles:
        profiles?.find((profile) => profile.id === post.author_id) || null,
    }));
  } catch (error) {
    console.error('게시글 목록 조회 실패:', error);
    throw error;
  }
};

// 게시글 상세 조회
export const fetchPostDetail = async (postId: string): Promise<PostDetail> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        *,
        profiles:author_id (
          id,
          nickname,
          created_at
        ),
        comments (
          *,
          profiles:author_id (
            id,
            nickname
          )
        )
      `,
      )
      .eq('id', postId)
      .order('created_at', { ascending: true, foreignTable: 'comments' })
      .single();

    if (error) throw error;
    if (!data) throw new Error('게시글을 찾을 수 없습니다.');

    return data as PostDetail;
  } catch (error) {
    console.error('게시글 상세 조회 실패:', error);
    throw error;
  }
};

// 게시글 작성
export const createPost = async (
  postData: CreatePostRequest,
): Promise<Post> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert(postData)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('게시글 작성 실패:', error);
    throw error;
  }
};

// 댓글 목록 조회
export const fetchComments = async (
  postId: string,
): Promise<CommentWithAuthor[]> => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select(
        `
        *,
        profiles:author_id (
          id,
          nickname
        )
      `,
      )
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('댓글 조회 실패:', error);
    throw error;
  }
};

// 댓글 작성
export const createComment = async (
  commentData: CreateCommentRequest,
): Promise<CommentWithAuthor> => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .insert(commentData)
      .select(
        `
        *,
        profiles:author_id (
          id,
          nickname
        )
      `,
      )
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('댓글 작성 실패:', error);
    throw error;
  }
};

// 현재 사용자 프로필 조회
export const getCurrentUserProfile = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('로그인이 필요합니다.');
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('사용자 프로필 조회 실패:', error);
    throw error;
  }
};
