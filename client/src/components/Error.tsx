import React from "react";
import big_black_sheep from "../assets/big_black_sheep.png";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${(props) => props.theme.breakpoints.up(600 + props.theme.spacing(3) * 2)} {
    width: 600px;
    margin-top: ${(props) => props.theme.spacing(6)}px;
    padding-top: ${(props) => props.theme.spacing(3)}px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Logo = styled.div`
  margin: 16px 0;
  width: 140px;
  height: 100px;
  background: url(${big_black_sheep}) center left no-repeat;
`;

const Error: React.FC<{ errorMessage: string }> = ({ errorMessage }) => {
  return (
    <>
      <Helmet>
        <title>Error</title>
      </Helmet>
      <StyledMain>
        <Logo />
        <Typography variant="h6">{errorMessage}</Typography>
      </StyledMain>
    </>
  );
};

export default Error;
