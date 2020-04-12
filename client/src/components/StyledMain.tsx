import React from "react";
import Paper from "@material-ui/core/Paper";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    // @ts-ignore
    background-color: ${(props: any) => props.theme.palette.background.default};
  }
`;

const Main = styled.main`
  width: auto;
  padding-top: ${props => props.theme.spacing(6)}px;
  padding-bottom: ${props => props.theme.spacing(2)}px;
  margin-left: ${props => props.theme.spacing(0)}px;
  margin-right: ${props => props.theme.spacing(0)}px;

  ${props => props.theme.breakpoints.up(600 + props.theme.spacing(3) * 2)} {
    width: 600px;
    margin-top: ${props => props.theme.spacing(6)}px;
    padding-top: ${props => props.theme.spacing(3)}px;
    padding-bottom: ${props => props.theme.spacing(1)}px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const StyledPaper = styled(Paper)`
  margin-top: ${props => props.theme.spacing(3)}px;
  margin-bottom: ${props => props.theme.spacing(3)}px;
  padding: ${props => props.theme.spacing(1)}px;

  ${props => props.theme.breakpoints.up(600 + props.theme.spacing(3) * 2)} {
    margin-top: ${props => props.theme.spacing(3)}px;
    margin-bottom: ${props => props.theme.spacing(3)}px;
    padding: ${props => props.theme.spacing(3)}px;
  }

  width: 100%;
`;

const StyledMain: React.FC<{
  children: React.ReactNode | React.ReactNode[] | null;
}> = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Main>
        <StyledPaper>{children}</StyledPaper>
      </Main>
    </>
  );
};

export default StyledMain;
