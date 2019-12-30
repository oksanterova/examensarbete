import React, { useEffect } from "react";
import client from "../client";
import { Redirect } from "react-router-dom";

const LogOut = () => {
  useEffect(() => {
    async function clear() {
      client.writeData({ data: { isLoggedIn: false } });
      localStorage.clear();
      await client.clearStore();
    }

    clear();
  }, []);

  return <Redirect to="/" />;
};

export default LogOut;
