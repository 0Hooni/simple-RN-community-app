import styled from 'styled-components/native';
import { typography } from '../styles';

const Text = styled.Text`
  font-size: ${typography.callout.fontSize}px;
  font-weight: ${typography.callout.fontWeight};
  line-height: ${typography.callout.lineHeight}px;
  color: white;
`;

const TouchableOpacity = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
`;

export const SmallButton = ({
  text,
  backgroundColor,
  onPress,
  disabled,
}: {
  text: string;
  backgroundColor: string;
  onPress: () => void;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      style={{ backgroundColor }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};
