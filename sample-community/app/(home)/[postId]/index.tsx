import styled from 'styled-components/native';
import { Post } from '../../../src/components/Post';

const Container = styled.ScrollView`
  flex: 1;
  padding: 24px 16px;
  background-color: white;
  gap: 16px;
`;

export default function PostDetailPage() {
  return (
    <Container>
      <Post
        title="제목"
        writer="작성자"
        timeStamp="2025-01-01"
        content="내용"
      />
    </Container>
  );
}
