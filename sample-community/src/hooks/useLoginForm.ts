import { useAuthStore } from '@/src/stores';
import { useLogin } from './useAuthMutations';
import { Alert } from 'react-native';

export const useLoginForm = () => {
  const {
    loginEmail,
    loginPassword,
    setLoginEmail,
    setLoginPassword,
    resetLoginForm,
  } = useAuthStore();

  const loginMutation = useLogin();

  const handleLogin = async () => {
    if (!loginEmail.trim() || !loginPassword.trim()) {
      Alert.alert('로그인 실패', '이메일과 비밀번호를 입력해주세요.');
      return;
    }

    loginMutation.mutate(
      {
        email: loginEmail.trim(),
        password: loginPassword.trim(),
      },
      {
        onSuccess: () => {
          resetLoginForm();
        },
      },
    );
  };

  return {
    email: loginEmail,
    password: loginPassword,
    setEmail: setLoginEmail,
    setPassword: setLoginPassword,
    handleLogin,
    isLoading: loginMutation.isPending,
  };
};
