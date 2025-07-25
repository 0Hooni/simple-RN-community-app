import { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { PostListItem } from '../../src/lib/types';
import { fetchPosts } from '@/src/lib/api';
import { PostPreView } from '../../src/components/PostPreView';

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const LodingText = styled.Text`
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  if (loading) {
    return (
      <Container>
        <LodingText>게시글을 불러오는 중입니다...</LodingText>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorText>{error}</ErrorText>
      </Container>
    );
  }

  return (
    <Container>
      {posts.map((post) => (
        <PostPreView
          key={post.id}
          title={post.title}
          writer={post.profiles?.nickname || '익명'}
          timeStamp={formatDate(post.created_at)}
          onPress={() => {
            console.log('게시글 클릭:', post.id);
          }}
        />
      ))}
    </Container>
  );
}
