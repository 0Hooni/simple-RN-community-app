import styled from 'styled-components/native';
import { Post } from '../../../src/components/Post';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { PostDetail } from '@/src/lib/types';
import { fetchPostDetail } from '@/src/lib/api';
import { ActivityIndicator } from 'react-native';
import { Text } from 'react-native';

const Container = styled.ScrollView`
  flex: 1;
  padding: 24px 16px;
  background-color: white;
  gap: 16px;
`;

export default function PostDetailPage() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="black" />
      </Container>
    );
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <Container>
      <Post
        title={post?.title || ''}
        writer={post?.profiles?.nickname || ''}
        timeStamp={formatDate(post?.created_at || '')}
        content={post?.content || ''}
      />
    </Container>
  );
}
