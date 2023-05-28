import theme from "@/styles/theme";
import styled, { keyframes } from "styled-components";

const blinkingEffect = () => {
  return keyframes`
    50% {
      opacity: 0;
    }
  `;
};

export const RegisteredCardsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
`;

export const RegisteredCardsTitle = styled.h4`
  font-weight: 500;
  color: ${theme.colors.title};
  font-size: 24px;
`;

export const RegisteredCardsContent = styled.div`
  position: relative;
  width: 100%;

  overflow-x: auto;

  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;

  gap: 10px;

  margin: 10px 0;
`;

export const CreditCardActiveBlink = styled.div`
  position: absolute;
  z-index: 2;
  top: 5px;
  right: 5px;
  background: green;

  height: 10px;
  width: 10px;
  border-radius: 50%;
  animation: ${blinkingEffect} 2s linear infinite;
`;
