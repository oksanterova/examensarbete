import React from "react";
import { Typography, List, ListItem, Box } from "@material-ui/core";
import StyledMain from "../components/StyledMain";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import big_black_sheep from "../assets/big_black_sheep.png";
import MailOutline from "@material-ui/icons/MailOutline";
import PhoneIphone from "@material-ui/icons/PhoneIphone";

const Logo = styled.div`
  margin: 16px 0;
  width: 140px;
  height: 100px;
  background: url(${big_black_sheep}) center left no-repeat;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
`;

const ContactPage = () => (
  <>
    <Helmet>
      <title>Contact</title>
    </Helmet>
    <StyledMain>
      <Typography variant="h6" gutterBottom>
        Contact
      </Typography>
      <Typography variant="body1">
        If you have any questions about products available in Black Sheep shop,
        feel free to contact me by email or via telephone. If you want to order
        a knitted good of your own design, please reach out with its description
        and we will try to make it possible together. Don't be afraid to stand
        out from the crowd!
      </Typography>
      <FlexWrapper>
        <Logo />
        <List>
          <ListItem>
            <MailOutline />
            <Box margin={1} />
            <Typography variant="body1">oksa_owl@mail.ru</Typography>
          </ListItem>
          <ListItem>
            <PhoneIphone />
            <Box margin={1} />
            <Typography variant="body1">0793374685</Typography>
          </ListItem>
        </List>
      </FlexWrapper>
    </StyledMain>
  </>
);

export default ContactPage;
