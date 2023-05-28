import theme from "@/styles/theme";
import styled from "styled-components";

export const CreditCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;

  background-color: ${theme.colors.backgroundTwo};

  padding: 14px;
  border-radius: 10px;
`;

export const CreditCardSection = styled.div`
  position: relative;
  width: 50%:
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  margin: 5px;
`;

export const CreditCardIcon = styled.div`
  position: relative;
  height: 40px;
  width: 63.67px;
`;

export const CreditCardText = styled.p`
  font-weight: 400;
  color: ${theme.colors.text};
  font-size: 18px;
`;

export const CreditCardActive = styled.div`
  position: relative;
  width: 100%;

  padding: 5px;
  margin-top: 5px;

  background-color: green;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CreditCardActiveText = styled.p`
  font-weight: 400;
  color: ${theme.colors.backgroundTwo};
  font-size: 10px;
  text-transform: uppercase;
`;
