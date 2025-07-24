import styled from "styled-components/native";
import { typography } from "../styles";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background-color: #F5F5F5;
  border-radius: 8px;
`

const Text = styled.Text`
  width: 60px;
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  line-height: ${typography.body.lineHeight}px;
`

const Divider = styled.View`
  width: 2px;
  height: 100%;
  background-color: #E0E0E0;
`

const TextInput = styled.TextInput.attrs({
  placeholderTextColor: "#999",
})`
  flex: 1;
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  line-height: ${typography.body.lineHeight}px;
`

export const TextField = ({ 
  title, 
  placeholder, 
  keyboardType = "default" 
}: { 
  title: string, 
  placeholder: string, 
  keyboardType?: "default" | "email-address" | "visible-password"
}) => {
  return (
    <Container>
      <Text>{title}</Text>
      <Divider />
      <TextInput 
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={keyboardType === "visible-password"}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
      />
    </Container>
  )
}



