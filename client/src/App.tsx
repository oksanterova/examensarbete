import React from "react";
import "./App.css";
import Homepage from "./components/Homepage";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "/graphql"
});

const App: React.FC = () => {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Homepage />
      </ApolloProvider>
    </div>
  );
};

export default App;
