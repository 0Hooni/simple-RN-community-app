import styled from 'styled-components/native';
import { Comment, Post, SmallButton, TextField } from '@/src/components';
import { useLocalSearchParams } from 'expo-router';
import { usePostDetail, useCreateComment, useCommentInput } from '@/src/hooks';
import { formatDate, formatDateTime } from '@/src/lib/dateUtils';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text } from 'react-native';
import { typography } from '@/src/styles';

const Container = styled.View`
  flex: 1;
  gap: 16px;
  background-color: white;
  padding-bottom: 16px;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 24px 16px;
  background-color: white;
`;

const ScrollContent = styled.View`
  flex: 1;
  gap: 16px;
`;

const Divider = styled.View`
  width: 100%;
  height: 2px;
  background-color: gray;
`;

const CommentTitle = styled.Text`
  font-size: ${typography.title3.fontSize}px;
  font-weight: ${typography.title3.fontWeight};
  line-height: ${typography.title3.lineHeight}px;
`;

const WriteCommentContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 16px;
`;

const TextFieldWrapper = styled.View`
  flex: 1;
`;

const LoadingContainer = styled.View`
  flex: 1;
  padding: 24px 16px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

export default function PostDetailPage() {
  const { postId } = useLocalSearchParams<{ postId: string }>();

  const { data: post, isLoading, error } = usePostDetail(postId);
  const { comment, setComment, handleWriteComment, isSubmitting } =
    useCommentInput(postId);

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="black" />
      </LoadingContainer>
    );
  }

  if (error) {
    return <Text>게시글을 불러오는데 실패했습니다.</Text>;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Container>
        <ScrollContainer>
          <ScrollContent>
            <Post
              title={post?.title || ''}
              writer={post?.profiles?.nickname || ''}
              timeStamp={formatDate(post?.created_at || '')}
              content={post?.content || ''}
            />
            <Divider />
            <CommentTitle>댓글 {post?.comments?.length || 0}개</CommentTitle>

            {/* 실제 댓글 목록 렌더링 */}
            {post?.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <Comment
                  key={comment.id}
                  author={comment.profiles?.nickname || '익명'}
                  timestamp={formatDateTime(comment.created_at)}
                  content={comment.content}
                />
              ))
            ) : (
              <Text
                style={{ textAlign: 'center', color: 'gray', marginTop: 20 }}
              >
                첫 번째 댓글을 작성해보세요!
              </Text>
            )}
          </ScrollContent>
        </ScrollContainer>
        <WriteCommentContainer>
          <TextFieldWrapper>
            <TextField
              title="댓글"
              placeholder="댓글을 입력해주세요."
              value={comment}
              onChangeText={setComment}
            />
          </TextFieldWrapper>
          <SmallButton
            text="↑"
            onPress={handleWriteComment}
            backgroundColor="blue"
          />
        </WriteCommentContainer>
      </Container>
    </KeyboardAvoidingView>
  );
}
