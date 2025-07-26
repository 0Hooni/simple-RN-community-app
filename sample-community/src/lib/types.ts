// 기본 사용자 프로필 타입
export interface Profile {
  id: string;
  nickname: string | null;
  created_at: string;
}

// 게시글 기본 타입
export interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
}

// 게시글 목록용 타입 (작성자 정보 포함)
export interface PostListItem {
  id: string;
  title: string;
  author_id: string;
  created_at: string;
  // 조인된 작성자 정보
  profiles: {
    id: string | null;
    nickname: string | null;
  } | null;
}

// 게시글 상세 타입 (댓글 포함)
export interface PostDetail extends Post {
  profiles: Profile | null;
  comments: CommentWithAuthor[];
}

// 댓글 기본 타입
export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
}

// 댓글 + 작성자 정보 타입
export interface CommentWithAuthor extends Comment {
  profiles: {
    id: string | null;
    nickname: string | null;
  } | null;
}

// 게시글 작성 요청 타입
export interface CreatePostRequest {
  title: string;
  content: string;
}

// 댓글 작성 요청 타입
export interface CreateCommentRequest {
  post_id: string;
  content: string;
}
