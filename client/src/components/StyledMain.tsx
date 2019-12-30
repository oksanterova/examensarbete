import React from "react";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";

type MainProps = {
  fullWidth: boolean;
};

const Main = styled.main<MainProps>`
  width: auto;
  padding-top: ${props => props.theme.spacing(8)}px;
  margin-left: ${props => props.theme.spacing(2)}px;
  margin-right: ${props => props.theme.spacing(2)}px;

  ${props => props.theme.breakpoints.up(600 + props.theme.spacing(3) * 2)} {
    width: ${props => (props.fullWidth ? "100%" : "600px")};
    margin-left: auto;
    margin-right: auto;
  }
`;

const StyledPaper = styled(Paper)`
  margin-top: ${props => props.theme.spacing(3)}px;
  margin-bottom: ${props => props.theme.spacing(3)}px;
  padding: ${props => props.theme.spacing(2)}px;

  ${props => props.theme.breakpoints.up(600 + props.theme.spacing(3) * 2)} {
    margin-top: ${props => props.theme.spacing(6)}px;
    margin-bottom: ${props => props.theme.spacing(3)}px;
    padding: ${props => props.theme.spacing(3)}px;
  }

  width: 100%;
`;

const StyledMain: React.FC<{
  children: React.ReactNode | React.ReactNode[] | null;
  fullWidth?: boolean;
}> = ({ children, fullWidth = false }) => {
  return (
    <Main fullWidth={fullWidth}>
      <StyledPaper>{children}</StyledPaper>
    </Main>
  );
};

export default StyledMain;
