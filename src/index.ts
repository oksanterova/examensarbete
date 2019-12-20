import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { importSchema } from "graphql-import";
import { Resolvers } from "./generated/graphql";
import { join } from "path";
import Product from "./entity/Product";

let config = {
  port: process.env.PORT || 4000
};

type Context = {
  connection: Connection;
};

const resolvers: Resolvers<Context> = {
  Query: {
    products: async (_, args, { connection }) => {
      const products = await connection.manager.find(Product);

      return products.map(({ id, ...rest }) => ({
        id: id.toString(),
        ...rest
      }));
    }
  },
  Mutation: {
    createProduct: async (_, { name }, { connection }) => {
      const product = new Product();
      product.name = name;

      const { id, ...rest } = await connection.manager.save(product);

      return { id: id.toString(), ...rest };
    }
  }
};

createConnection().then(async connection => {
  const app = express();
  const server = new ApolloServer({
    typeDefs: importSchema("./src/schema.graphql"),
    resolvers,
    context: { connection }
  });

  server.applyMiddleware({ app, path: "/graphql" });

  app.use(express.static(join(__dirname, "../build")));

  app.listen({ port: config.port }, () => {
    console.log(`Apollo Server on http://localhost:${config.port}/graphql`);
  });
});
