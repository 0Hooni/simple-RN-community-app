import { usePostWriteStore } from '@/src/stores/postWriteStore';
import { useCreatePost } from './usePostQueries';
import { Alert } from 'react-native';

export const usePostWrite = () => {
  const { title, content, setTitle, setContent, resetForm } =
    usePostWriteStore();
  const createPostMutation = useCreatePost();

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('제목을 입력해주세요.');
      return;
    }

    if (!content.trim()) {
      Alert.alert('내용을 입력해주세요.');
      return;
    }

    createPostMutation.mutate(
      {
        title: title.trim(),
        content: content.trim(),
      },
      {
        onSuccess: () => {
          resetForm();
        },
      },
    );
  };

  return {
    title,
    content,
    setTitle,
    setContent,
    handleSubmit,
    isSubmitting: createPostMutation.isPending,
  };
};
