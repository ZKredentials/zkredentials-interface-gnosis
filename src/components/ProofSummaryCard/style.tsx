import theme from "@/styles/theme";
import styled from "styled-components";

export const ProofSummaryCardContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const ProofSummaryCardContent = styled.div`
  position: relative;
  width: 100%;

  padding: 10px;
  border-radius: 10px;
  background-color: ${theme.colors.backgroundTwo};
`;

export const ProofSummaryCardSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  padding: 10px;
`;

export const ProofSummaryCardText = styled.p`
  font-weight: 500;
  font-size: 24px;
  color: ${theme.colors.text};
`;

export const ProofSummaryCardTextDetail = styled.code`
  position: relative;
  background-color: ${theme.colors.highlightTwo};
  overflow-wrap: break-word;
  cursor: pointer;
`;

export const ProofSummaryCardSeeMore = styled.p`
  font-size: 14px;
  cursor: pointer;
`;
