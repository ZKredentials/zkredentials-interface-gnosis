import theme from "@/styles/theme";
import styled from "styled-components";

export const GenericContainer = styled.div`
  position: relative;
  height: auto;
  width: 100%;
`;

export const GenericTitle = styled.h2`
  font-weight: 700;
  font-size: 32px;
  color: ${theme.colors.title};
`;

export const GenericContent = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  margin-top: 20px;
`;
