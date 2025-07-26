import styled from 'styled-components/native';
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { TextField, Button } from '@/src/components';
import { typography } from '@/src/styles';
import { useSignupForm } from '@/src/hooks';

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
  gap: 100px;
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
  padding-top: 100px;
`;

export default function Signup() {
  const {
    email,
    password,
    nickname,
    setEmail,
    setPassword,
    setNickname,
    handleSignup,
    isLoading,
  } = useSignupForm();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Title>회원가입</Title>
        <TextFieldContainer>
          <TextField
            title="닉네임"
            placeholder="닉네임을 입력해주세요."
            keyboardType="default"
            value={nickname}
            onChangeText={setNickname}
          />
          <TextField
            title="이메일"
            placeholder="이메일을 입력해주세요."
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextField
            title="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            keyboardType="visible-password"
            value={password}
            onChangeText={setPassword}
          />
        </TextFieldContainer>
        <ButtonContainer>
          <Button
            text="가입하기"
            backgroundColor="blue"
            onPress={handleSignup}
            disabled={isLoading}
          />
        </ButtonContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
}
