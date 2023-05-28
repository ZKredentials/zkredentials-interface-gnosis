import theme from "@/styles/theme";
import styled from "styled-components";

export const LinkedAccountsConnectorContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  margin: 5px 0;
`;

export const LinkedAccountsConnectorLogo = styled.div`
  position: relative;
  height: 20px;
  width: 20px;
  margin-right: 10px;
`;

export const LinkedAccountsConnectorText = styled.p`
  font-weight: 400;
  color: ${theme.colors.text};
  font-size: 18px;
`;

export const LinkedAccountsConnectorButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: ${theme.colors.backgroundTwo};
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  border: none;
`;
