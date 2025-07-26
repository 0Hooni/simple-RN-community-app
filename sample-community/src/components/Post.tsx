import styled from 'styled-components/native';
import { typography } from '../styles';

const Container = styled.View`
  gap: 16px;
`;

const Title = styled.Text`
  font-size: ${typography.title3.fontSize};
  font-weight: ${typography.title3.fontWeight};
  line-height: ${typography.title3.lineHeight};
`;

const WriterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Writer = styled.Text`
  font-size: ${typography.callout.fontSize};
  font-weight: ${typography.callout.fontWeight};
  line-height: ${typography.callout.lineHeight};
`;

const TimeStamp = styled.Text`
  font-size: ${typography.callout.fontSize};
  font-weight: ${typography.callout.fontWeight};
  line-height: ${typography.callout.lineHeight};
`;

const Content = styled.Text`
  font-size: ${typography.body.fontSize};
  font-weight: ${typography.body.fontWeight};
  line-height: ${typography.body.lineHeight};
`;

export const Post = ({
  title,
  writer,
  timeStamp,
  content,
}: {
  title: string;
  writer: string;
  timeStamp: string;
  content: string;
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <WriterContainer>
        <Writer>{writer}</Writer>
        <TimeStamp>{timeStamp}</TimeStamp>
      </WriterContainer>
      <Content>{content}</Content>
    </Container>
  );
};
