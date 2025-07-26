import styled from 'styled-components/native';
import { typography } from '../styles';

const Container = styled.View<{ multiline?: boolean }>`
  flex-direction: row;
  align-items: ${(props) => (props.multiline ? 'flex-start' : 'center')};
  gap: 12px;
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 8px;
  ${(props) => props.multiline && 'flex: 1; height: 100%;'}
`;

const Text = styled.Text`
  width: 60px;
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  line-height: ${typography.body.lineHeight}px;
`;

const Divider = styled.View`
  width: 2px;
  height: 100%;
  background-color: #e0e0e0;
`;

const TextInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})<{ multiline?: boolean }>`
  flex: 1;
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  line-height: ${typography.body.lineHeight}px;
  ${(props) => props.multiline && 'text-align-vertical: top;'}
`;

export const TextField = ({
  title,
  placeholder,
  keyboardType = 'default',
  value,
  onChangeText,
  multiline = false,
}: {
  title: string;
  placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'visible-password';
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
}) => {
  return (
    <Container multiline={multiline}>
      <Text>{title}</Text>
      <Divider />
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={keyboardType === 'visible-password'}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
      />
    </Container>
  );
};
