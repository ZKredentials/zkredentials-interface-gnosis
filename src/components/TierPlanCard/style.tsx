import theme from "@/styles/theme";
import styled from "styled-components";

export const TierPlanCardContainer = styled.div<{ selected: boolean }>`
  position: relative;
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content center;
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  
  border: ${({ selected }) =>
    selected
      ? `2px solid ${theme.colors.title}`
      : `2px solid ${theme.colors.backgroundOne}`};

  background-color: ${theme.colors.backgroundOne};
`;

export const TierPlanCardTitle = styled.h4`
  margin: 10px 0;
  font-weight: 500;
  color: ${theme.colors.title};
  font-size: 24px;
`;

export const TierPlanCardDivider = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  background-color: ${theme.colors.title};
`;

export const TierPlanCardDescription = styled.ul`
  margin: 10px 0;
  padding: 0;

  & li {
    font-weight: 400;
    color: ${theme.colors.text};
    font-size: 14px;
    margin: 5px 0;
  }
`;
