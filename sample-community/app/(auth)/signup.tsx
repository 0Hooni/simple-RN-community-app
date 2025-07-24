import styled from 'styled-components/native';
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { TextField, Button } from '../../src/components';
import { typography } from '../../src/styles';
import { useState } from 'react';
import { router } from 'expo-router';
import { supabase } from '../../src/lib/supabase';

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
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!nickname.trim() || !email.trim() || !password.trim()) {
      Alert.alert('모든 필드를 입력해주세요.');
      return;
    }

    if (password.length < 8) {
      Alert.alert('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: {
            nickname: nickname.trim(),
          },
        },
      });

      if (error) {
        Alert.alert('회원가입 실패', error.message);
      } else {
        Alert.alert('회원가입 성공', '로그인 화면으로 이동합니다.', [
          {
            text: '확인',
            onPress: () => {
              router.back();
            },
          },
        ]);
      }
    } catch (error) {
      Alert.alert('회원가입 실패', '예기치 못한 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

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
            disabled={loading}
          />
        </ButtonContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
}
