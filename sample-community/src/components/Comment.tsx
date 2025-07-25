import styled from 'styled-components/native';
import { typography } from '@/src/styles';

const Container = styled.View`
  flex: 1;
  gap: 4px;
`;

const CommentAuthorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CommentAuthor = styled.Text`
  font-size: ${typography.callout.fontSize}px;
  font-weight: ${typography.callout.fontWeight};
  line-height: ${typography.callout.lineHeight}px;
`;

const CommentTimestamp = styled.Text`
  font-size: ${typography.callout.fontSize}px;
  font-weight: ${typography.callout.fontWeight};
  line-height: ${typography.callout.lineHeight}px;
  color: gray;
`;

const CommentContent = styled.Text`
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  line-height: ${typography.body.lineHeight}px;
`;

export const Comment = ({
  author,
  timestamp,
  content,
}: {
  author: string;
  timestamp: string;
  content: string;
}) => {
  return (
    <Container>
      <CommentAuthorContainer>
        <CommentAuthor>{author}</CommentAuthor>
        <CommentTimestamp>{timestamp}</CommentTimestamp>
      </CommentAuthorContainer>
      <CommentContent>{content}</CommentContent>
    </Container>
  );
};
