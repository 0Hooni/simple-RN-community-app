import styled from 'styled-components/native';
import { Button, Post, TextField } from '@/src/components';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { PostDetail } from '@/src/lib/types';
import { fetchPostDetail } from '@/src/lib/api';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text } from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 24px 16px;
  background-color: white;
`;

const WriteCommentContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 16px;
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
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    loadPostDetail();
  }, [postId]);

  const loadPostDetail = async () => {
    if (!postId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await fetchPostDetail(postId);
      setPost(data);
    } catch (error) {
      setError('게시글을 불러오는데 실패했습니다.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const handleWriteComment = async () => {
    if (!comment.trim()) {
      Alert.alert('댓글을 입력해주세요.');
      return;
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="black" />
      </LoadingContainer>
    );
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <Container>
        <ScrollContainer>
          <Post
            title={post?.title || ''}
            writer={post?.profiles?.nickname || ''}
            timeStamp={formatDate(post?.created_at || '')}
            content={post?.content || ''}
          />
        </ScrollContainer>
        <WriteCommentContainer>
          <TextField
            title="댓글"
            placeholder="댓글을 입력해주세요."
            value={comment}
            onChangeText={setComment}
          />
          <Button
            text="작성"
            onPress={handleWriteComment}
            backgroundColor="blue"
          />
        </WriteCommentContainer>
      </Container>
    </KeyboardAvoidingView>
  );
}
