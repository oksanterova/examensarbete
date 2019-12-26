import "reflect-metadata";
import {
  createConnection,
  getConnection,
  In,
  FindOperator,
  IsNull
} from "typeorm";
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
  OrderItemResolvers
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
import Cart from "./entity/Cart";
import CartItem from "./entity/CartItem";

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
    id: id?.toString(),
    categories: categories?.map(categoryToGql) ?? [],
    sizes: sizes?.map(sizeToGql) ?? [],
    ...rest
  };
}

function sizeToGql({ id, ...rest }: Size): graphql.Size {
  return {
    id: id?.toString(),
    ...rest
  };
}

function categoryToGql({ id, products, ...rest }: Category): graphql.Category {
  return { id: id?.toString(), products: products?.map(productToGql), ...rest };
}

function cartToGql({ items, ...rest }: Cart): graphql.Cart {
  return { items: items?.map(cartItemToGql), ...rest };
}

function cartItemToGql({ product, size, ...rest }: CartItem): graphql.CartItem {
  return {
    product: product && productToGql(product),
    size: size && sizeToGql(size),
    ...rest
  };
}

function orderItemToGql({
  id,
  product,
  size,
  ...rest
}: OrderItem): graphql.OrderItem {
  return {
    id: id?.toString(),
    product: product && productToGql(product),
    size: size && sizeToGql(size),
    ...rest
  };
}

function orderToGql({ id, items, ...rest }: Order): graphql.Order {
  return { id: id?.toString(), items: items?.map(orderItemToGql), ...rest };
}

const queryResolvers: QueryResolvers = {
  cart: async (_, { id }) => {
    const cart = await Cart.findOneOrFail(id);

    return cartToGql(cart);
  },
  categories: async () => {
    const categories = await Category.find();

    return categories.map(categoryToGql);
  },
  products: async () => {
    const products = await Product.find();

    return products.map(productToGql);
  },
  product: async (_, { id }) => {
    const product = await Product.findOneOrFail(id);

    return productToGql(product);
  },
  orders: async () => {
    const orders = await Order.find();

    return orders.map(orderToGql);
  },
  order: async (_, { id }) => {
    const order = await Order.findOneOrFail(id);

    return orderToGql(order);
  },
  sizes: async () => {
    const sizes = await Size.find();

    return sizes.map(sizeToGql);
  },
  size: async (_, { id }) => {
    const size = await Size.findOneOrFail(id);

    return sizeToGql(size);
  }
};

function throwNotFound(): never {
  throw new Error("not found");
}

function FixedIn<T>(values: T[]): FindOperator<any> {
  if (values.length == 0) {
    return IsNull();
  } else {
    return In(values);
  }
}

const mutationResolvers: MutationResolvers = {
  addCartItem: async (_, { input }) => {
    const { productId, cartId, quantity, sizeId } = input;

    const cart = await Cart.findOneOrFail(cartId);
    const size = await Size.findOneOrFail(sizeId);
    const product = await Product.findOneOrFail(productId);
    const cartItem = new CartItem({ cart, product, size, quantity });

    await cartItem.save();

    return true;
  },
  addCategoryToProduct: async (_, { categoryId, productId }) => {
    await getConnection()
      .createQueryBuilder()
      .relation(Product, "categories")
      .of(productId)
      .add(categoryId);

    const product = await Product.findOneOrFail(productId);

    return productToGql(product);
  },
  addSizeToProduct: async (_, { productId, sizeId }) => {
    await getConnection()
      .createQueryBuilder()
      .relation(Product, "sizes")
      .of(productId)
      .add(sizeId);

    const product = await Product.findOneOrFail(productId);

    return productToGql(product);
  },
  createSize: async (_, { name }) => {
    const size = new Size({
      name: name
    });

    return sizeToGql(await size.save());
  },
  createProduct: async (_, { input }) => {
    const { description, name, sizeIds, categoryIds } = input;

    const categories = await Category.find({ id: FixedIn(categoryIds) });
    const sizes = await Category.find({ id: FixedIn(sizeIds) });

    const product = new Product({
      name,
      description,
      categories,
      sizes
    });

    return productToGql(await product.save());
  },
  updateProduct: async (_, { id, input }) => {
    const { description, name, sizeIds, categoryIds } = input;
    const categories = await Category.find({ id: FixedIn(categoryIds) });
    const sizes = await Category.find({ id: FixedIn(sizeIds) });

    const product = await Product.findOneOrFail(id, {
      relations: ["categories", "sizes"]
    });

    product.name = name;
    product.description = description;
    product.categories = categories;
    product.sizes = sizes;

    return productToGql(await product.save());
  },
  deleteProduct: async (_, { id }) => {
    const product = await Product.findOneOrFail(id, {
      relations: ["categories", "sizes"]
    });
    await product.remove();

    return true;
  },
  createCart: async (_, {}) => {
    const cart = new Cart();

    return cartToGql(await cart.save());
  },
  createCategory: async (_, { name }) => {
    const category = new Category({
      name: name
    });

    return categoryToGql(await category.save());
  },
  createOrder: async (_, { input }) => {
    const { address, cartId } = input;
    const createdAt = new Date();

    const cart = await Cart.findOneOrFail(cartId, {
      relations: ["items", "items.product", "items.size"]
    });

    const items = cart.items.map(item => new OrderItem(item));

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
    const product = await Product.findOneOrFail(parent.id, {
      relations: ["categories"]
    });
    const categories = product.categories ?? [];

    return categories.map(categoryToGql);
  },
  sizes: async parent => {
    const product = await Product.findOneOrFail(parent.id, {
      relations: ["sizes"]
    });
    const sizes = product.sizes ?? throwNotFound();

    return sizes.map(sizeToGql);
  }
};

const categoryResolvers: CategoryResolvers = {
  products: async parent => {
    const category = await Category.findOneOrFail(parent.id, {
      relations: ["products"]
    });
    const products = category.products ?? [];

    return products.map(productToGql);
  }
};

const orderResolvers: OrderResolvers = {
  items: async parent => {
    const order = await Order.findOneOrFail(parent.id, {
      relations: ["items"]
    });
    const items = order.items ?? [];

    return items.map(orderItemToGql);
  }
};

const orderItemResolvers: OrderItemResolvers = {
  product: async parent => {
    const orderItem = await OrderItem.findOneOrFail(parent.id, {
      relations: ["product"]
    });

    return productToGql(orderItem.product);
  },
  size: async parent => {
    const orderItem = await OrderItem.findOneOrFail(parent.id, {
      relations: ["size"]
    });

    return sizeToGql(orderItem.size);
  }
};

const cartResolvers: graphql.CartResolvers = {
  items: async parent => {
    const cart = await Cart.findOneOrFail(parent.id, { relations: ["items"] });

    return cart.items.map(cartItemToGql);
  }
};

const cartItemResolvers: graphql.CartItemResolvers = {
  product: async parent => {
    const cartItem = await CartItem.findOneOrFail(parent.id, {
      relations: ["product"]
    });
    return productToGql(cartItem.product);
  },
  size: async parent => {
    const cartitem = await CartItem.findOneOrFail(parent.id, {
      relations: ["size"]
    });
    return sizeToGql(cartitem.size);
  }
};

const resolvers: Resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Product: productResolvers,
  Category: categoryResolvers,
  Order: orderResolvers,
  OrderItem: orderItemResolvers,
  Cart: cartResolvers,
  CartItem: cartItemResolvers
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
