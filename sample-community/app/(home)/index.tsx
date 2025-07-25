import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { PostPreView } from '@/src/components';
import { fetchPosts } from '@/src/lib/api';
import { PostListItem } from '@/src/lib/types';
import styled from 'styled-components/native';
import { router } from 'expo-router';

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const LoadingText = styled.Text`
  text-align: center;
  padding: 20px;
`;

const ErrorText = styled.Text`
  text-align: center;
  padding: 20px;
  color: red;
`;

export default function Home() {
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPosts();
      setPosts(data);
    } catch (err) {
      setError('게시글을 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      setError(null);
      const data = await fetchPosts();
      setPosts(data);
    } catch (err) {
      setError('게시글을 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  if (loading) {
    return (
      <Container>
        <LoadingText>게시글을 불러오는 중...</LoadingText>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ErrorText>{error}</ErrorText>
      </Container>
    );
  }

  return (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {posts.map((post) => (
        <PostPreView
          key={post.id}
          title={post.title}
          writer={post.profiles?.nickname || '익명'}
          timeStamp={formatDate(post.created_at)}
          onPress={() => {
            router.push(`/${post.id}`);
          }}
        />
      ))}
    </Container>
  );
}
