import React from "react";
import { useGetMeQuery } from "./generated/graphql";
import { useQuery } from "@apollo/react-hooks";
import { IS_LOGGED_IN } from "./client";
import Loader from "./components/Loader";

type Me = {
  address?: string | null;
  isAdmin: boolean;
};

const MeContext = React.createContext<Me | undefined>(undefined);

export const MeContextProvider: React.FC<{
  children: React.ReactNode | React.ReactNode[] | null;
}> = ({ children }) => {
  const { data: loggedInData, loading: loggedInLoading } = useQuery<{
    isLoggedIn: boolean;
  }>(IS_LOGGED_IN);
  const isLoggedIn = loggedInData?.isLoggedIn ?? false;

  const { data, loading } = useGetMeQuery({ skip: !isLoggedIn });

  if (loggedInLoading || loading) {
    return <Loader />;
  }

  const value = isLoggedIn === false ? undefined : data?.me;

  return <MeContext.Provider value={value}>{children}</MeContext.Provider>;
};

export default MeContext;
