import theme from "@/styles/theme";
import styled from "styled-components";

export const GithubFormContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
`;

export const GithubFormContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;

  margin: 10px 0;
`;

export const GithubFormTableHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  width 100%;
  margin-bottom: 3px;

  & p {
    width: 25%;

    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: ${theme.colors.text}
    text-align: left;
  }
`;

export const GithubFormRow = styled.div<{ allow: boolean }>`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  margin: 5px 0;

  opacity: ${({ allow }) => (allow ? "1" : "0.6")};
`;

export const GithubFormText = styled.div`
  position: relative;
  width: 25%;

  font-weight: 400;
  font-size: 18px;
  color: ${theme.colors.text};
`;

export const GithubFormInputContainer = styled.div`
  position: relative;
  width: 25%;
`;

export const GithubFormTextInput = styled.input`
  position: relative;
  width: 100%;
  padding: 5px;
`;

export const GithubFormError = styled.p`
  position: relative;
  margin: 5px;

  font-size: 400;
  color: ${theme.colors.warning};
`;

export const GithubFormButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: ${theme.colors.title};

  padding: 10px 15px;
  border-radius: 15px;

  height: 44px;
  max-width: 200px;

  cursor: pointer;
  border: none;

  & p {
    color: ${theme.colors.backgroundTwo};
    font-weight: 700;
  }
`;
