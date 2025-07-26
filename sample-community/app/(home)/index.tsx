import React from 'react';
import { RefreshControl } from 'react-native';
import { PostPreView } from '@/src/components';
import { usePostList } from '@/src/hooks';
import { formatSimpleDate } from '@/src/lib/dateUtils';
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
  const {
    data: posts = [],
    isLoading,
    error,
    refetch,
    isRefetching,
  } = usePostList();

  if (isLoading) {
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
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        <ErrorText>게시글을 불러오는데 실패했습니다.</ErrorText>
      </Container>
    );
  }

  return (
    <Container
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
    >
      {posts.map((post) => (
        <PostPreView
          key={post.id}
          title={post.title}
          writer={post.profiles?.nickname || '익명'}
          timeStamp={formatSimpleDate(post.created_at)}
          onPress={() => {
            router.push(`/${post.id}`);
          }}
        />
      ))}
    </Container>
  );
}
