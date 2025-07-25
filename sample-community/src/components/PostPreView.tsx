import styled from 'styled-components/native';
import { typography } from '../styles';

const Container = styled.TouchableOpacity`
  background-color: white;
  padding: 8px 16px;
`;

const Title = styled.Text`
  font-size: ${typography.title3.fontSize}px;
  font-weight: ${typography.title3.fontWeight};
  line-height: ${typography.title3.lineHeight}px;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Writer = styled.Text`
  font-size: ${typography.callout.fontSize}px;
  font-weight: ${typography.callout.fontWeight};
  line-height: ${typography.callout.lineHeight}px;
`;

const TimeStamp = styled.Text`
  font-size: ${typography.callout.fontSize}px;
  font-weight: ${typography.callout.fontWeight};
  line-height: ${typography.callout.lineHeight}px;
  color: gray;
`;

export const PostPreView = ({
  title,
  writer,
  timeStamp,
  onPress,
}: {
  title: string;
  writer: string;
  timeStamp: string;
  onPress: () => void;
}) => {
  return (
    <Container onPress={onPress}>
      <Title>{title}</Title>
      <InfoContainer>
        <Writer>{writer}</Writer>
        <TimeStamp>{timeStamp}</TimeStamp>
      </InfoContainer>
    </Container>
  );
};
