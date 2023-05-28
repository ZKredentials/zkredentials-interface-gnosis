import theme from "@/styles/theme";
import styled from "styled-components";

export const SubscriptionFormContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
`;

export const SubscriptionFormTitle = styled.h4`
  font-weight: 500;
  color: ${theme.colors.title};
  font-size: 24px;
`;

export const SubscriptionFormContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  background-color: ${theme.colors.backgroundTwo};

  padding: 10px;
  border-radius: 10px;

  margin: 10px 0;
`;

export const SubscriptionFormTierOptions = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
  gap: 10px;

  @media screen and (min-width: ${theme.breakpoints.medium}) {
    flex-direction: row;
  }
`;

export const SubscriptionFormPaymentContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SubscriptionFormPaymentOptions = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-top: 20px;
`;

export const SubscriptionFormPaymentOption = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & p {
    font-weight: 500;
    font-size: 24px;
    color: ${theme.colors.title};
  }
`;

export const SubscriptionFormPaymentSelectorContainer = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const SubscriptionFormPaymentSelector = styled.div<{
  selectedUSD: boolean;
}>`
  position: relative;
  height: 2px;
  width: 50%;
  background-color: ${theme.colors.title};

  margin-top: 5px;
  margin-left: ${({ selectedUSD }) => (selectedUSD ? `0` : `50%`)};
  transition: 0.3s all ease-in-out;
`;

export const SubscriptionFormPaymentActionContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SubscriptionFormPaymentActionText = styled.p`
  font-weight: 400;
  font-size: 18px;
  color: ${theme.colors.text};
  margin: 10px 0;
`;
