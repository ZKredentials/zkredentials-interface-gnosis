import theme from "@/styles/theme";
import styled from "styled-components";

export const GenerateProofFormContainer = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  background-color: ${theme.colors.backgroundTwo};

  padding: 10px;
  border-radius: 10px;

  margin: 10px 0;
`;

export const GenerateProofFormOptions = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const GenerateProofFormOption = styled.div`
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

export const GenerateProofFormSelectorContainer = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const GenerateProofFormSelector = styled.div<{
  numberOfOptions: number;
  index: number;
}>`
  position: relative;
  height: 2px;
  width: ${({ numberOfOptions }) =>
    numberOfOptions > 1 ? `calc(100% / ${numberOfOptions})` : "100%"};
  background-color: ${theme.colors.title};

  margin-top: 5px;
  margin-left: ${({ numberOfOptions, index }) =>
    numberOfOptions > 1 ? `calc(${index} * (100% / ${numberOfOptions}))` : `0`};
  transition: 0.3s all ease-in-out;
`;
