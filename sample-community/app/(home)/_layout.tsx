import { router, Stack } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: '커뮤니티',
        headerRight: () => (
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text>글쓰기</Text>
          </TouchableOpacity>
        ),
      }}
    />
  );
}
