import { useAuthStore } from '@/src/stores';
import { useSignup } from './useAuthMutations';
import { Alert } from 'react-native';

export const useSignupForm = () => {
  const {
    signupEmail,
    signupPassword,
    signupNickname,
    setSignupEmail,
    setSignupPassword,
    setSignupNickname,
    resetSignupForm,
  } = useAuthStore();

  const signupMutation = useSignup();

  const handleSignup = async () => {
    if (
      !signupEmail.trim() ||
      !signupPassword.trim() ||
      !signupNickname.trim()
    ) {
      Alert.alert('모든 필드를 입력해주세요.');
      return;
    }

    if (signupPassword.length < 8) {
      Alert.alert('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    signupMutation.mutate(
      {
        email: signupEmail.trim(),
        password: signupPassword.trim(),
        nickname: signupNickname.trim(),
      },
      {
        onSuccess: () => {
          resetSignupForm();
        },
      },
    );
  };

  return {
    email: signupEmail,
    password: signupPassword,
    nickname: signupNickname,
    setEmail: setSignupEmail,
    setPassword: setSignupPassword,
    setNickname: setSignupNickname,
    handleSignup,
    isLoading: signupMutation.isPending,
  };
};
