import theme from "@/styles/theme";
import styled from "styled-components";

export const ActionButtonContainer = styled.button`
  position: relative;
  height: 44px;
  width: 100%;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  padding: 0;
  margin: 0;

  background-color: ${theme.colors.title};

  &:disabled {
    opacity: 0.9;
    cursor: not-allowed;
  }
`;

export const ActionButtonText = styled.p`
  posiiton: relative;
  font-weight: 400;
  font-size: 18px;
  color: ${theme.colors.backgroundTwo};
`;
