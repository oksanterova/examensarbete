import React, { useEffect } from "react";
import client from "../client";
import { Redirect, useHistory } from "react-router-dom";

const LogOut = () => {
  const history = useHistory();

  useEffect(() => {
    async function clear() {
      localStorage.clear();
      await client.resetStore();
    }

    clear();
  }, [history]);

  return <Redirect to="/" />;
};

export default LogOut;
