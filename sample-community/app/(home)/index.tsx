import { PostPreView } from '../../src/components/PostPreView';
import styled from 'styled-components/native';

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

export default function Home() {
  return (
    <Container>
      <PostPreView
        title="제목"
        writer="작성자"
        timeStamp="2025-01-01"
        onPress={() => {}}
      />
      <PostPreView
        title="제목"
        writer="작성자"
        timeStamp="2025-01-01"
        onPress={() => {}}
      />
    </Container>
  );
}
