import theme from "@/styles/theme";
import styled, { css } from "styled-components";

export const SideNavigationContainer = styled.div<{ expand: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;

  width: ${({ expand }) => (expand ? "300px" : "104px")};
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;

  background-color: ${theme.colors.title};

  padding: 20px;

  // transition: 0.5s ease-in-out width;
  transition: 0.5s all linear;
`;

export const SideNavigationSection = styled.div`
  overflow-x: hidden;
`;

export const SideNavigationLogo = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  cursor: default;

  @media screen and (min-width: ${theme.breakpoints.medium}) {
    margin-bottom: 20px;
  }
`;

export const SideNavigationTitle = styled.h2<{ expand: boolean }>`
  // display: ${({ expand }) => (expand ? "block" : "none")};
  display: block
  transition: 0.5s all linear;

  font-weight: 700;
  font-size: 18px;
  color: ${theme.colors.highlight};

  margin-left: 8px;

  @media screen and (min-width: ${theme.breakpoints.medium}) {
    font-size: 28px;
  }
`;

export const SideNavigationIcon = styled.div`
  // position: relative;
  height: 64px;
  width: 64px;
`;

export const SideNavigationExpansionButton = styled.div`
  position: absolute;
  z-index: 2;
  top: 35px;
  right: -15px;
`;

export const SideNavigationContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
`;

export const SideNavigationItem = styled.div<{ selected: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  padding: 20px;

  background-color: ${({ selected }) =>
    selected ? theme.colors.backgroundTwo : "transparent"};

  margin: 5px 0;
  border-radius: 10px;

  cursor: pointer;
`;

export const SideNavigationItemIcon = styled.div`
  height: 24px;
  width: 24px;
`;

export const SideNavigationItemText = styled.h4<{
  expand: boolean;
  selected: boolean;
}>`
  display: ${({ expand }) => (expand ? "block" : "none")};
  font-weight: ${({ selected }) => (selected ? "700" : "400")};
  color: ${({ selected }) =>
    selected ? theme.colors.title : theme.colors.highlight};
  margin-left: 20px;
  white-space: nowrap;
`;

export const TopNavigationContainer = styled.div<{ expand: boolean }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 100vh;
  width: 100vw;

  padding: 15px 5vw;

  background-color: ${theme.colors.title};

  transition: 0.5s all linear;

  top: ${({ expand }) => (expand ? "0" : "calc(-100vh + 58px)")};
  z-index: 2;
`;

export const TopNavigationMain = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TopNavigationContent = styled.div`
  width: 100%;
`;

export const TopNavigationBurger = styled.div<{ expand: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;

  & i {
    background-color: ${theme.colors.backgroundTwo};
    width: 20px;
    height: 2px;
    margin: 2px;
    border-radius: 2px;
    transition: all ease 0.5s;

    ${({ expand }) =>
      expand
        ? css`
            padding-left: 28px;

            &:nth-child(1) {
              transform: rotate(45deg) translateY(9px);
            }

            &:nth-child(2) {
              opacity: 0;
            }

            &:nth-child(3) {
              transform: rotate(-45deg) translateY(-9px);
            }
          `
        : css`
            &:nth-child(1) {
              transform: rotate(0) translateY(0);
            }

            &:nth-child(2) {
              opacity: 1;
            }

            &:nth-child(3) {
              transform: rotate(0) translateY(0);
            }
          `}
  }
`;
