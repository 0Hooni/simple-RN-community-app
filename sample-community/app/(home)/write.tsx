import { TextField, Button } from '@/src/components';
import styled from 'styled-components/native';
import { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { createPost } from '@/src/lib/api';
import { router } from 'expo-router';

const Container = styled.View`
  flex: 1;
  padding: 16px;
  align-items: center;
  background-color: white;
`;

const TitleContainer = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

const ContentContainer = styled.View`
  flex: 1;
  width: 100%;
  margin-bottom: 16px;
`;

export default function WriteScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('제목을 입력해주세요.');
      return;
    }

    if (!content.trim()) {
      Alert.alert('내용을 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      await createPost({
        title: title.trim(),
        content: content.trim(),
      });

      Alert.alert('성공', '게시글이 작성되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            router.back();
          },
        },
      ]);
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      Alert.alert('오류', '게시글 작성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <Container>
        <TitleContainer>
          <TextField
            title="제목"
            placeholder="제목"
            value={title}
            onChangeText={setTitle}
          />
        </TitleContainer>

        <ContentContainer>
          <TextField
            title="내용"
            placeholder="내용"
            value={content}
            onChangeText={setContent}
            multiline={true}
          />
        </ContentContainer>

        <Button
          text={loading ? '작성 중...' : '작성 완료'}
          onPress={handleSubmit}
          backgroundColor="blue"
          disabled={loading}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
}
