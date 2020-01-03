import React from "react";
import Paper from "@material-ui/core/Paper";
import styled, { createGlobalStyle } from "styled-components";

type MainProps = {
  fullWidth: boolean;
};

const GlobalStyle = createGlobalStyle`
  body {
    // @ts-ignore
    background-color: ${(props: any) => props.theme.palette.background.default};
  }
`;

const Main = styled.main<MainProps>`
  width: auto;
  padding-top: ${props => props.theme.spacing(props.fullWidth ? 0 : 6)}px;
  margin-left: ${props => props.theme.spacing(0)}px;
  margin-right: ${props => props.theme.spacing(0)}px;

  ${props => props.theme.breakpoints.up(600 + props.theme.spacing(3) * 2)} {
    width: ${props => (props.fullWidth ? "100%" : "600px")};
    margin-top: ${props => props.theme.spacing(props.fullWidth ? 0 : 6)}px;
    padding-top: ${props => props.theme.spacing(3)}px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const StyledPaper = styled(Paper)`
  margin-top: ${props => props.theme.spacing(3)}px;
  margin-bottom: ${props => props.theme.spacing(3)}px;
  padding: ${props => props.theme.spacing(1)}px;

  ${props => props.theme.breakpoints.up(600 + props.theme.spacing(3) * 2)} {
    margin-top: ${props => props.theme.spacing(0)}px;
    margin-bottom: ${props => props.theme.spacing(0)}px;
    padding: ${props => props.theme.spacing(3)}px;
  }

  width: 100%;
`;

const StyledMain: React.FC<{
  children: React.ReactNode | React.ReactNode[] | null;
  fullWidth?: boolean;
}> = ({ children, fullWidth = false }) => {
  return (
    <>
      <GlobalStyle />
      <Main fullWidth={fullWidth}>
        <StyledPaper>{children}</StyledPaper>
      </Main>
    </>
  );
};

export default StyledMain;
