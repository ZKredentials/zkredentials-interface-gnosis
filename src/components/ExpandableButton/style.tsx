import theme from "@/styles/theme";
import styled from "styled-components";

export const ExpandableButtonContainer = styled.button`
  position: relative;
  border: none;

  background-color: ${theme.colors.backgroundTwo};
  height: 30px;
  width: 30px;
  border-radius: 50%;

  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ExpandableButtonContent = styled.div<{ expand: boolean }>`
  position: relative;
  height: 18px;
  width: 18px;

  transform: ${({ expand }) => (expand ? "rotate(180deg)" : "none")};
  transition: 0.5s ease all;
`;
