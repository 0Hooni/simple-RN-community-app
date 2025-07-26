import styled from 'styled-components/native';
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { TextField, Button } from '@/src/components';
import { typography } from '@/src/styles';
import { router } from 'expo-router';
import { useLoginForm } from '@/src/hooks';

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

export default function Index() {
  const { email, password, setEmail, setPassword, handleLogin, isLoading } =
    useLoginForm();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Title>로그인</Title>
        <TextFieldContainer>
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
            text={isLoading ? '로그인 중...' : '로그인'}
            backgroundColor="blue"
            onPress={handleLogin}
            disabled={isLoading}
          />
          <Button
            text="회원가입"
            backgroundColor="gray"
            onPress={() => {
              router.push('/signup');
            }}
          />
        </ButtonContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
}
