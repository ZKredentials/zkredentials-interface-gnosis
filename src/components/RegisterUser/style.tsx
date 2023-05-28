import theme from "@/styles/theme";
import styled from "styled-components";

export const RegisterUserContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${theme.colors.backgroundTwo};

  padding: 10px;
  border-radius: 10px;

  gap: 10px;
`;

export const RegisterUserText = styled.p`
  font-weight: 400;
  color: ${theme.colors.text};
  font-size: 18px;
`;
