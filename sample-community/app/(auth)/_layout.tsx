import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: '',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true, // 로그인 화면에서는 헤더 숨김
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: '',
          headerShown: true, // 회원가입 화면에서는 헤더 표시
          headerBackTitle: '로그인',
        }}
      />
    </Stack>
  );
}
