import theme from "@/styles/theme";
import styled from "styled-components";

export const ProofCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: ${theme.colors.backgroundTwo};

  padding: 10px;
  border-radius: 10px;

  margin: 10px 0;

  gap: 10px;
`;

export const ProofCardLogo = styled.div<{ clickable?: boolean }>`
  position: relative;
  height: 20px;
  width: 20px;

  cursor: ${({ clickable }) => (clickable ? "pointer" : "auto")};
`;

export const ProofCardTypeText = styled.p`
  font-weight: 400;
  font-size: 18px;
  color: ${theme.colors.text};
`;
