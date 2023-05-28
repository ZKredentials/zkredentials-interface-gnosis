import theme from "@/styles/theme";
import styled from "styled-components";

export const CheckboxContainer = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  font-weight: 400;
  font-size: 14px;
  color: ${theme.colors.text};
`;

export const CheckboxInput = styled.input`
  margin-right: 10px;
`;
