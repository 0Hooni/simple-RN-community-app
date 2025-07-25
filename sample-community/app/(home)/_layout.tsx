import { Stack } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: '커뮤니티',
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <Text>글쓰기</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="[postId]/index"
        options={{
          headerTitle: '게시글',
        }}
      />
    </Stack>
  );
}
