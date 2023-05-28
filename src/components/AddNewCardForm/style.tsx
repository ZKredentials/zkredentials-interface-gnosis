import theme from "@/styles/theme";
import styled from "styled-components";

export const AddNewCardFormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  background-color: ${theme.colors.backgroundTwo};

  padding: 10px;
  border-radius: 10px;
`;

export const AddNewCardFormTitle = styled.h4`
  font-weight: 500;
  color: ${theme.colors.title};
  font-size: 18px;
`;

export const AddNewCardFormContent = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  @media screen and (min-width: ${theme.breakpoints.medium}) {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(2, calc(50% - 5px));
    align-items: center;
  }
`;
