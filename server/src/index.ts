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
  CategoryResolvers,
  OrderResolvers,
  OrderItemResolvers,
  SizeResolvers
} from "./generated/graphql";
import * as graphql from "./generated/graphql";
import { join } from "path";
import Product from "./entity/Product";
import Category from "./entity/Category";
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import Order from "./entity/Order";
import Size from "./entity/Size";
import OrderItem from "./entity/OrderItem";

let config = {
  port: process.env.PORT || 4000
};

function productToGql({
  id,
  categories,
  sizes,
  ...rest
}: Product): graphql.Product {
  return {
    id: id.toString(),
    categories: categories?.map(categoryToGql),
    sizes: sizes?.map(sizeToGql),
    ...rest
  };
}

function sizeToGql({ id, ...rest }: Size): graphql.Size {
  return {
    id: id.toString(),
    ...rest
  };
}

function categoryToGql({ id, products, ...rest }: Category): graphql.Category {
  return { id: id.toString(), products: products?.map(productToGql), ...rest };
}

function orderItemToGql({
  id,
  product,
  size,
  ...rest
}: OrderItem): graphql.OrderItem {
  return {
    id: id.toString(),
    product: productToGql(product),
    size: sizeToGql(size),
    ...rest
  };
}

function orderToGql({ id, items, ...rest }: Order): graphql.Order {
  return { id: id.toString(), items: items?.map(orderItemToGql), ...rest };
}

const queryResolvers: QueryResolvers = {
  products: async () => {
    const products = await Product.find();

    return products.map(productToGql);
  },
  product: async (_, { id }) => {
    const product = (await Product.findOne(id)) ?? throwNotFound();

    return productToGql(product);
  },
  orders: async () => {
    const orders = await Order.find();

    return orders.map(orderToGql);
  },
  order: async (_, { id }) => {
    const order = (await Order.findOne(id)) ?? throwNotFound();

    return orderToGql(order);
  },
  sizes: async () => {
    const sizes = await Size.find();

    return sizes.map(sizeToGql);
  },
  size: async (_, { id }) => {
    const size = (await Size.findOne(id)) ?? throwNotFound();

    return sizeToGql(size);
  }
};

function throwNotFound(): never {
  throw new Error("not found");
}

async function createOrderItem({
  productId,
  sizeId,
  quantity
}: graphql.CreateOrderItemInput): Promise<OrderItem> {
  const size = (await Size.findOne(sizeId)) ?? throwNotFound();
  const product = (await Product.findOne(productId)) ?? throwNotFound();

  return new OrderItem({
    size,
    product,
    quantity
  });
}

const mutationResolvers: MutationResolvers = {
  addCategoryToProduct: async (_, { categoryId, productId }) => {
    await getConnection()
      .createQueryBuilder()
      .relation(Product, "categories")
      .of(productId)
      .add(categoryId);

    const product = (await Product.findOne(productId)) ?? throwNotFound();

    return productToGql(product);
  },
  addSizeToProduct: async (_, { productId, sizeId }) => {
    await getConnection()
      .createQueryBuilder()
      .relation(Product, "sizes")
      .of(productId)
      .add(sizeId);

    const product = (await Product.findOne(productId)) ?? throwNotFound();

    return productToGql(product);
  },
  createSize: async (_, { name }) => {
    const size = new Size({
      name: name
    });

    return sizeToGql(await size.save());
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
  },
  createOrder: async (_, { input }) => {
    const { address } = input;
    const createdAt = new Date();
    const items = await Promise.all(input.items.map(createOrderItem));

    const order = new Order({
      address,
      createdAt,
      items
    });

    return orderToGql(await order.save());
  }
};

const productResolvers: ProductResolvers = {
  categories: async parent => {
    const product = await Product.findOne(parent.id, {
      relations: ["categories"]
    });
    const categories = product?.categories ?? [];

    return categories.map(categoryToGql);
  },
  sizes: async parent => {
    const product = await Product.findOne(parent.id, {
      relations: ["sizes"]
    });
    const sizes = product?.sizes ?? throwNotFound();

    return sizes.map(sizeToGql);
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

const orderResolvers: OrderResolvers = {
  items: async parent => {
    const order = await Order.findOne(parent.id, {
      relations: ["items"]
    });
    const items = order?.items ?? [];

    return items.map(orderItemToGql);
  }
};

const orderItemResolvers: OrderItemResolvers = {
  product: async parent => {
    const orderItem = await OrderItem.findOne(parent.id, {
      relations: ["product"]
    });
    const product = orderItem?.product ?? throwNotFound();

    return productToGql(product);
  },
  size: async parent => {
    const orderItem = await OrderItem.findOne(parent.id, {
      relations: ["size"]
    });
    const size = orderItem?.size ?? throwNotFound();

    return sizeToGql(size);
  }
};

const resolvers: Resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Product: productResolvers,
  Category: categoryResolvers,
  Order: orderResolvers,
  OrderItem: orderItemResolvers
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
