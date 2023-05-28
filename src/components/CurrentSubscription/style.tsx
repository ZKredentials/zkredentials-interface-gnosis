import theme from "@/styles/theme";
import styled from "styled-components";

export const CurrentSubscriptionContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
`;

export const CurrentSubscriptionTitle = styled.h4`
  font-weight: 500;
  color: ${theme.colors.title};
  font-size: 24px;
`;

export const CurrentSubscriptionText = styled.p`
  font-weight: 400;
  color: ${theme.colors.text};
  font-size: 18px;
`;

export const CurrentSubscriptionContent = styled.div`
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
