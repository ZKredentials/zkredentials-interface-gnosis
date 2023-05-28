import theme from "@/styles/theme";
import styled from "styled-components";

export const BlankCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;

  background-color: ${theme.colors.backgroundTwo};

  padding: 14px;
  border-radius: 10px;
  cursor: pointer;
`;

export const BlankCardSection = styled.div`
  position: relative;
  width: 50%:
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  margin: 5px;
`;

export const BlankCardIcon = styled.div`
  position: relative;
  height: 24px;
  width: 24px;
`;
