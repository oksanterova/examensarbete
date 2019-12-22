import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { importSchema } from "graphql-import";
import {
  Resolvers,
  QueryResolvers,
  MutationResolvers,
  ProductResolvers,
  CategoryResolvers
} from "./generated/graphql";
import * as graphql from "./generated/graphql";
import { join } from "path";
import Product from "./entity/Product";
import Category from "./entity/Category";
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

let config = {
  port: process.env.PORT || 4000
};

function productToGql({ id, categories, ...rest }: Product): graphql.Product {
  return {
    id: id.toString(),
    categories: categories?.map(categoryToGql),
    ...rest
  };
}

function categoryToGql({ id, products, ...rest }: Category): graphql.Category {
  return { id: id.toString(), products: products?.map(productToGql), ...rest };
}

const queryResolvers: QueryResolvers = {
  products: async () => {
    const products = await Product.find();

    return products.map(productToGql);
  },
  product: async (_, { id }) => {
    const product = await Product.findOne(id);

    if (product === undefined) {
      throw new Error("not found");
    }

    return productToGql(product);
  }
};

const mutationResolvers: MutationResolvers = {
  addCategoryToProduct: async (_, { categoryId, productId }) => {
    await getConnection()
      .createQueryBuilder()
      .relation(Product, "categories")
      .of(productId)
      .add(categoryId);

    const product = await Product.findOne(productId);

    if (product === undefined) {
      throw new Error("not found");
    }

    return productToGql(product);
  },
  createProduct: async (_, { name }) => {
    const product = new Product({
      name: name,
      quantity: 1
    });

    return productToGql(await product.save());
  },
  createCategory: async (_, { name }) => {
    const category = new Category({
      name: name
    });

    return categoryToGql(await category.save());
  }
};

const productResolvers: ProductResolvers = {
  categories: async parent => {
    const product = await Product.findOne(parent.id, {
      relations: ["categories"]
    });
    const categories = product?.categories ?? [];

    return categories.map(categoryToGql);
  }
};

const categoryResolvers: CategoryResolvers = {
  products: async parent => {
    const category = await Category.findOne(parent.id, {
      relations: ["products"]
    });
    const products = category?.products ?? [];

    return products.map(productToGql);
  }
};

const resolvers: Resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Product: productResolvers,
  Category: categoryResolvers
};

const resolverMap = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  })
};

createConnection().then(async connection => {
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
});
