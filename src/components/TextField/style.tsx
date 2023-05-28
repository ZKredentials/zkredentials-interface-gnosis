import theme from "@/styles/theme";
import styled, { css } from "styled-components";

export const TextFieldContainer = styled.div`
  position: relative;
  height: 44px;
  width: 100%;
  margin: 10px 0;

  @media screen and (min-width: ${theme.breakpoints.medium}) {
    width: 100%;
  }
`;

export const TextFieldAreaContainer = styled.div`
  position: relative;
  height: 200px;
  width: 200px;
  margin: 10px 0;

  @media screen and (min-width: ${theme.breakpoints.medium}) {
    width: 400px;
  }
`;

export const TextFieldInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 14px;
  border: 1px solid ${theme.colors.text};
  border-radius: 5px;
  outline: none;
  padding: 10px;
  background: none;
  z-index: 1;

  font-family: ${theme.typography.base};
  font-weight: 400;

  &:focus {
    border: 1.5px solid ${theme.colors.title};
  }
`;

export const TextFieldAreaInput = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 18px;
  border: 1px solid ${theme.colors.text};
  border-radius: 5px;
  outline: none;
  padding: 10px;
  background: none;
  z-index: 1;

  font-family: ${theme.typography.base};
  font-weight: 400;

  &:focus {
    border: 1.5px solid ${theme.colors.title};
  }
`;

export const TextFieldLabel = styled.label<{
  isText: boolean;
  isFocus: boolean;
}>`
  position: absolute;

  font-weight: 400;

  padding: 0 2.5px;
  background-color: ${theme.colors.backgroundTwo};
  transition: 0.3s;

  ${({ isFocus, isText }) =>
    isFocus
      ? css`
          top: -6px;
          left: 12px;
          color: ${theme.colors.title};
          font-size: 12px;
          font-weight: 500;
          z-index: 10;
        `
      : isText
      ? css`
          top: -6px;
          left: 12px;
          color: ${theme.colors.text};
          font-size: 12px;
          font-weight: 500;
          z-index: 10;
        `
      : css`
          left: 15px;
          top: 14px;
          color: ${theme.colors.text};
          font-size: 14px;
          font-weight: 400;
        `}
`;
