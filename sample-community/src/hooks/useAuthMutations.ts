import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/src/lib/supabase';
import { Alert } from 'react-native';
import { router } from 'expo-router';

// 로그인
export const useLogin = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      router.replace('/(home)');
    },
    onError: (error: any) => {
      Alert.alert(
        '로그인 실패',
        error.message || '알 수 없는 오류가 발생했습니다.',
      );
    },
  });
};

// 회원가입
export const useSignup = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
      nickname,
    }: {
      email: string;
      password: string;
      nickname: string;
    }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname,
          },
        },
      });

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      Alert.alert('회원가입 성공', '로그인 화면으로 이동합니다.', [
        {
          text: '확인',
          onPress: () => router.back(),
        },
      ]);
    },
    onError: (error: any) => {
      Alert.alert(
        '회원가입 실패',
        error.message || '알 수 없는 오류가 발생했습니다.',
      );
    },
  });
};
