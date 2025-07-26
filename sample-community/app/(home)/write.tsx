import { TextField, Button } from '@/src/components';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { usePostWrite } from '@/src/hooks';

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
  const { title, content, setTitle, setContent, handleSubmit, isSubmitting } =
    usePostWrite();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
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
          text={isSubmitting ? '작성 중...' : '작성 완료'}
          onPress={handleSubmit}
          backgroundColor="blue"
          disabled={isSubmitting}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
}
