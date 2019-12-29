import React, { useEffect } from "react";
import client from "../client";
import { Redirect } from "react-router-dom";

const LogOut = () => {
  useEffect(() => {
    client.writeData({ data: { isLoggedIn: false } });
    localStorage.clear();
  }, []);

  return <Redirect to="/" />;
};

export default LogOut;
