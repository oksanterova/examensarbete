import React from "react";
import { Typography } from "@material-ui/core";
import StyledMain from "../components/StyledMain";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import me from "../assets/me.jpeg";

const Me = styled.div`
  margin: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: url(${me}) no-repeat center;
  float: left;
`;

const AboutPage = () => (
  <>
    <Helmet>
      <title>About</title>
    </Helmet>
    <StyledMain>
      <Typography variant="h6" gutterBottom>
        About
      </Typography>
      <Typography variant="body1" gutterBottom>
        <Me /> Black sheep online shop was developed as a graduation project at
        Chas Academy. It is the final result of my education and internship. But
        it also can be used by me to earn extra money through my favourite
        hobby. I appreciate the beauty and individuality of craft knitted
        products very much and I hope you will like them too!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Warm greetings from Oksana Kanterova
      </Typography>
    </StyledMain>
  </>
);

export default AboutPage;
