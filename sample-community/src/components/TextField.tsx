import styled from "styled-components/native";
import { typography } from "../styles";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0px 36px;
  gap: 12px;
`

const Text = styled.Text`
  width: 100px;
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  line-height: ${typography.body.lineHeight}px;
`

const TextInput = styled.TextInput`
  flex: 1;
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  line-height: ${typography.body.lineHeight}px;
`

export const TextField = ({ title, placeholder }: { title: string, placeholder: string }) => {
  return (
    <Container>
      <Text>{title}</Text>
      <TextInput placeholder={placeholder} />
    </Container>
  )
}



