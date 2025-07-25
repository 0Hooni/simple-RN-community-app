import { TextField, Button } from '@/src/components';
import styled from 'styled-components/native';
import { useState } from 'react';

const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

export default function WriteScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <Container>
      <TextField
        title="제목"
        placeholder="제목"
        value={title}
        onChangeText={setTitle}
      />
      <TextField
        title="내용"
        placeholder="내용"
        value={content}
        onChangeText={setContent}
      />
      <Button text="작성" onPress={() => {}} backgroundColor="blue" />
    </Container>
  );
}
