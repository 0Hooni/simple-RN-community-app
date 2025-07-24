import styled from 'styled-components/native';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextField, Button } from '../src/components';
import { typography } from '../src/styles';

const Title = styled.Text`
  font-size: ${typography.title1.fontSize}px;
  font-weight: ${typography.title1.fontWeight};
  line-height: ${typography.title1.lineHeight}px;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
  gap: 140px;
`;

const TextFieldContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 36px;
  gap: 20px;
`;

const ButtonContainer = styled.View`
  flex-direction: column;
  gap: 20px;
`;

export default function Signup() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Title>회원가입</Title>
        <TextFieldContainer>
          <TextField
            title="닉네임"
            placeholder="닉네임을 입력해주세요."
            keyboardType="default"
          />
          <TextField
            title="이메일"
            placeholder="이메일을 입력해주세요."
            keyboardType="email-address"
          />
          <TextField
            title="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            keyboardType="visible-password"
          />
        </TextFieldContainer>
        <ButtonContainer>
          <Button text="가입하기" backgroundColor="blue" onPress={() => {}} />
        </ButtonContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
}
