import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { importSchema } from "graphql-import";
import { Resolvers } from "./generated/graphql";
import { join } from "path";

let config = {
  port: process.env.PORT || 4000
};

const resolvers: Resolvers = {
  Query: {
    products: () => []
  }
};

const app = express();
const server = new ApolloServer({
  typeDefs: importSchema("./src/schema.graphql"),
  resolvers
});

server.applyMiddleware({ app, path: "/graphql" });

app.use(express.static(join(__dirname, "../build")));

app.listen({ port: config.port }, () => {
  console.log(`Apollo Server on http://localhost:${config.port}/graphql`);
});
