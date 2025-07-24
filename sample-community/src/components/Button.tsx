import styled from 'styled-components/native';
import { typography } from '../styles';

const Text = styled.Text`
  font-size: ${typography.title3.fontSize}px;
  font-weight: ${typography.title3.fontWeight};
  line-height: ${typography.title3.lineHeight}px;
  color: white;
`;

const TouchableOpacity = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 48px;
  border-radius: 16px;
`;

export const Button = ({
  text,
  backgroundColor,
  onPress,
}: {
  text: string;
  backgroundColor: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={{ backgroundColor }} onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};
